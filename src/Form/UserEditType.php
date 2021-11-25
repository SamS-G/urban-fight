<?php

    namespace App\Form;

    use App\Entity\User;
    use App\Form\DataTransformer\ZipCodeTransformer;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
    use Symfony\Component\Form\Extension\Core\Type\EmailType;
    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;
    use Symfony\Component\Validator\Constraints\Length;
    use Symfony\Component\Validator\Constraints\NotBlank;

    class UserEditType extends AbstractType
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

                ->add('isVerified', ChoiceType::class, [
                    'label' => 'Email vérifié',
                    'required' => true,
                    'choices' => [
                        'oui' => true,
                        'non' => false
                    ],
                    'expanded' => true,
                    'multiple' => false,
                ])

                ->add('username', TextType::class, [
                    'label' => "Nom d'utilisateur",
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
                    'label' => 'Nom',
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide',
                        ])
                    ]
                ])
                ->add('firstname', TextType::class, [
                    'label' => 'Prénom',
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide',
                        ])
                    ]
                ])
                ->add('street', TextType::class, [
                    'label' => 'Nom de la rue',
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide',
                        ])
                    ]
                ])
                ->add('zip_code', TextType::class, [
                    'label' => 'Code postal',
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide',
                        ])
                    ]
                ])
                ->add('city', TextType::class, [
                    'label' => 'Ville',
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide',
                        ])
                    ]
                ]);
            $builder->get('zip_code')->addModelTransformer($this->transformer);
        }


        public function configureOptions(OptionsResolver $resolver)
        {
            $resolver->setDefaults([
                'data_class' => User::class,
            ]);
        }
    }
