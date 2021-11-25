<?php

    namespace App\Entity;

    use App\Repository\EventTypeRepository;
    use Doctrine\Common\Collections\ArrayCollection;
    use Doctrine\Common\Collections\Collection;
    use Doctrine\ORM\Mapping as ORM;

    /**
     * @ORM\Entity(repositoryClass=EventTypeRepository::class)
     * @ORM\HasLifecycleCallbacks()
     */
    class EventType
    {
        /**
         * @ORM\Id()
         * @ORM\GeneratedValue()
         * @ORM\Column(type="integer")
         */
        private $id;


        /**
         * @ORM\Column(type="string", length=255)
         */
        private $name;

        /**
         * @ORM\Column(type="string", length=255)
         */
        private $subject;

        /**
         * @ORM\Column(type="text")
         */
        private $content;

        /**
         * @ORM\OneToMany(targetEntity=Event::class, mappedBy="event_type", orphanRemoval=true, fetch="EAGER")
         */
        private $events;

        /**
         * @ORM\ManyToMany(targetEntity=Upload::class, mappedBy="eventType", cascade={"persist"})
         */
        private $upload;

        /**
         * @ORM\Column(type="boolean")
         */
        private $active;


        public function __construct()
        {
            $this->events = new ArrayCollection();
            $this->upload = new ArrayCollection();
        }

        public function getId(): ?int
        {
            return $this->id;
        }

        public function getName(): ?string
        {
            return $this->name;
        }

        public function setName(string $name): self
        {
            $this->name = $name;

            return $this;
        }

        public function getSubject(): ?string
        {
            return $this->subject;
        }

        public function setSubject(string $subject): self
        {
            $this->subject = $subject;

            return $this;
        }

        public function getContent(): ?string
        {
            return $this->content;
        }

        public function setContent(string $content): self
        {
            $this->content = $content;

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
                $event->setEventType($this);
            }

            return $this;
        }

        public function removeEvent(Event $event): self
        {
            if ($this->events->contains($event)) {
                $this->events->removeElement($event);
                if ($event->getEventType() === $this) {
                    $event->setEventType(null);
                }
            }
            return $this;
        }

        /**
         * @return Collection|Upload[]
         */
        public function getUpload(): Collection
        {
            return $this->upload;
        }

        public function addUpload(Upload $upload): self
        {
            if (!$this->upload->contains($upload)) {
                $this->upload[] = $upload;
                $upload->addEventType($this);
            }

            return $this;
        }

        public function removeUpload(Upload $upload): self
        {
            if ($this->upload->contains($upload)) {
                $this->upload->removeElement($upload);
                $upload->removeEventType($this);
            }

            return $this;
        }

        public function __toString()
        {
            return $this->getSubject() . ' du ';
        }

        public function getActive(): ?bool
        {
            return $this->active;
        }

        public function setActive(bool $active): self
        {
            $this->active = $active;

            return $this;
        }
    }
