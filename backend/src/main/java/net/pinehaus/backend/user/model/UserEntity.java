package net.pinehaus.backend.user.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
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
  @JsonView(UserViews.Public.class)
  private UUID id;

  @Column(nullable = false)
  @JsonView(UserViews.Public.class)
  private String firstName;


  @Column(nullable = false)
  @JsonView(UserViews.Public.class)
  private String lastName;

  @JsonView(UserViews.Public.class)
  private String username;

  @Column(nullable = false)
  @JsonView(UserViews.Public.class)
  private String email;

  @Column
  @JsonView(UserViews.Public.class)
  private Date dateOfBirth;

  @Column
  @JsonView(UserViews.Public.class)
  private String avatarUrl;


  @Column(nullable = false)
  @JsonIgnore
  private AuthenticationProvider authenticationProvider;

  /**
   * Unique Google account ID provided by Google. Actual field name is "sub" in the Google ID
   * token.
   */
  @Column
  private String googleId;

  @Column(length = 2048)
  private String sessionId;

  @Column
  private Timestamp sessionExpiresAt;

  @CreationTimestamp
  @Column
  private Timestamp createdAt;

}