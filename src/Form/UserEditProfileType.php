<?php

    namespace App\Form;

    use App\Form\DataTransformer\ZipCodeTransformer;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\Extension\Core\Type\EmailType;
    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\Validator\Constraints\Length;
    use Symfony\Component\Validator\Constraints\NotBlank;

    class UserEditProfileType extends AbstractType
    {
        private ZipCodeTransformer $transformer;

        public function __construct(ZipCodeTransformer $transformer)
        {
            $this->transformer = $transformer;
        }

        public function buildForm(FormBuilderInterface $builder, array $options)
        {
            $builder
                ->add('email', EmailType::class, [
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide',
                        ])
                    ]
                ])
                ->add('username', TextType::class, [
                    'constraints' => [
                        new Length([
                            'min' => 3,
                            'minMessage' => 'Longueur de minimum {{ limit }} caractères',
                            'max' => 20,
                        ]),
                    ],
                    'attr' => [
                        'placeholder' => 'Choisissez votre pseudonyme'
                    ]
                ])
                ->add('lastname', TextType::class, [
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide',
                        ])
                    ]
                ])
                ->add('firstname', TextType::class, [
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide',
                        ])
                    ]
                ])
                ->add('street', TextType::class, [
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide',
                        ])
                    ]
                ])
                ->add('zip_code', TextType::class, [
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide',
                        ])
                    ]
                ])
                ->add('city', TextType::class, [
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide',
                        ])
                    ]
                ]);
            $builder->get('zip_code')->addModelTransformer($this->transformer);
        }
    }
