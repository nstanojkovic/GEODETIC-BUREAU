package com.example.demo.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;
import java.util.Optional;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Predmet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;



    @ManyToOne
    @JoinColumn(
            name = "idparcela",
            referencedColumnName = "id"
    )
    private Parcela parcela;

    @ManyToOne
    @JoinColumn(
            name = "idklijent",
            referencedColumnName = "id"
    )
    private Klijent klijent;


    @ManyToOne
    @JoinColumn(
            name = "idposao",
            referencedColumnName = "id"
    )
    private Posao posao;


    @Column
    private Date datum;

    @Column(nullable = false)
    private double cena;

    @Column(nullable = false)
    private double dug;


    @Column
    private boolean zavrsen;




}
