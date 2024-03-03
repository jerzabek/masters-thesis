package net.pinehaus.backend.user.controller;

import lombok.RequiredArgsConstructor;
import net.pinehaus.backend.user.model.User;
import net.pinehaus.backend.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable UUID id) {
        Optional<User> user = userService.getUserById(id);

        if (user.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");

        return user.orElse(null);
    }

}
