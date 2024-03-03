package net.pinehaus.backend.helloworld;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class HelloWorldController {

    @GetMapping("/hello")
    public Map<String, String> getHelloWorld() {
        Map<String, String> message = new HashMap<>();

        message.put("hello", "world");

        return message;
    }

}
