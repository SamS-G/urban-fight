<?php

    namespace App\Form;

    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\Extension\Core\Type\PasswordType;
    use Symfony\Component\Form\Extension\Core\Type\RepeatedType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;
    use Symfony\Component\Validator\Constraints\Length;
    use Symfony\Component\Validator\Constraints\NotBlank;

    class ChangePasswordFormType extends AbstractType
    {
        public function buildForm(FormBuilderInterface $builder, array $options): void
        {
            $builder
                ->add('plainPassword', RepeatedType::class, [
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
                        'label' => 'Nouveau mot de passe',
                        'label_attr' => ['class' => 'font-weight-bold font-italic mt-3']
                    ],
                    'second_options' => [
                        'label' => 'Répétez le mot de passe',
                        'label_attr' => ['class' => 'font-weight-bold font-italic mt-3']
                    ],
                    'invalid_message' => 'Les deux mots de passe doivent êtres identiques',
                    'mapped' => false,
                ]);
        }

        public function configureOptions(OptionsResolver $resolver): void
        {
            $resolver->setDefaults([]);
        }
    }
