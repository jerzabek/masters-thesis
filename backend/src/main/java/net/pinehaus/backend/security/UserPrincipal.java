package net.pinehaus.backend.security;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import net.pinehaus.backend.user.model.UserEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
@RequiredArgsConstructor
@AllArgsConstructor
public class UserPrincipal implements UserDetails {

  private UUID id;
  private String firstName;
  private String lastName;
  private String email;
  private String avatarUrl;
  private Timestamp sessionExpiresAt;

  private Collection<? extends GrantedAuthority> authorities;

  public UserPrincipal(UserEntity user) {
    List<GrantedAuthority> authorities = AuthorityUtils.createAuthorityList("ADMIN", "USER");

    this.id = user.getId();
    this.firstName = user.getFirstName();
    this.lastName = user.getLastName();
    this.email = user.getEmail();
    this.avatarUrl = user.getAvatarUrl();
    this.authorities = authorities;
    this.sessionExpiresAt = user.getSessionExpiresAt();
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
  }

  @Override
  public String getPassword() {
    return null;
  }

  @Override
  public String getUsername() {
    return null;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}