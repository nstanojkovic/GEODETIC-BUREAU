package com.example.demo.repository;

import com.example.demo.entity.Katastar;
import com.example.demo.entity.Parcela;
import com.example.demo.entity.Predmet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface PredmetRepository extends JpaRepository<Predmet,Long> {

    boolean existsByKlijentId(Long klijentId);

    List<Predmet> findByKlijentId(Long klijentId);

    List<Predmet> findByParcelaId(Long parcelaId);
    List<Predmet> findByPosaoId(Long parcelaId);



    @Query("SELECT DISTINCT k " +
            "FROM Katastar k " +
            "JOIN k.predmet pr " +
            "WHERE k.predmet.id = ?1")
    Katastar findKatastarByPredmet(Long id);







}
