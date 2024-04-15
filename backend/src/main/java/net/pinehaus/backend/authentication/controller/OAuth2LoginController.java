package net.pinehaus.backend.authentication.controller;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.pinehaus.backend.authentication.AuthenticationProvider;
import net.pinehaus.backend.authentication.google.model.GoogleLoginDTO;
import net.pinehaus.backend.authentication.google.service.GoogleAuthenticationService;
import net.pinehaus.backend.authentication.service.AuthenticationService;
import net.pinehaus.backend.security.UserPrincipal;
import net.pinehaus.backend.user.model.UserEntity;
import net.pinehaus.backend.user.service.UserService;
import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
@RequiredArgsConstructor
@Slf4j
public class OAuth2LoginController {

  private final AuthenticationService authenticationService;
  private final GoogleAuthenticationService googleAuthenticationService;
  private final UserService userService;

  @Value("${app.frontend.url}")
  public String FRONTEND_URL;

  @PostMapping("/login/oauth2/code/{provider}")
  @Transactional
  public ResponseEntity<String> loginSuccess(@PathVariable String provider,
      GoogleLoginDTO authenticationToken) {
    switch (provider) {
      case "google":
        Optional<GoogleIdToken> googleIdTokenOptional = googleAuthenticationService.verifyToken(
            authenticationToken.getCredential());

        if (googleIdTokenOptional.isEmpty()) {
          return ResponseEntity.status(HttpStatus.SC_MOVED_TEMPORARILY)
                               .header("Location", FRONTEND_URL + "/login?e")
                               .build();
        }

        GoogleIdToken googleIdToken = googleIdTokenOptional.get();
        GoogleIdToken.Payload payload = googleIdToken.getPayload();

        String userGoogleId = payload.getSubject();

        Optional<UserEntity> existingUser = userService.getUserByGoogleId(userGoogleId);
        UserEntity user;

        if (existingUser.isPresent()) {
          user = existingUser.get();
        } else {
          String userEmail = payload.getEmail();
          String pictureUrl = (String) payload.get("picture");
          String lastName = (String) payload.get("family_name");
          String firstName = (String) payload.get("given_name");

          user = userService.save(UserEntity.builder()
                                            .email(userEmail)
                                            .firstName(firstName)
                                            .lastName(lastName)
                                            .avatarUrl(pictureUrl)
                                            .googleId(userGoogleId)
                                            .authenticationProvider(AuthenticationProvider.GOOGLE)
                                            .build());
        }

        if (authenticationService.isUserSessionValid(user)) {
          HttpCookie cookie = authenticationService.createSessionCookie(user.getSessionId());

          return ResponseEntity.status(HttpStatus.SC_MOVED_TEMPORARILY)
                               .header(HttpHeaders.SET_COOKIE, cookie.toString())
                               .header("Location", FRONTEND_URL + "/")
                               .build();
        } else {
          String sessionId = authenticationService.createNewUserSession(user);
          HttpCookie cookie = authenticationService.createSessionCookie(sessionId);

          return ResponseEntity.status(HttpStatus.SC_MOVED_TEMPORARILY)
                               .header(HttpHeaders.SET_COOKIE, cookie.toString())
                               .header("Location", FRONTEND_URL + "/")
                               .build();
        }
      default:
        return ResponseEntity.status(HttpStatus.SC_MOVED_TEMPORARILY)
                             .header("Location", FRONTEND_URL + "/login")
                             .build();
    }
  }

  @PostMapping("/login/logout")
  public ResponseEntity<String> logout(@AuthenticationPrincipal UserPrincipal user) {
    authenticationService.logout(user.getId());

    HttpCookie cookie = authenticationService.deleteCookie();

    return ResponseEntity.ok()
                         .header(HttpHeaders.SET_COOKIE, cookie.toString())
                         .header("Location", FRONTEND_URL + "/")
                         .build();
  }
}