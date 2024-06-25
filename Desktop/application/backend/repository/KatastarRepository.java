package com.example.demo.repository;

import com.example.demo.entity.Katastar;

import com.example.demo.entity.Plati;
import com.example.demo.entity.Predmet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface KatastarRepository extends JpaRepository<Katastar,Long> {

    List<Katastar> findByPredmetId(Long predmetId);



}
