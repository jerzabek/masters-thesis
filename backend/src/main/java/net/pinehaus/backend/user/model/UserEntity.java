package net.pinehaus.backend.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import net.pinehaus.backend.authentication.AuthenticationProvider;
import org.hibernate.annotations.CreationTimestamp;


@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity(name = "user_entity")
public class UserEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(nullable = false)
  private String firstName;


  @Column(nullable = false)
  private String lastName;

  private String username;

  @Column(nullable = false)
  private String email;

  @Column
  private Date dateOfBirth;

  @Column
  private String avatarUrl;


  @Column(nullable = false)
  @JsonIgnore
  private AuthenticationProvider authenticationProvider;

  /**
   * Unique Google account ID provided by Google. Actual field name is "sub" in the Google ID
   * token.
   */
  @Column
  @JsonIgnore
  private String googleId;

  @Column(length = 2048)
  @JsonIgnore
  private String sessionId;

  @Column
  @JsonIgnore
  private Timestamp sessionExpiresAt;

  @CreationTimestamp
  @Column
  private Timestamp createdAt;

}