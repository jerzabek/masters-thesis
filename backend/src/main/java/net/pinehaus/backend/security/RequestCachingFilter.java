package net.pinehaus.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

@Order(value = Ordered.HIGHEST_PRECEDENCE)
@Component
@Slf4j
@WebFilter(filterName = "RequestCachingFilter", urlPatterns = "/*")
public class RequestCachingFilter extends OncePerRequestFilter {

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
      FilterChain filterChain) throws ServletException, IOException {

//    log.info("REQUEST FROM: " + request.getRemoteAddr());
//    log.info("REQUEST URI: " + request.getRequestURI());
//    log.info("REQUEST METHOD: " + request.getMethod());
//    log.info("REQUEST HEADERS: " + request.getHeaderNames());
//    log.info("REQUEST PARAMETERS: " + request.getParameterMap());
//    log.info("REQUEST BODY: " + request.getReader()
//                                       .lines()
//                                       .reduce("", (accumulator, actual) -> accumulator + actual));

    filterChain.doFilter(request, response);
  }
}