package net.pinehaus.backend.user.model;

import jakarta.persistence.*;
import lombok.*;
import net.pinehaus.backend.authentication.AuthenticationProvider;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;


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


    @Column(nullable = false)
    private String email;

    @Column
    private Date dateOfBirth;

    @Column
    private String avatarUrl;


    @Column(nullable = false)
    private AuthenticationProvider authenticationProvider;

    /**
     * Unique Google account ID provided by Google. Actual field name is "sub" in the Google ID token.
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