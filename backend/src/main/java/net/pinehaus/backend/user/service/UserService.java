package net.pinehaus.backend.user.service;

import lombok.RequiredArgsConstructor;
import net.pinehaus.backend.user.model.User;
import net.pinehaus.backend.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public Optional<User> getUserById(UUID id) {
        return userRepository.findUserById(id);
    }

}
