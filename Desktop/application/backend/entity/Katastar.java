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

public class Katastar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;




    @ManyToOne
    @JoinColumn(
            name = "idpredmet",
            referencedColumnName = "id",
            nullable = true
    )
    private Predmet predmet;

    @Lob
    @Column
    private byte[] podaci;

    @Column
    private Date datum_kat;

    @Column(
            nullable = false
    )
    private String br_predmeta;

    @Column(
            nullable = false
    )
    private double troskovi;

    @Column
    private Date datum_placanja;
}
