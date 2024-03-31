package net.pinehaus.backend.user.repository;

import net.pinehaus.backend.user.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

    Optional<UserEntity> findUserById(UUID id);

    Optional<UserEntity> findUserByGoogleId(String googleId);

}