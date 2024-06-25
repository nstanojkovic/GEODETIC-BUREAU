package com.example.demo.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Blob;
import java.sql.Date;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder




public class Plati {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private Date datum;


    @ManyToOne
    @JoinColumn(
            name = "idpredmet",
            referencedColumnName = "id"
    )
    private Predmet predmet;

    @Column(nullable = false)
    private double iznos;

    @Column
    private String napomena;



}
