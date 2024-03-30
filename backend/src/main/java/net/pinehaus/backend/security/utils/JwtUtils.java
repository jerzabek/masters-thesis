package net.pinehaus.backend.security.utils;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import lombok.RequiredArgsConstructor;
import net.pinehaus.backend.authentication.google.service.GoogleAuthenticationService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.oauth2.jwt.JwtException;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
public class JwtUtils {

    private GoogleAuthenticationService googleAuthenticationService;

//    public String createToken(Account account, boolean rememberMe) {
//        long now = (new Date()).getTime();
//        Date validity = rememberMe ? new Date(now + TOKEN_VALIDITY_REMEMBER) : new Date(now + TOKEN_VALIDITY);
//        Map<String, Object> claims = new HashMap<>();
//        claims.put("role", account.getRoles());
//
//        return Jwts.builder()
//                .setSubject(account.getId().toString())
//                .setIssuedAt(new Date())
//                .setExpiration(validity)
//                .addClaims(claims)
//                .signWith(key, SignatureAlgorithm.HS512)
//                .compact();
//    }

    public Authentication verifyAndGetAuthentication(String token) {
        try {
            Optional<GoogleIdToken> optionalGoogleIdToken = googleAuthenticationService.verifyToken(token);

            if (optionalGoogleIdToken.isEmpty()) {
                return null;
            }

            GoogleIdToken googleIdToken = optionalGoogleIdToken.get();
            GoogleIdToken.Payload payload = googleIdToken.getPayload();

            List<GrantedAuthority> authorities = AuthorityUtils.commaSeparatedStringToAuthorityList("ROLE_USER");

            return new UsernamePasswordAuthenticationToken(payload.getSubject(), token, authorities);
        } catch (JwtException | IllegalArgumentException ignored) {
            return null;
        }
    }

}