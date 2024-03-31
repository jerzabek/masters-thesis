package net.pinehaus.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import javax.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.pinehaus.backend.authentication.service.AuthenticationService;
import net.pinehaus.backend.authentication.service.TokenService;
import net.pinehaus.backend.user.service.UserDetailService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@RequiredArgsConstructor
@Component
@Slf4j(topic = "PinehausAuthenticationFilter")
public class PinehausAuthenticationFilter extends OncePerRequestFilter {


  private final UserDetailService customUserDetailsService;
  private final TokenService tokenService;


  private String getCookieFromRequest(HttpServletRequest request) {
    if (request.getCookies() == null) {
      return null;
    }

    Cookie authCookie = null;

    for (Cookie cookie : request.getCookies()) {
      if (cookie.getName().equals(AuthenticationService.AUTH_COOKIE_NAME)) {
        authCookie = cookie;
        break;
      }
    }

    if (authCookie == null) {
      return null;
    }

    return authCookie.getValue();
  }

  @Override
  protected void doFilterInternal(@Nullable HttpServletRequest request,
      @Nullable HttpServletResponse response, @Nullable FilterChain filterChain)
      throws ServletException, IOException {
    if (request == null || response == null || filterChain == null) {
      return;
    }

    try {
      String jwt = getCookieFromRequest(request);

      if (StringUtils.hasText(jwt) && tokenService.validateToken(jwt)) {
        String userId = tokenService.getUserIdFromJWT(jwt);

        UserPrincipal userDetails = customUserDetailsService.loadUserByUsername(userId);

        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
            userDetails, null, userDetails.getAuthorities());

        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
      }
    } catch (Exception ex) {
      logger.error("Could not set user authentication in security context", ex);
    }

    filterChain.doFilter(request, response);
  }
}