package net.pinehaus.backend.user.repository;

import java.util.Optional;
import java.util.UUID;
import net.pinehaus.backend.user.model.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserEntity, Integer> {

  Optional<UserEntity> findUserById(UUID id);

  Optional<UserEntity> findUserByGoogleId(String googleId);

}