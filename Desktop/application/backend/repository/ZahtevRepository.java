package com.example.demo.repository;

import com.example.demo.entity.Trosak;
import com.example.demo.entity.Zahtev;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface ZahtevRepository extends JpaRepository<Zahtev,Long> {

}
