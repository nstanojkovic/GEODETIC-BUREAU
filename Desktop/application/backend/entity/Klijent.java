package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

@Table(
        uniqueConstraints = @UniqueConstraint(
                name = "username_constraint",
                columnNames = "jmbg"
        )
)

public class Klijent {

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
    private String imeOca;

    @Column(
            nullable = false
    )
    private String jmbg;


    @Column(
            nullable = false
    )
    private String telefon;

    @Column(
            nullable = false
    )
    private String pribivaliste;

    @Column(
            nullable = false
    )
    private String brlk;

    @OneToMany(mappedBy = "klijent")
    @Transient
    @JsonIgnore
    List<Predmet> predmetList;

    public void addPredmet(Predmet predmet){
        if(predmetList == null) predmetList = new ArrayList<>();
        predmetList.add(predmet);
        predmet.setKlijent(this);
    }
    public void removePredmet(Predmet predmet){
        if(predmetList != null){
            predmetList.remove(predmet);
            predmet.setKlijent(null);
        }
    }

   
}
