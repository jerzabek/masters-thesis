package net.pinehaus.backend.user.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@Entity(name = "user_entity")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column
    private String firstName;


    @Column
    private String lastName;


    @Column
    private String email;

    @Column
    private Date dateOfBirth;

    @CreationTimestamp
    @Column
    private Timestamp createdAt;

}
