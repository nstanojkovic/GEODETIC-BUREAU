package com.example.demo.repository;

import com.example.demo.entity.Blagajna;
import com.example.demo.entity.Katastar;

import com.example.demo.entity.Komentar;
import com.example.demo.entity.Plati;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface KomentariRepository extends JpaRepository<Komentar,Long> {


}
