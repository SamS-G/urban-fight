<?php

namespace App\Entity;

use App\Repository\UploadRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
* @ORM\Entity(repositoryClass=UploadRepository::class)
*/
class Upload
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
 * @ORM\ManyToMany(targetEntity=EventType::class, inversedBy="upload")
 */
private $eventType;

public function __construct()
{
    $this->eventType = new ArrayCollection();
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

/**
 * @return Collection|EventType[]
 */
public function getEventType(): Collection
{
    return $this->eventType;
}

public function addEventType(EventType $eventType): self
{
    if (!$this->eventType->contains($eventType)) {
        $this->eventType[] = $eventType;
    }

    return $this;
}

public function removeEventType(EventType $eventType): self
{
    if ($this->eventType->contains($eventType)) {
        $this->eventType->removeElement($eventType);
    }

    return $this;
}
}
