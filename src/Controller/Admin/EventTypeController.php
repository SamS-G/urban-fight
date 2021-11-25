<?php

    namespace App\Controller\Admin;

    use App\Entity\EventType;
    use App\Entity\Upload;
    use App\Form\TypeOfEvent;
    use Doctrine\ORM\EntityManagerInterface;
    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\JsonResponse;
    use Symfony\Component\HttpFoundation\RedirectResponse;
    use Symfony\Component\HttpFoundation\Request;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;

    class EventTypeController extends AbstractController
    {
        /**
         * @param $file
         * @param $eventType
         * @return object
         */
        public function uploadFile($file, $eventType): object
        {
            $fileName = md5(uniqid()) . '.' . $file->guessExtension();
            $file->move($this->getParameter('upload_directory'), $fileName);
            $uploadData = new Upload();
            $uploadData->setName($fileName);
            $eventType->addUpload($uploadData);
            return $eventType;
        }

        /**
         * @Route("delete/file/{id}", name ="delete_file")
         * @param Upload $file
         * @param Request $request
         * @param EntityManagerInterface $manager
         * @return JsonResponse
         */
        public function deleteFile(Upload $file, Request $request, EntityManagerInterface $manager): JsonResponse
        {
            $data = json_decode($request->getContent(), true);

            if ($this->isCsrfTokenValid('delete' . $file->getId(), $data['_token'])) {
                $name = $file->getName();
                unlink($this->getParameter('upload_directory') . "/" . $name);

                $manager->remove($file);
                $manager->flush();
                return new JsonResponse(['success' => 1]);

            } else {
                return new JsonResponse(['error' => 'Token Invalide'], 400);
            }
        }

        /**
         * @Route("/admin/event-type/create", name="event-type_create")
         * @param Request $request
         * @param EntityManagerInterface $manager
         * @return RedirectResponse|Response
         */
        public function create(Request $request, EntityManagerInterface $manager)
        {
            $eventType = new EventType();
            $form = $this->createForm(TypeOfEvent::class, $eventType);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {
                foreach ($form->get('upload')->getData() as $file) {
                    $this->uploadFile($file, $eventType);
                }

                $manager->persist($eventType);
                $manager->flush();

                $this->addFlash(
                    'success',
                    "L'événement a bien été créer !"
                );
                return $this->redirectToRoute('admin_index');

            } else {
                return $this->render('admin/events_type/new_event_type.htm.twig', [
                    'form' => $form->createView(),
                ]);
            }
        }

        /**
         * @Route("/admin/event-type/edit/{id}", name="event-type_edit")
         * @param EventType $eventType
         * @param Request $request
         * @param EntityManagerInterface $manager
         * @return RedirectResponse|Response
         */
        public function edit(EventType $eventType, Request $request, EntityManagerInterface $manager)
        {
            $form = $this->createForm(TypeOfEvent::class, $eventType);
            $form->handleRequest($request);

            if ($form->isSubmitted() && $form->isValid()) {

                foreach ($form->get('upload')->getData() as $file) {
                    $this->uploadFile($file, $eventType);
                }

                $manager->persist($eventType);
                $manager->flush();

                $this->addFlash(
                    'success',
                    "L'événement {$eventType->getName()} a bien été modifié !"
                );

                return $this->redirectToRoute('admin_index');
            }

            return $this->render('admin/events_type/new_event_type.htm.twig', [
                'form' => $form->createView(),
                'eventType' => $eventType
            ]);
        }

        /**
         * @Route("/admin/event-type/disable/{id}", name="event-type_disable")
         * @param EventType $eventType
         * @param EntityManagerInterface $manager
         * @return RedirectResponse
         */
        public function disable(EventType $eventType, EntityManagerInterface $manager): RedirectResponse
        {
            if ($eventType->getActive() === true) {
                $eventType->setActive(false);
                $this->addFlash(
                    'warning',
                    "L'événement {$eventType->getName()} a bien été désactivé !");
            } else {
                $eventType->setActive(true);
                $this->addFlash(
                    'success',
                    "L'événement {$eventType->getName()} a bien été activé !");
            }
            $manager->flush();

            return $this->redirectToRoute("admin_index");
        }
    }
