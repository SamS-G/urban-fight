<?php

    namespace App\Controller\Admin;

    use App\Entity\User;
    use App\Form\UserEditType;
    use Doctrine\ORM\EntityManagerInterface;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\RedirectResponse;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;

    class UserManagementController extends AbstractController
    {
        /** Delete user account
         *
         * @Route("/admin/user/delete{id}", name="delete-user")
         * @param User $user
         * @param EntityManagerInterface $manager
         * @return RedirectResponse
         */
        public function delete(User $user, EntityManagerInterface $manager): RedirectResponse
        {
            $events = $user->getEvents();
            if ($events[0]) {
                foreach ($events as $event) {
                    if ($event->getDateEnd() > new \DateTime()) {
                        $this->addFlash(
                            'error',
                            "Impossible car cet utilisateur est inscrit à une futur formation !"
                        );
                        return $this->redirectToRoute("admin_index");
                    }
                }
            } else {
                $manager->remove($user);
                $manager->flush();
            }
            $this->addFlash(
                'success',
                "L'utilisateur a bien été supprimé !");

            return $this->redirectToRoute("admin_index");
        }

        /** Ban user
         *
         * @Route("/admin/ban{id}", name="ban-user")
         * @param User $user
         * @param EntityManagerInterface $manager
         * @return RedirectResponse
         */
        public
        function ban(User $user, EntityManagerInterface $manager): RedirectResponse
        {
            if ($user->getIsBanned() == true) {
                $user->setIsBanned(false);
                $this->addFlash(
                    'success',
                    "L'utilisateur a bien été débloqué !");
            } else {
                $user->setIsBanned(true);
                $this->addFlash(
                    'success',
                    "L'utilisateur a bien été bloqué !");
            }
            $manager->persist($user);
            $manager->flush();

            return $this->redirectToRoute("admin_index");
        }

        /** Editing user profil
         *
         * @Route("/admin/edit/{id}", name="edit-user")
         * @param User $user
         * @param Request $request
         * @param EntityManagerInterface $manager
         * @return RedirectResponse|Response
         */
        public function edit(User $user, Request $request, EntityManagerInterface $manager)
        {
            $form = $this->createForm(UserEditType::class, $user);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                $manager->persist($user);
                $manager->flush();

                $this->addFlash(
                    'success',
                    "L'utilisateur {$user->getUsername()} a bien été modifié !"
                );

                return $this->redirectToRoute('admin_index');
            }
            return $this->render('admin/user/edit.html.twig', [
                'form' => $form->createView(),
                'user' => $user
            ]);
        }
    }
