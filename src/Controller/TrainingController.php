<?php

    namespace App\Controller;

    use App\Entity\Event;
    use App\Entity\EventType;
    use App\Form\UserSessionRegistrationType;
    use App\Repository\EventRepository;
    use Doctrine\ORM\EntityManagerInterface;
    use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;
    use Symfony\Component\Serializer\Encoder\JsonEncoder;
    use Symfony\Component\Serializer\Encoder\XmlEncoder;
    use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
    use Symfony\Component\Serializer\Serializer;

    class TrainingController extends AbstractController
    {
        /**
         * @Route("/training", name="calendar")
         * @param EventRepository $event
         * @return Response
         */
        public function index(EventRepository $event)
        {
            return $this->render('urbanFight/event/index.html.twig', [
                'events' => $event->findByDate(new \DateTime())
            ]);
        }

        /**
         * @Route("/session/registration/{event_id}/{eventTypeId}", name="new_user_registration")
         * @ParamConverter("event", options={"mapping" : {"event_id" : "id"}})
         * @ParamConverter("eventType", options={"mapping" : {"eventTypeId" : "id"}})
         * @param Request $request
         * @param Event $event
         * @param EventType $eventType
         * @param EntityManagerInterface $manager
         * @param EventRepository $eventRepository
         * @return Response
         */
        public function create(Request $request, Event $event, EventType $eventType, EntityManagerInterface $manager, EventRepository $eventRepository)
        {
            $form = $this->createForm(UserSessionRegistrationType::class, $event, [
                'id' => $eventType->getId(),
            ]);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {

                if ($eventRepository->findUserRegister($event, $this->getUser()->getId())) {
                    $this->addFlash(
                        'error',
                        "Impossible vous êtes déjà inscrit à cette session !"
                    );
                    return $this->redirectToRoute('user_profile');

                } elseif ($event->getAvailablePlaces() == 0) {
                    $this->addFlash(
                        'error',
                        "Malheureusement cette session est complète !"
                    );
                    return $this->redirectToRoute('new_registration');
                } else {

                    $event->addUser($this->getUser());
                    $event->setAvailablePlaces($event->getAvailablePlaces() - 1);

                    $manager->persist($event);
                    $manager->flush();

                    $this->addFlash(
                        'success',
                        "Félicitations votre inscription est terminer !"
                    );
                    return $this->redirectToRoute('user_profile');
                }
            }

            if ($this->denyAccessUnlessGranted('IS_AUTHENTICATED_FULLY')) {
                $this->addFlash(
                    'error',
                    "Vous devez être connecté pour accéder aux inscriptions!"
                );
                return $this->redirectToRoute('user_profile');

            } else {
                return $this->render('urbanFight/event/registration.html.twig', [
                    'form' => $form->createView(),
                    'event' => $event
                ]);
            }
        }

        public function currentUserData($user)
        {
            $encoders = [new XmlEncoder(), new JsonEncoder()];
            $normalizers = [new ObjectNormalizer()];
            $serializer = new Serializer($normalizers, $encoders);
            $jsonContent = $serializer->serialize($user, 'json', [
                'circular_reference_handler' => function ($object) {
                    return $object->getId();
                }
            ]);
            return json_decode($jsonContent, true);
        }
    }
