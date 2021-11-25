<?php

    namespace App\Form;

    use App\Entity\Event;
    use App\Entity\User;
    use Symfony\Bridge\Doctrine\Form\Type\EntityType;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;

    class SessionRegistrationType extends AbstractType
    {

        public function buildForm(FormBuilderInterface $builder, array $options)
        {
            $builder
                ->add('events', EntityType::class, [
                    'class' => Event::class,
                    'label' => 'Thème abordé',
                    'label_attr' => ['class' => 'font-weight-bold font-italic mt-4'],
                    'multiple' => false,
                    'expanded' => false,
                    'attr' => ['class' => 'mb-4 font-weight-light'],
                    'choice_label' => function (Event $event) {
                        return $event->getEventType() . $event->getDateStart()->format('j M Y');
                    }
                ])
                ->add('users', EntityType::class, [
                    'class' => User::class,
                    'label' => 'Utilisateur',
                    'label_attr' => ['class' => 'font-weight-bold font-italic mt-4'],
                    'multiple' => false,
                    'expanded' => false,
                    'attr' => ['class' => 'mb-4 font-weight-light'],
                    'choice_label' => function (User $user) {
                        return $user->getFirstname() . ' ' . $user->getLastname();
                    }
                ]);
        }

        public function configureOptions(OptionsResolver $resolver)
        {
        }
    }
