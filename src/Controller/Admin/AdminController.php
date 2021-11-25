<?php

    namespace App\Controller\Admin;

    use App\Repository\EventRepository;
    use App\Repository\EventTypeRepository;
    use App\Repository\UserRepository;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;

    class AdminController extends AbstractController
    {
        /**
         * @Route("/admin", name="admin_index")
         * @param UserRepository $user
         * @param EventRepository $event
         * @param EventTypeRepository $eventType
         * @return Response
         */
        public function index(UserRepository $user, EventRepository $event, EventTypeRepository $eventType): Response
        {
            $users = $user->findAll();
            $events = $event->findAll();
            $eventsType = $eventType->findAll();

            return $this->render('admin/index.html.twig', [
                'users' => $users,
                'events' => $events,
                'eventsType' => $eventsType
            ]);
        }
    }
