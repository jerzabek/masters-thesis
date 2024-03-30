package net.pinehaus.backend.authentication.google.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class GoogleLoginDTO {

    private String credential;

}
