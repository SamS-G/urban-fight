<?php

    namespace App\Form;

    use App\Entity\User;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\Extension\Core\Type\EmailType;
    use Symfony\Component\Form\Extension\Core\Type\PasswordType;
    use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;
    use Symfony\Component\Validator\Constraints\Length;
    use Symfony\Component\Validator\Constraints\NotBlank;

    class RegistrationFormType extends AbstractType
    {
        public function buildForm(FormBuilderInterface $builder, array $options)
        {
            $builder
                ->add('email', EmailType::class, [
                    'attr' => [
                        'placeholder' => 'Votre adresse email valide'
                    ],
                    'label' => 'Email',
                    'label_attr' => ['class' => 'font-weight-bold font-italic mt-3'],
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide',
                        ])
                    ]
                ])
                ->add('plainPassword', RepeatedType::class, [
                    'type' => PasswordType::class,
                    'invalid_message' => 'Les deux mots de passe ne sont pas identiques',
                    'mapped' => false,
                    'required' => true,
                    'options' => ['label_attr' => ['class' => 'font-weight-bold font-italic mt-3']],
                    'first_options' => ['label' => 'Mot de passe'],
                    'second_options' => ['label' => 'Confirmez mot de passe'],
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide',
                        ]),
                        new Length([
                            'min' => 6,
                            'minMessage' => 'Vous ne respectez pas le  minimum de {{ limit }} caractères',
                            'max' => 4096,
                        ]),
                    ],
                    'attr' => [
                        'placeholder' => 'Minimum 6 caractères',
                    ]
                ])
                ->add('username', TextType::class, [
                    'label' => "Nom d'utilisateur",
                    'label_attr' => ['class' => 'font-weight-bold font-italic mt-3'],
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
                    'label_attr' => ['class' => 'font-weight-bold font-italic mt-3'],
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide'
                        ])
                    ],
                    'attr' => [
                        'placeholder' => 'Votre nom de famille'
                    ]
                ])
                ->add('firstname', TextType::class, [
                    'label' => 'Prénom',
                    'label_attr' => ['class' => 'font-weight-bold font-italic mt-3'],
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide'
                        ])
                    ],
                    'attr' => [
                        'placeholder' => 'Votre prénom'
                    ]
                ])
                ->add('street', TextType::class, [
                    'label' => 'Adresse',
                    'label_attr' => ['class' => 'font-weight-bold font-italic mt-3'],
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide'
                        ])
                    ],
                    'attr' => [
                        'placeholder' => 'Votre numéro et nom de rue'
                    ]
                ])
                ->add('zip_code', TextType::class, [
                    'label' => 'Code postal',
                    'label_attr' => ['class' => 'font-weight-bold font-italic mt-3'],
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide'
                        ]),
                        new Length(['min' => 5,
                            'minMessage' => 'Longueur de minimum {{ limit }} caractères',
                            'max' => 5,
                            'maxMessage' => 'Longueur de maximum {{ limit }} caractères'
                        ])
                    ],
                    'attr' => [
                        'placeholder' => 'Votre code postal'
                    ]
                ])
                ->add('city', TextType::class, [
                    'label' => 'Ville',
                    'label_attr' => ['class' => 'font-weight-bold font-italic mt-3'],
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide'
                        ])
                    ],
                    'attr' => [
                        'placeholder' => 'Le nom de votre ville'
                    ]
                ]);
        }

        public function configureOptions(OptionsResolver $resolver)
        {
            $resolver->setDefaults([
                'data_class' => User::class,
            ]);
        }
    }
