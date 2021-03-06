<?php

    namespace App\Repository;

    use App\Entity\Event;
    use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
    use Doctrine\Persistence\ManagerRegistry;

    /**
     * @method Event|null find($id, $lockMode = null, $lockVersion = null)
     * @method Event|null findOneBy(array $criteria, array $orderBy = null)
     * @method Event[]    findAll()
     * @method Event[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
     */
    class EventRepository extends ServiceEntityRepository
    {
        public function __construct(ManagerRegistry $registry)
        {
            parent::__construct($registry, Event::class);
        }

        public function findByDate(\DateTime $date)
        {
            return $this->createQueryBuilder('e')
                ->andWhere('e.date_end > :date')
                ->setParameter('date', $date)
                ->getQuery()
                ->getResult();
        }


        public function findUserRegister($eventId, $userId)
        {
            foreach ($this->find($eventId)->getUsers() as $user) {
                if ($user->getId() == $userId) {
                    return true;
                } else {
                    return false;
                }
            }
        return null;
        }
    }
