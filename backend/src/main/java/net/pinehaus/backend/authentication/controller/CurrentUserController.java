package net.pinehaus.backend.authentication.controller;

import net.pinehaus.backend.security.CurrentUser;
import net.pinehaus.backend.security.UserPrincipal;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CurrentUserController {

  @GetMapping("/me")
  public ResponseEntity<UserPrincipal> getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
    if (userPrincipal == null) {
      return ResponseEntity.notFound().build();
    }

    return ResponseEntity.ok(userPrincipal);
  }

}