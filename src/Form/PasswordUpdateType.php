<?php

    namespace App\Form;

    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\Extension\Core\Type\PasswordType;
    use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;
    use Symfony\Component\Validator\Constraints\Length;
    use Symfony\Component\Validator\Constraints\NotBlank;

    class PasswordUpdateType extends AbstractType
    {
        public function buildForm(FormBuilderInterface $builder, array $options)
        {
            $builder
                ->add('oldPassword', PasswordType::class, [
                    'attr' => [
                        'placeholder' => 'Remplissez votre mot de passe actuel'
                    ],
                    'label' => 'Ancien mot de passe',
                    'label_attr' => ['class' => 'font-weight-bold font-italic mt-3']
                ])
                ->add('newPassword', RepeatedType::class, [
                    'type' => PasswordType::class,
                    'first_options' => [
                        'constraints' => [
                            new NotBlank([
                                'message' => 'Entrez un mot de passe',
                            ]),
                            new Length([
                                'min' => 6,
                                'minMessage' => 'Votre mot de passe doit faire {{ limit }} caractères minimum',
                                'max' => 4096,
                            ]),
                        ],
                        'attr' => [
                            'placeholder' => 'Tapez votre nouveau mot de passe'
                        ],
                        'label' => 'Nouveau mot de passe',
                        'label_attr' => ['class' => 'font-weight-bold font-italic mt-3']
                    ],

                    'second_options' => [
                        'attr' => [
                            'placeholder' => 'Confirmez votre nouveau mot de passe'
                        ],
                        'label' => 'Confirmez',
                        'label_attr' => ['class' => 'font-weight-bold font-italic mt-3']
                    ],
                    'invalid_message' => 'Les deux mots de passe doivent êtres identiques',
                    'mapped' => false,
                ]);
        }

        public function configureOptions(OptionsResolver $resolver)
        {
            $resolver->setDefaults([
                // Configure your form options here
            ]);
        }
    }
