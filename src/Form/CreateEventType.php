<?php

    namespace App\Form;

    use App\Entity\Event;
    use App\Entity\EventType;
    use App\Form\DataTransformer\DateTransformer;
    use Symfony\Bridge\Doctrine\Form\Type\EntityType;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\Extension\Core\Type\DateType;
    use Symfony\Component\Form\Extension\Core\Type\IntegerType;
    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;
    use Symfony\Component\Validator\Constraints\NotBlank;

    class CreateEventType extends AbstractType
    {
        private DateTransformer $transformer;

        public function __construct(DateTransformer $transformer)
        {
            $this->transformer = $transformer;
        }

        public function buildForm(FormBuilderInterface $builder, array $options)
        {
            $builder
                ->add('date_start', DateType::class, [
                    'widget' => 'single_text'
                ])
                ->add('date_end', DateType::class, [
                    'widget' => 'single_text'
                ])
                ->add('location', TextType::class, [
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide',
                        ])
                    ]
                ])
                ->add('nb_max_student', IntegerType::class, [
                    'constraints' => [
                        new NotBlank([
                            'message' => 'Ce champ ne peut être vide',
                        ])
                    ]
                ])
                ->add('availablePlaces', IntegerType::class, [
                    'disabled' => true
                ])
                ->add('eventType', EntityType::class, [
                    'class' => EventType::class,
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
