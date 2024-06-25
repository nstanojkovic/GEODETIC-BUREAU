package com.example.demo.repository;

import com.example.demo.entity.Klijent;
import com.example.demo.entity.Plati;
import com.example.demo.entity.Posao;
import com.example.demo.entity.Trosak;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository

public interface PlatiRepository extends JpaRepository<Plati,Long> {

    List<Plati> findByPredmetId(Long id);


    @Query("SELECT DISTINCT pl " +
            "FROM Plati pl " +
            "JOIN pl.predmet pr " +
            "JOIN pr.klijent k " +
            "WHERE k.id = ?1")

    List<Plati> findPlaceniKlijenti( Long id);

    List<Plati> findByDatumBetween(Date pocetak, Date kraj);

    @Query("SELECT SUM(p.iznos) FROM Plati p WHERE p.datum BETWEEN :pocetak AND :kraj")
    Double sumaIznosaOdDatumaDoDatume(@Param("pocetak") Date pocetak, @Param("kraj") Date kraj);




}