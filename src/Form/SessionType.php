<?php

    namespace App\Form;

    use App\Entity\Event;
    use App\Entity\EventType;
    use App\Form\DataTransformer\DateTransformer;
    use App\Repository\EventTypeRepository;
    use Symfony\Bridge\Doctrine\Form\Type\EntityType;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
    use Symfony\Component\Form\Extension\Core\Type\IntegerType;
    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;
    use Symfony\Component\Validator\Constraints\Callback;
    use Symfony\Component\Validator\Constraints\NotBlank;
    use Symfony\Component\Validator\Context\ExecutionContextInterface;

    class SessionType extends AbstractType
    {
        private DateTransformer $transformer;

        /**
         *
         * @param DateTransformer $transformer
         */

        public function __construct(DateTransformer $transformer)
        {
            $this->transformer = $transformer;
        }

        public function buildForm(FormBuilderInterface $builder, array $options)
        {
            $data = $builder->getData();
            $nbUsersRegistered = $data->users->count();

            $builder
                ->add('date_start', DateTimeType::class, [
                    'label' => 'Date et heure de début',
                    'label_attr' => ['class' => 'font-weight-bold font-italic'],
                    'attr' => ['class' => 'mb-4'],
                    'widget' => 'single_text',
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide !'
                        ])
                    ]
                ])
                ->add('date_end', DateTimeType::class, [
                    'label' => 'Date et heure de fin',
                    'label_attr' => ['class' => 'font-weight-bold font-italic'],
                    'attr' => ['class' => 'mb-4'],
                    'widget' => 'single_text',
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide !'
                        ])
                    ]
                ])
                ->add('location', TextType::class, [
                    'label' => 'Lieu',
                    'label_attr' => ['class' => 'font-weight-bold font-italic'],
                    'attr' => [
                        'placeholder' => "L'adresse complète du lieu où se déroule l'événement",
                        'class' => 'mb-4'
                    ],
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide !',
                        ])
                    ]
                ])
                ->add('nb_max_student', IntegerType::class, [
                    'label' => 'Nombre maximum de participants',
                    'label_attr' => ['class' => 'font-weight-bold font-italic'],
                    'attr' => [
                        'placeholder' => "Le nombre total de places pour l'événement, hors organisateurs",
                        'class' => 'mb-4'
                    ],
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide !',
                        ]),

                        new Callback([
                            'callback' => static function (?int $value, ExecutionContextInterface $context) use ($nbUsersRegistered) {
                                if ($value < $nbUsersRegistered) {
                                    $context
                                        ->buildViolation("Impossible il y a déjà des utilisateurs d'inscrits !")
                                        ->atPath('[nb_max_student]')
                                        ->addViolation();
                                }
                            }
                        ])
                    ]
                ])
                ->add('availablePlaces', IntegerType::class, [
                    'label' => 'Nombre de places disponibles',
                    'label_attr' => ['class' => 'font-weight-bold font-italic'],
                    'attr' => ['class' => 'mb-4'],
                    'disabled' => true
                ])
                ->add('eventType', EntityType::class, [
                    'label' => "Type d'événements",
                    'label_attr' => ['class' => 'font-weight-bold font-italic'],
                    'attr' => ['class' => 'mb-4'],
                    'class' => EventType::class,
                    'query_builder' => function (EventTypeRepository $eventTypeRepository) {
                        return $eventTypeRepository->createQueryBuilder('et')
                            ->andWhere('et.active = 1');
                    },
                    'choice_label' => 'subject',
                ]);
        }

        public function configureOptions(OptionsResolver $resolver)
        {
            $resolver->setDefaults([
                'data_class' => Event::class,
            ]);
        }
    }
