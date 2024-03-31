package net.pinehaus.backend.config;

import io.swagger.annotations.SwaggerDefinition;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
@SwaggerDefinition
public class SwaggerConfiguration {

    private Info apiInfo() {
        return new Info()
                .title("Pinehaus API")
                .description("Pinehaus application API documentation.")
                .version("1.0.0");
    }

    private List<Server> apiServers() {
        List<Server> servers = new ArrayList<>();

        servers.add(new Server().url("http://localhost:8080/api/").description("Local server"));
        servers.add(new Server().url("https://dev.pinehaus.net/api/").description("Staging server"));
        servers.add(new Server().url("https://pinehaus.net/api/").description("Production server"));

        return servers;
    }

    @Bean
    public OpenAPI pinehausOpenAPI() {
        return new OpenAPI()
                .servers(apiServers())
                .info(apiInfo());
    }
}
