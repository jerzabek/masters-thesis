package net.pinehaus.backend.security;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
@RequiredArgsConstructor
@Slf4j(topic = "Security config")
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

  public final PinehausAuthenticationFilter pinehausAuthenticationFilter;

  @Value("${app.frontend.url}")
  public String FRONTEND_URL;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http
        .csrf(AbstractHttpConfigurer::disable)
        .cors(cors -> cors.configurationSource(request -> {
          CorsConfiguration config = new CorsConfiguration();

          config.setAllowCredentials(true);
          config.addAllowedOrigin(FRONTEND_URL);
          config.addAllowedOrigin("null");
          config.addAllowedHeader("*");
          config.addAllowedMethod("*");

          return config;
        }))
        .sessionManagement(sessionManagement -> sessionManagement
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(authorizeRequests -> authorizeRequests
            .requestMatchers("/swagger-ui/**", "/v3/**").permitAll()
            .requestMatchers("/login/**").permitAll()
            .anyRequest().permitAll()
        )
        .addFilterBefore(pinehausAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

}