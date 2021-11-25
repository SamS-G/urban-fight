<?php

    namespace App\Controller\Admin;

    use App\Entity\Event;
    use App\Entity\User;
    use App\Form\SessionRegistrationType;
    use App\Repository\EventRepository;
    use Doctrine\ORM\EntityManagerInterface;
    use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
    use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\RedirectResponse;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;


    class SessionRegistrationController extends AbstractController
    {
        /**
         * @Route("/admin/registration/new", name="new_registration")
         * @param Request $request
         * @param EntityManagerInterface $manager
         * @param EventRepository $eventRepository
         * @return RedirectResponse|Response
         */
        public function create(Request $request, EntityManagerInterface $manager, EventRepository $eventRepository)
        {
            $form = $this->createForm(SessionRegistrationType::class);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                $data = $form->getData();

                foreach ($data['users'] as $userToCheck) {
                    if ($eventRepository->findUserRegister($data['events']->id, $userToCheck)) {
                        $this->addFlash(
                            'error',
                            "L'utilisateur est déjà inscrit à cette session !"
                        );
                        return $this->redirectToRoute('new_registration');

                    } elseif ($data['events']->available_places == 0) {
                        $this->addFlash(
                            'error',
                            "La session est complète, veuillez en choisir une autre"
                        );
                        return $this->redirectToRoute('new_registration');

                    } else {
                            $event = $data['events'];
                            $event->addUser($data['users']);
                            $event->setAvailablePlaces($event->getAvailablePlaces() - 1);

                            $manager->persist($event);
                            $manager->flush();

                            $this->addFlash(
                                'success',
                                "L'inscription a bien été créer !"
                            );
                            return $this->redirectToRoute('admin_index');
                        }
                    }
                }
            return $this->render('admin/users_registered/new.html.twig', [
                'form' => $form->createView(),
            ]);
        }

        /**
         * @Route("/admin/user/{user_id}/registered/delete/{event_id}", name="delete_registered")
         * @IsGranted("ROLE_ADMIN")
         * @ParamConverter("user", options={"mapping" : {"user_id" : "id"}})
         * @ParamConverter("event", options={"mapping" : {"event_id" : "id"}})
         * @param User $user
         * @param Event $event
         * @param EntityManagerInterface $manager
         * @return RedirectResponse
         */
        public function delete(User $user, Event $event, EntityManagerInterface $manager)
        {
            $event->setAvailablePlaces($event->getAvailablePlaces() + 1);
            $event->removeUser($user);

            $manager->persist($event);
            $manager->persist($user);

            $manager->flush();

            $this->addFlash(
                'success',
                "L'utilisateur a bien été supprimé de la session !");

            return $this->redirectToRoute("admin_index");
        }
    }

