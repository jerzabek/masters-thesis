package net.pinehaus.backend.authentication.service;

import java.sql.Timestamp;
import java.util.Date;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.pinehaus.backend.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpCookie;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthenticationService {

  private final TokenService tokenService;
  public static final String AUTH_COOKIE_NAME = "pinehaus_auth";

  @Value("${app.frontend.cookieDomain}")
  public String COOKIE_DOMAIN;


  public String createNewUserSession(UserEntity user) {
    Date expiryDate = new Date(System.currentTimeMillis() + tokenService.jwtExpirationInMs);

    String sessionId = tokenService.generateTokenForUser(user, expiryDate);

    user.setSessionId(sessionId);
    user.setSessionExpiresAt(new Timestamp(expiryDate.getTime()));

    return sessionId;
  }

  public HttpCookie createSessionCookie(String sessionId) {
    return ResponseCookie.from(AUTH_COOKIE_NAME, sessionId)
                         .httpOnly(true)
                         .domain(COOKIE_DOMAIN)
                         .path("/")
                         .maxAge(tokenService.jwtExpirationInMs * 1000L)
                         .build();
  }

  public boolean isUserSessionValid(UserEntity user) {
    if (user.getSessionId() == null) {
      return false;
    }

    if (user.getSessionId().isEmpty()) {
      return false;
    }

    if (user.getSessionExpiresAt().before(new Timestamp(System.currentTimeMillis()))) {
      return false;
    }

    return tokenService.validateToken(user.getSessionId());
  }


}