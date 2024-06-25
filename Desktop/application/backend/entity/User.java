package com.example.demo.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Table(
        uniqueConstraints = @UniqueConstraint(
                name = "username_constraint",
                columnNames = "username"
        )
)

public class User {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userID;


    @Column(
            nullable = false
    )
    private String username;


    @Column(
            nullable = false
    )
    private String password;

    @Column(
            nullable = false
    )
    private String firstname;

    @Column(
            nullable = false
    )
    private String lastname;

    @Column(
            nullable = true
    )
    private boolean fired;
    @Column(
            nullable = true
    )
    private boolean admin;

}
