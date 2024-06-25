package com.example.demo.repository;

import com.example.demo.entity.Blagajna;
import com.example.demo.entity.Katastar;

import com.example.demo.entity.Plati;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface BlagajnaRepository extends JpaRepository<Blagajna,Long> {

    List<Blagajna> findByDatumBetween(Date pocetak, Date kraj);



}
