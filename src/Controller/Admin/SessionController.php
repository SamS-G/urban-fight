<?php

    namespace App\Controller\Admin;


    use App\Entity\Event;
    use App\Form\SessionType;
    use Doctrine\ORM\EntityManagerInterface;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\RedirectResponse;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;

    class SessionController extends AbstractController
    {
        /** For creating a new session.
         *
         * @Route("/admin/event/create", name="event_create")
         * @param Request $request
         * @param EntityManagerInterface $manager
         * @return RedirectResponse|Response
         */
        public function create(Request $request, EntityManagerInterface $manager)
        {
            $event = new Event();
            $form = $this->createForm(SessionType::class, $event);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {

                $event->setAvailablePlaces($event->getNbMaxStudent());
                $manager->persist($event);
                $manager->flush();

                $this->addFlash(
                    'success',
                    "La session a bien été créer !"
                );

                return $this->redirectToRoute('admin_index');
            }

            return $this->render('admin/event/new_event.htm.twig', [
                'form' => $form->createView(),
            ]);
        }

        /** For editing and modify a session
         *
         * @Route("/admin/event/edit/{id}", name="edit_event")
         * @param Event $event
         * @param Request $request
         * @param EntityManagerInterface $manager
         * @return RedirectResponse|Response
         */
        public function edit(Event $event, Request $request, EntityManagerInterface $manager)
        {
            $form = $this->createForm(SessionType::class, $event);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                $event->setAvailablePlaces($event->countAvailablePlaces());

                $manager->persist($event);
                $manager->flush();

                $this->addFlash(
                    'success',
                    "La session a bien été modifié !"
                );

                return $this->redirectToRoute('admin_index');
            }

            return $this->render('admin/event/new_event.htm.twig', [
                'form' => $form->createView(),
                'event' => $event,
            ]);
        }

        /** For delete a session
         *
         * @Route("/admin/event/delete/{id}", name="delete_event")
         * @param Event $event
         * @param EntityManagerInterface $manager
         * @return RedirectResponse
         */
        public function delete(Event $event, EntityManagerInterface $manager)
        {
            $manager->remove($event);
            $manager->flush();
            $this->addFlash(
                'success',
                "La session a bien été supprimé !");

            return $this->redirectToRoute("admin_index");
        }
    }
