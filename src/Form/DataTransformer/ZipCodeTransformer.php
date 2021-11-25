<?php


    namespace App\Form\DataTransformer;


    use Symfony\Component\Form\Exception\TransformationFailedException;

    class ZipCodeTransformer implements \Symfony\Component\Form\DataTransformerInterface
    {
        /**
         * @param mixed $zipcode
         * @return mixed|string
         */
        public function transform($zipcode)
        {
            if ($zipcode === null) {
                return '';
            } elseif (strlen($zipcode) < 5) {
                return 0 . $zipcode;
            } else {
                return $zipcode;
            }
        }

        /**
         * @param mixed $transformedZipCode
         * @return mixed
         */
        public function reverseTransform($transformedZipCode)
        {
            if ($transformedZipCode === null) {
                throw new TransformationFailedException("Vous devez fournir un code postal !");
            }
            else
            {
                return $transformedZipCode;
            }
        }
    }