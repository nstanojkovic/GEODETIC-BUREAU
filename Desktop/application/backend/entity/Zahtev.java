package com.example.demo.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

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

public class Zahtev {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


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

    @Column(nullable = true)
    private Date datum;

}
