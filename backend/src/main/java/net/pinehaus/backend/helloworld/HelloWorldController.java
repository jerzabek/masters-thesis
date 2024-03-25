package net.pinehaus.backend.helloworld;

import java.util.HashMap;
import java.util.Map;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/hello")
public class HelloWorldController {


  @GetMapping("/")
  public Map<String, String> getHelloWorld() {
    Map<String, String> message = new HashMap<>();

    message.put("hello", "world!");

    return message;
  }

  @GetMapping("/admin")
  @PreAuthorize("hasAuthority('ADMIN')")
  public Map<String, String> getHelloAdmin() {
    Map<String, String> message = new HashMap<>();

    message.put("hello", "admin");

    return message;
  }

  @GetMapping("/user")
  @PreAuthorize("hasAuthority('USER')")
  public Map<String, String> getHelloUser() {
    Map<String, String> message = new HashMap<>();

    message.put("hello", "user");

    return message;
  }

}