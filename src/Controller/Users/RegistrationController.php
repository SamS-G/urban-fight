<?php

    namespace App\Controller\Users;

    use App\Entity\User;
    use App\Form\RegistrationFormType;
    use App\Repository\UserRepository;
    use DateTime;
    use Doctrine\ORM\EntityManagerInterface;
    use Exception;
    use Symfony\Bridge\Twig\Mime\TemplatedEmail;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\RedirectResponse;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Mailer\Exception\TransportExceptionInterface;
    use Symfony\Component\Mailer\MailerInterface;
    use Symfony\Component\Mime\Address;
    use Symfony\Component\Routing\Annotation\Route;
    use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
    use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;


    class RegistrationController extends AbstractController
    {
        /**
         * @Route("/register", name="app_register")
         * @param Request $request
         * @param UserPasswordEncoderInterface $passwordEncoder
         * @param EntityManagerInterface $manager
         * @param MailerInterface $mailer
         * @return Response
         * @throws TransportExceptionInterface
         * @throws Exception
         */
        public function register(Request $request, UserPasswordEncoderInterface $passwordEncoder, EntityManagerInterface $manager, MailerInterface $mailer): Response
        {
            $user = new User();
            $form = $this->createForm(RegistrationFormType::class, $user);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                $user->setPassword(
                    $passwordEncoder->encodePassword(
                        $user,
                        $form->get('plainPassword')->getData()
                    )
                );

                $token =  bin2hex(random_bytes(30));
                $uri = $this->generateUrl('email_verify', ['token' => $token], UrlGeneratorInterface::ABSOLUTE_URL);

                $email = (new TemplatedEmail())
                    ->from('admin@urbanfight.com')
                    ->to(new Address($user->getEmail()))
                    ->subject('Confirmez votre adresse mail sur urbanfight.com')
                    ->htmlTemplate('registration/confirmation_email.html.twig')
                    ->context([
                        'uri' => $uri,
                        'expiresAt' => new DateTime('+ 7 days')
                    ]);

                $mailer->send($email);

                $user->setToken($token);
                $manager->persist($user);
                $manager->flush();

                $this->addFlash(
                    'success',
                    "Votre compte a bien été créer. <br> Pour pouvoir vous connecter,
                            veuillez confirmer votre adresse mail <br> en cliquant sur le lien 
                            qui vous à été envoyé."
                );

                return $this->redirectToRoute('home');
            }

            return $this->render('registration/register.html.twig', [
                'registrationForm' => $form->createView(),
            ]);
        }

        /**
         * @Route("/confirm/email", name="email_verify")
         * @param EntityManagerInterface $manager
         * @param UserRepository $userRepository
         * @param Request $request
         * @return RedirectResponse
         */
        public function verifyEmail(EntityManagerInterface $manager, UserRepository $userRepository, Request $request)
        {
            $token = $request->query->get('token');
            $userToken = $userRepository->findOneBy(['token' => $token]);

            if (!empty($userToken)) {
                $userToken->setIsVerified(true);
                $userToken->setToken(null);

                $manager->persist($userToken);
                $manager->flush();

                $this->addFlash(
                    'success',
                    "Bravo votre adresse email à bien été validé. <br>
                    Vous pouvez maintenant vous connecter à votre espace personnel"
                );

                return $this->redirectToRoute('home');

            } else {
                $this->addFlash(
                    'error',
                    'Désolé votre adresse mail à déjà été validé. <br>
                    Si ce n\'est pas le cas envoyez un message à : <a href="mailto:admin@urbanfight.com\">admin@urbanfight.com</a> <br>'
            );
                return $this->redirectToRoute('home');

            }
        }
    }
