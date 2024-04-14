package net.pinehaus.backend.user.service;

import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import net.pinehaus.backend.user.dto.UpdateUserDTO;
import net.pinehaus.backend.user.model.UserEntity;
import net.pinehaus.backend.user.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

  private final UserRepository userRepository;

  public Optional<UserEntity> getUserById(UUID id) {
    return userRepository.findUserById(id);
  }

  public Optional<UserEntity> getUserByGoogleId(String googleId) {
    return userRepository.findUserByGoogleId(googleId);
  }

  public UserEntity save(UserEntity user) {
    return userRepository.save(user);
  }

  public void updateUser(UserEntity userEntity, UpdateUserDTO dto) {
    userEntity.setFirstName(dto.getFirstName());
    userEntity.setLastName(dto.getLastName());
    userEntity.setAvatarUrl(dto.getAvatarUrl());
    userEntity.setUsername(dto.getUsername());

    userRepository.save(userEntity);
  }
}