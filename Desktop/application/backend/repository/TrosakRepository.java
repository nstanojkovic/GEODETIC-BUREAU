package com.example.demo.repository;

import com.example.demo.entity.Blagajna;
import com.example.demo.entity.Katastar;

import com.example.demo.entity.Plati;
import com.example.demo.entity.Trosak;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface TrosakRepository extends JpaRepository<Trosak,Long> {


    List<Trosak> findByDatumBetween(Date pocetak, Date kraj);


    @Query("SELECT SUM(t.iznos) FROM Trosak t WHERE t.datum BETWEEN :pocetak AND :kraj")
    Double sumaIznosaOdDatumaDoDatume(@Param("pocetak") Date pocetak, @Param("kraj") Date kraj);


}
