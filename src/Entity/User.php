<?php

    namespace App\Entity;

    use App\Repository\UserRepository;
    use Doctrine\Common\Collections\ArrayCollection;
    use Doctrine\Common\Collections\Collection;
    use Doctrine\ORM\Mapping as ORM;
    use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
    use Symfony\Component\Security\Core\User\UserInterface;
    use Symfony\Component\Validator\Constraints as Assert;

    /**
     * @ORM\Entity(repositoryClass=UserRepository::class)
     * @ORM\HasLifecycleCallbacks()
     * @UniqueEntity(fields={"email"}, message="Cet email est déjà utilisé !")
     */
    class User implements UserInterface
    {
        /**
         * @ORM\Id()
         * @ORM\GeneratedValue()
         * @ORM\Column(type="integer")
         */
        public $id;

        /**
         * @ORM\Column(type="string", length=180, unique=true)
         */
        private $email;

        /**
         * @ORM\Column(type="json")
         */
        private $roles = ["ROLE_USER"];

        /**
         * @var string The hashed password
         * @ORM\Column(type="string")
         */
        private $password;

        /**
         * @ORM\Column(type="boolean")
         */
        private $isVerified = false;

        /**
         * @ORM\Column(type="string", length=255)
         */
        private $username;

        /**
         * @ORM\Column(type="string", length=255)
         */
        private $lastname;

        /**
         * @ORM\Column(type="string", length=255)
         */
        private $firstname;

        /**
         * @ORM\Column(type="string", length=255)
         */
        private $street;

        /**
         * @ORM\Column(type="string", length=5)
         */
        private $zip_code;

        /**
         * @ORM\Column(type="string", length=255)
         */
        private $city;

        /**
         * @ORM\Column(type="boolean", nullable=true)
         */
        private $is_banned;

        /**
         * @ORM\ManyToMany(targetEntity=Event::class,  fetch="EAGER", mappedBy="users", orphanRemoval=true, cascade={"persist"})
         * @Assert\Valid()
         */
        private $events;

        /**
         * @ORM\Column(type="string", length=255, nullable=true)
         */
        private $token;

        public function __construct()
        {
            $this->events = new ArrayCollection();
        }

        public function getId(): ?int
        {
            return $this->id;
        }

        public function getEmail(): ?string
        {
            return $this->email;
        }

        public function setEmail(string $email): self
        {
            $this->email = $email;

            return $this;
        }

        /**
         * A visual identifier that represents this user.
         *
         * @see UserInterface
         */
        public function getUsername(): string
        {
            return (string)$this->username;
        }

        public function setUsername(string $username): self
        {
            $this->username = $username;

            return $this;
        }

        /**
         * @see UserInterface
         */
        public function getRoles(): array
        {
            $roles = $this->roles;
            // guarantee every user at least has ROLE_USER
            $roles[] = 'ROLE_USER';

            return array_unique($roles);
        }

        public function setRoles(array $roles): self
        {
            $this->roles = $roles;

            return $this;
        }

        /**
         * @see UserInterface
         */
        public function getPassword(): string
        {
            return (string)$this->password;
        }

        public function setPassword(string $password): self
        {
            $this->password = $password;

            return $this;
        }

        /**
         * @see UserInterface
         */
        public function getSalt()
        {
            // not needed when using the "bcrypt" algorithm in security.yaml
        }

        /**
         * @see UserInterface
         */
        public function eraseCredentials()
        {
            // If you store any temporary, sensitive data on the user, clear it here
            // $this->plainPassword = null;
        }

        public function isVerified(): bool
        {
            return $this->isVerified;
        }

        public function setIsVerified(bool $isVerified): self
        {
            $this->isVerified = $isVerified;

            return $this;
        }

        public function getLastname(): ?string
        {
            return $this->lastname;
        }

        public function setLastname(string $lastname): self
        {
            $this->lastname = $lastname;

            return $this;
        }

        public function getFirstname(): ?string
        {
            return $this->firstname;
        }

        public function setFirstname(string $firstname): self
        {
            $this->firstname = $firstname;

            return $this;
        }

        public function getStreet(): ?string
        {
            return $this->street;
        }

        public function setStreet(string $street): self
        {
            $this->street = $street;

            return $this;
        }

        public function getZipCode(): ?string
        {
            return (string)$this->zip_code;
        }

        public function setZipCode(int $zip_code): self
        {
            $this->zip_code = $zip_code;

            return $this;
        }

        public function getCity(): ?string
        {
            return $this->city;
        }

        public function setCity(string $city): self
        {
            $this->city = $city;

            return $this;
        }

        public function getIsBanned(): ?bool
        {
            return $this->is_banned;
        }

        public function setIsBanned(?bool $is_banned): self
        {
            $this->is_banned = $is_banned;

            return $this;
        }

        /**
         * @return Collection|Event[]
         */
        public function getEvents(): Collection
        {
            return $this->events;
        }

        public function addEvent(Event $event): self
        {
            if (!$this->events->contains($event)) {
                $this->events[] = $event;
                $event->addUser($this);
            }

            return $this;
        }

        public function removeEvent(Event $event): self
        {
            if ($this->events->contains($event)) {
                $this->events->removeElement($event);
                $event->removeUser($this);
            }

            return $this;
        }

        public function getToken(): ?string
        {
            return $this->token;
        }

        public function setToken(?string $token): self
        {
            $this->token = $token;

            return $this;
        }
    }
