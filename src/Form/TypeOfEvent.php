<?php

    namespace App\Form;

    use App\Entity\EventType;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
    use Symfony\Component\Form\Extension\Core\Type\FileType;
    use Symfony\Component\Form\Extension\Core\Type\TextareaType;
    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\OptionsResolver\OptionsResolver;

    class TypeOfEvent extends AbstractType
    {
        public function buildForm(FormBuilderInterface $builder, array $options)
        {
            $builder
                ->add('name', TextType::class, [
                    'label' => 'Nom',
                    'label_attr' => [
                        'class' => 'font-weight-bold font-italic'
                    ],
                    'attr' => [
                        'class' => 'mb-4'
                    ]
                ])
                ->add('subject', TextType::class, [
                    'label' => 'Sujet',
                    'label_attr' => [
                        'class' => 'font-weight-bold font-italic'
                    ],
                    'attr' => [
                        'class' => 'mb-4'
                    ]
                ])
                ->add('content', TextareaType::class, [
                    'label' => 'Contenu',
                    'label_attr' => [
                        'class' => 'font-weight-bold font-italic'
                    ],
                    'attr' => [
                        'class' => 'mb-4'
                    ],
                    'required' => false,
                ])
                ->add('upload', FileType::class, [
                        'label' => "Charger une image d'illustration",
                        'label_attr' => [
                            'class' => 'font-weight-bold font-italic'
                        ],
                        'multiple' => true,
                        'mapped' => false,
                        'required' => false,
                        'attr' => [
                            'placeholder' => 'Maximum 2M, format image uniquement, une seule photo',
                            'class' => 'mb-3'
                        ],
                    ]
                )
                ->add('active', ChoiceType::class, [
                    'label' => 'Evénement actif',
                    'label_attr' => [
                        'class' => 'font-weight-bold font-italic'
                    ],
                    'required' => true,
                    'choices' => [
                        'oui' => true,
                        'non' => false
                    ],
                    'expanded' => true,
                    'multiple' => false,
                ]);
        }

        public function configureOptions(OptionsResolver $resolver)
        {
            $resolver->setDefaults([
                'data_class' => EventType::class,
            ]);
        }
    }
