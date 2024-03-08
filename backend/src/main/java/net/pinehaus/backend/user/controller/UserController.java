package net.pinehaus.backend.user.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
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
@Tag(name = "Users", description = "User API")
public class UserController {

    private final UserService userService;

    @GetMapping("/user/{id}")
    @Operation(summary = "Get a user by ID.", description = "Fetch user by ID, if it exists.")
    @ApiResponses({
            @ApiResponse(responseCode = "200"),
            @ApiResponse(responseCode = "404", content = {@Content(schema = @Schema())})})
    public User getUser(@PathVariable UUID id) {
        Optional<User> user = userService.getUserById(id);

        if (user.isEmpty()) throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");

        return user.orElse(null);
    }

}
