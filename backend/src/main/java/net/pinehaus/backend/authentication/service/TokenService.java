package net.pinehaus.backend.authentication.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import java.util.Date;
import javax.crypto.SecretKey;
import lombok.extern.slf4j.Slf4j;
import net.pinehaus.backend.user.model.UserEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class TokenService {

  public final int jwtExpirationInMs;
  private final SecretKey secretSigningKey;

  private TokenService(@Value("${app.jwtSecret}") String jwtSecret,
      @Value("${app.jwtExpirationInMs}") int jwtExpirationInMs) {
    this.jwtExpirationInMs = jwtExpirationInMs;
    this.secretSigningKey = Keys.hmacShaKeyFor(jwtSecret.getBytes());
  }

  public String generateTokenForUser(UserEntity user, Date expiryDate) {

    return Jwts.builder()
               .subject(user.getId().toString())
               .claim("email", user.getEmail())
               .issuedAt(new Date())
               .expiration(expiryDate)
               .signWith(secretSigningKey)
               .compact();
  }

  public String getUserIdFromJWT(String token) {
    Claims claims = Jwts.parser()
                        .verifyWith(secretSigningKey)
                        .build()
                        .parseSignedClaims(token)
                        .getPayload();

    return claims.getSubject();
  }

  public boolean validateToken(String authToken) {
    try {
      Jwts.parser().verifyWith(secretSigningKey).build().parseSignedClaims(authToken);

      return true;
    } catch (MalformedJwtException ex) {
      log.error("Invalid JWT token");
    } catch (ExpiredJwtException ex) {
      log.error("Expired JWT token");
    } catch (UnsupportedJwtException ex) {
      log.error("Unsupported JWT token");
    } catch (IllegalArgumentException ex) {
      log.error("JWT claims string is empty.");
    }

    return false;
  }

}