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

public class Parcela {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    (nullable = true)
    private byte[] ln;


    @Column(name = "br_kat_parcele", nullable = false)
    private String brKatParcele;

    @Column(name = "kat_opstina", nullable = false)
    private String katOpstina;

    @Column(
            nullable = false
    )
    private String opstina;

}
