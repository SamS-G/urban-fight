<?php

    namespace App\Controller;

    use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
    use Symfony\Component\HttpFoundation\Response;
    use Symfony\Component\Routing\Annotation\Route;

    class ResponseController extends AbstractController
    {

        /**
         * @Route("/psycho", name="psycho_response")
         * @return Response
         */
        public function psycho()
        {
            return $this->render('/urbanFight/urbanFightPsycho.html.twig');
        }

        /**
         * @Route("/level", name="level_response")
         * @return Response
         */
        public function trainingLevel()
        {
            return $this->render('/urbanFight/urbanFightTrainingLevel.html.twig');
        }

        /**
         * @Route("/physical", name="physical")
         * @return Response
         */
        public function physical()
        {
            return $this->render('urbanFight/urbanFightPhysical.html.twig');
        }

        /**
         * @Route("/force", name="force_response")
         * @return Response
         */
        public function force()
        {
            return $this->render('urbanFight/urbanFightForce.html.twig');
        }
    }