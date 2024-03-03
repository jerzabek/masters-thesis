package net.pinehaus.backend.user.repository;

import net.pinehaus.backend.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findUserById(UUID id);

}
