package com.example.demo.repository;

import com.example.demo.entity.Parcela;
import com.example.demo.entity.Plati;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface ParcelaRepository extends JpaRepository<Parcela,Long> {

    Parcela findParcelaByBrKatParceleAndKatOpstina(String brKatParcele, String katOpstina);









}
