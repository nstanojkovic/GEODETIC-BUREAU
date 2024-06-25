package com.example.demo.repository;

import com.example.demo.entity.Plati;
import com.example.demo.entity.Posao;
import com.example.demo.entity.Predmet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PosaoRepository extends JpaRepository<Posao,Long> {

    Posao findPosaoByNaziv(String naziv);

    @Query("SELECT p FROM Predmet p WHERE p.posao.id = :posaoId")
    List<Predmet> findPredmetiByPosaoId(@Param("posaoId") Long posaoId);

}
