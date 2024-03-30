package net.pinehaus.backend.user.service;

import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.pinehaus.backend.security.UserPrincipal;
import net.pinehaus.backend.user.model.UserEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Slf4j(topic = "UserDetailService")
@RequiredArgsConstructor
public class UserDetailService implements UserDetailsService {

  private final UserService userService;

  @Override
  public UserPrincipal loadUserByUsername(String uuid) throws UsernameNotFoundException {
    // Fetch user details from your data source based on the provided UUID
    Optional<UserEntity> userOptional = userService.getUserById(UUID.fromString(uuid));

    // Check if the user exists
    UserEntity userEntity = userOptional.orElseThrow(() ->
        new UsernameNotFoundException("User not found with UUID: " + uuid));

    // Create a UserDetails object based on your UserEntity
    return new UserPrincipal(userEntity);
  }

}