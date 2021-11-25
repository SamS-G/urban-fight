<?php

    namespace App\Controller\Users;

    use App\Form\PasswordUpdateType;
    use App\Form\UserEditProfileType;
    use Doctrine\ORM\EntityManagerInterface;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\Form\FormError;
    use Symfony\Component\HttpFoundation\RedirectResponse;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;
    use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

    class UserController extends AbstractController
    {
        /**
         * @Route("/user/profile", name="user_profile")
         * @return Response
         */
        public function profile(): Response
        {
            return $this->render('user/profile.html.twig', [
                'user' => $this->getUser()
            ]);
        }

        /**
         * @Route("/user/profile/edit", name="edit_profile")
         * @param Request $request
         * @param EntityManagerInterface $manager
         * @return Response
         */
        public function edit(Request $request, EntityManagerInterface $manager): Response
        {
            $user = $this->getUser();
            $form = $this->createForm(UserEditProfileType::class, $user);

            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                $manager->persist($user);
                $manager->flush();

                $this->addFlash('success', "Les données du profil ont bien été enregistrées");
                return $this->redirectToRoute('user_profile');
            }
            return $this->render('user/edit.htm.twig', [
                'form' => $form->createView(),
                'user' => $user
            ]);
        }


        /**
         * @Route("/user/update-password", name="update_password")
         * @param Request $request
         * @param UserPasswordEncoderInterface $encoder
         * @param EntityManagerInterface $manager
         * @return RedirectResponse|Response
         */
        public function updatePassword(Request $request, UserPasswordEncoderInterface $encoder, EntityManagerInterface $manager)
        {
            $user = $this->getUser();
            $form = $this->createForm(PasswordUpdateType::class);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {

                $oldPassword = $form->get('oldPassword')->getData();

                if ($encoder->isPasswordValid($user, $oldPassword)) {
                    $encodedPassword = $encoder->encodePassword(
                        $user,
                        $form->get('newPassword')->getData()
                    );
                    $newPassword = $user->setPassword($encodedPassword);
                    $manager->persist($newPassword);
                    $manager->flush();
                    $this->addFlash('success', "Votre mot de passe a bien été modifié !");

                    return $this->redirectToRoute('user_profile');

                } else {
                    $form->get('oldPassword')->addError(new FormError("Le mot de passe que vous avez tapé n'est pas votre mot de passe actuel !"));
                }
            }
            return $this->render('user/passwordUpdate.htm.twig', [
                'form' => $form->createView()
            ]);
        }
    }