<?php

    namespace App\Form\DataTransformer;

    use Symfony\Component\Form\DataTransformerInterface;
    use Symfony\Component\Form\Exception\TransformationFailedException;

    class DateTransformer implements DataTransformerInterface
    {

        /**
         * @inheritDoc
         */
        public function transform($date)
        {
            if ($date === null) {
                return '';
            }

            return $date->format('d/m/Y à H:i:s');
        }

        /**
         * @inheritDoc
         */
        public function reverseTransform($transformedDate)
        {
            if ($transformedDate === null) {
                throw new TransformationFailedException("Vous devez fournir une date !");
            }
            $date = \DateTime::createFromFormat('d/m/Y H:i:s', $transformedDate);

            if ($date === false) {
                throw new TransformationFailedException("Le format de la date n'est pas le bon, pensez à séparer par un " / "");
            }

            return $date;
        }
    }