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



public class Komentar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(
            nullable = false
    )
    private String ime;


    @Column(
            nullable = false
    )
    private String prezime;

    @Column(
            nullable = false
    )
    private String poruka;

    @Column(
            nullable = false
    )
    private int ocena;

    @Column(nullable = true)
    private Date datum;

}
