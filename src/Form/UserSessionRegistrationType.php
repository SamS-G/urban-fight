<?php

    namespace App\Form;


    use App\Entity\Event;
    use App\Entity\EventType;
    use App\Form\DataTransformer\DateTransformer;
    use App\Repository\EventTypeRepository;
    use Symfony\Bridge\Doctrine\Form\Type\EntityType;
    use Symfony\Component\Form\AbstractType;
    use Symfony\Component\Form\Extension\Core\Type\HiddenType;
    use Symfony\Component\Form\Extension\Core\Type\TextType;
    use Symfony\Component\Form\FormBuilderInterface;
    use Symfony\Component\Form\FormEvent;
    use Symfony\Component\Form\FormEvents;
    use Symfony\Component\OptionsResolver\OptionsResolver;


    class UserSessionRegistrationType extends AbstractType
    {
        /**
         * @var DateTransformer
         */
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
            $builder
                ->add('date_start', TextType::class, [
                    'label' => 'Date et heure de début',
                    'label_attr' => ['class' => 'font-weight-bold font-italic mt-3'],
                    'disabled' => true,
                    'attr' => ['class' => 'form-control-sm text-center mb-4']
                ])
                ->add('date_end', TextType::class, [
                    'label' => 'Date et heure de fin',
                    'label_attr' => ['class' => 'font-weight-bold font-italic'],
                    'disabled' => true,
                    'attr' => ['class' => 'container form-control-sm text-center mb-4']
                ])
                ->add('location', TextType::class, [
                    'label' => 'Lieu',
                    'label_attr' => ['class' => 'font-weight-bold font-italic'],
                    'disabled' => true,
                    'attr' => ['class' => 'form-control-sm text-center mb-4']
                ])
                ->add('available_places', TextType::class, [
                    'label' => 'Places restantes disponibles',
                    'label_attr' => ['class' => 'font-weight-bold font-italic'],
                    'disabled' => true,
                    'attr' => ['class' => ' col-lg-2 form-control-sm text-center mb-4']
                ])
                ->add('id', HiddenType::class, [
                    'data' => $options['id']
                ])
                ->add('event_type', EntityType::class, [
                    'class' => EventType::class,
                    'query_builder' => function (EventTypeRepository $em) use ($options) {
                        return $em->createQueryBuilder('e')
                            ->where('e.id = :id')
                            ->setParameter('id', $options['id']);
                    },
                    'choice_label' => 'subject',
                    'label' => 'Thème',
                    'label_attr' => ['class' => 'font-weight-bold font-italic'],
                    'expanded' => true,
                    'multiple' => false,
                    'disabled' => true,
                    'attr' => ['class' => 'form-control-sm']
                ])
                /**
                 * Fields for user informations
                 */
                ->add('lastname', TextType::class, [
                    'mapped' => false,
                    'label' => 'Votre nom',
                    'label_attr' => ['class' => 'font-weight-bold font-italic'],
                    'disabled' => true,
                    'attr' => ['class' => 'form-control form-control-sm text-center']
                ])
                ->add('firstname', TextType::class, [
                    'mapped' => false,
                    'label' => 'Votre prénom',
                    'label_attr' => ['class' => 'font-weight-bold font-italic'],
                    'disabled' => true,
                    'attr' => ['class' => 'form-control form-control-sm text-center']
                ])
                ->add('email', TextType::class, [
                    'mapped' => false,
                    'label' => 'Votre email',
                    'label_attr' => ['class' => 'font-weight-bold font-italic'],
                    'disabled' => true,
                    'attr' => ['class' => 'form-control form-control-sm text-center']
                ]);
            $builder->get('date_start')->addModelTransformer($this->transformer);
            $builder->get('date_end')->addModelTransformer($this->transformer);
            $builder->addEventListener(FormEvents::PRE_SET_DATA, function (FormEvent $event) {

            });
        }

        public function configureOptions(OptionsResolver $resolver)
        {
            $resolver->setDefaults([
                'data_class' => Event::class,
                'id' => null
            ]);
        }
    }
