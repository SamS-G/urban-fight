<?php

    namespace App\Entity;

    use App\Repository\EventRepository;
    use Doctrine\Common\Collections\ArrayCollection;
    use Doctrine\Common\Collections\Collection;
    use Doctrine\ORM\Mapping as ORM;
    use Symfony\Component\Validator\Constraints as Assert;

    /**
     * @ORM\Entity(repositoryClass=EventRepository::class)
     * @ORM\HasLifecycleCallbacks()
     */
    class Event
    {
        /**
         * @ORM\Id()
         * @ORM\GeneratedValue()
         * @ORM\Column(type="integer")
         */
        public $id;

        /**
         * @ORM\Column(type="datetime")
         * @Assert\Type("\DateTimeInterface", message="Le format de date n'est pas valide !")
         * @Assert\GreaterThan("today", message="La date de début ne peut pas être ultérieur à la date du jour !")
         */
        private $date_start;

        /**
         * @ORM\Column(type="datetime")
         * @Assert\Type("\DateTimeInterface", message="Le format de date n'est pas valide !")
         * @Assert\GreaterThan(propertyPath="date_start", message="La date de fin doit être plus éloignée que la date de début !")
         */
        private $date_end;

        /**
         * @ORM\Column(type="string", length=255)
         */
        private $location;

        /**
         * @ORM\Column(type="integer")
         * @Assert\Positive(message="Le nombre max de places ne peut pas être négatif !")
         * @Assert\Type(
         *     type="integer",
         *     message="L'entrée {{ value }} n'est pas valide, chiffre obligatoire.")
         */
        private $nb_max_student;

        /**
         * @ORM\ManyToOne(targetEntity=EventType::class, inversedBy="events", fetch="EAGER", cascade={"persist"})
         * @ORM\JoinColumn(nullable=false)
         */
        private $event_type;

        /**
         * @ORM\ManyToMany(targetEntity=User::class, inversedBy="events", fetch="EAGER", cascade={"persist"})
         */
        public $users;

        /**
         * @ORM\Column(type="integer")
         * @Assert\Type(
         *     type="integer",
         *     message="L'entrée {{ value }} n'est pas valide, chiffre obligatoire.")
         */
        public $available_places;

        public function __construct()
        {
            $this->users = new ArrayCollection();
        }

        public function getId(): ?int
        {
            return $this->id;
        }

        public function getDateStart(): ?\DateTimeInterface
        {
            return $this->date_start;
        }

        public function setDateStart(\DateTimeInterface $date_start): self
        {
            $this->date_start = $date_start;

            return $this;
        }

        public function getDateEnd(): ?\DateTimeInterface
        {
            return $this->date_end;
        }

        public function setDateEnd(\DateTimeInterface $date_end): self
        {
            $this->date_end = $date_end;

            return $this;
        }

        public function getLocation(): ?string
        {
            return $this->location;
        }

        public function setLocation(string $location): self
        {
            $this->location = $location;

            return $this;
        }

        public function getNbMaxStudent(): ?int
        {
            return $this->nb_max_student;
        }

        public function setNbMaxStudent(int $nb_max_student): self
        {
            $this->nb_max_student = $nb_max_student;

            return $this;
        }


        public function getEventType(): ?EventType
        {
            return $this->event_type;
        }

        public function setEventType(EventType $event_type): self
        {
            $this->event_type = $event_type;

            return $this;
        }

        /**
         * @return Collection|User[]
         */
        public function getUsers(): Collection
        {
            return $this->users;
        }

        public function addUser(User $user): self
        {
            if (!$this->users->contains($user)) {
                $this->users[] = $user;
            }

            return $this;
        }

        public function removeUser(User $user): self
        {
            if ($this->users->contains($user)) {
                $this->users->removeElement($user);
            }

            return $this;
        }

        public function getAvailablePlaces(): ?int
        {
            return $this->available_places;
        }

        public function setAvailablePlaces(?int $available_places): self
        {
            $this->available_places = $available_places;

            return $this;
        }

        /**
         * @return int|null
         */
        public function countAvailablePlaces()
        {
            return $this->getNbMaxStudent() - $this->getUsers()->count();

        }
    }
