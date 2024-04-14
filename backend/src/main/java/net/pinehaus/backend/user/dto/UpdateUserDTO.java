package net.pinehaus.backend.user.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class UpdateUserDTO {

  private String firstName;
  private String lastName;
  private String avatarUrl;
  private String username;

}