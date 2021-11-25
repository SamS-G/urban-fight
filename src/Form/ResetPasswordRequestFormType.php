<?php

    namespace App\Form;

    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\Extension\Core\Type\EmailType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;
    use Symfony\Component\Validator\Constraints\NotBlank;

    class ResetPasswordRequestFormType extends AbstractType
    {
        public function buildForm(FormBuilderInterface $builder, array $options): void
        {
            $builder
                ->add('email', EmailType::class, [
                    'constraints' => [
                        new NotBlank([
                            'message' => "S'il vous plaît entre votre adresse mail",
                        ]),
                    ],
                    'label' => 'Email',
                    'label_attr' => ['class' => 'font-weight-bold font-italic mt-3'],
                    'help' => "Entrez votre adresse pour recevoir le lien de création d'un nouveau mot de passe"
                ]);

        }

        public function configureOptions(OptionsResolver $resolver): void
        {
            $resolver->setDefaults([]);
        }
    }
