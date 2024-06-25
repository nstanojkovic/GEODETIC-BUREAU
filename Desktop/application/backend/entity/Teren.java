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

public class Teren {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;




    @OneToOne
    @JoinColumn(
            name = "idpredmet",
            referencedColumnName = "id",
            nullable = true
    )
    private Predmet predmet;

    @Column
    private Date datum;

    @ManyToOne
    @JoinColumn(
            name = "idradnik",
            referencedColumnName = "userID",
            nullable = true
    )
    private User radnik;


}
