<?php


    namespace App\Security;

    use App\Entity\User as AppUser;
    use Symfony\Component\Security\Core\Exception\CustomUserMessageAccountStatusException;
    use Symfony\Component\Security\Core\User\UserCheckerInterface;
    use Symfony\Component\Security\Core\User\UserInterface;

    class UserChecker implements UserCheckerInterface
    {
        public function checkPreAuth(UserInterface $user)
        {
            if (!$user instanceof AppUser) {
                return;
            }

            if (!$user->isVerified()) {

                throw new CustomUserMessageAccountStatusException("Vous n'avez pas encore confirmé votre adresse mail. 
               Vérifiez votre courrier ou contactez l'admininstrateur admin@urbanfight.com.");
            }
        }

        public function checkPostAuth(UserInterface $user)
        {
            if (!$user instanceof AppUser) {
                return;
            }
        }
    }