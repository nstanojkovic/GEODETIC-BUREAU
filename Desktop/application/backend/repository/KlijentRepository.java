package com.example.demo.repository;

import com.example.demo.entity.Klijent;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository

public interface KlijentRepository extends JpaRepository<Klijent,Long> {
    @Modifying
    @Transactional
    @Query(value = "ALTER TABLE klijent AUTO_INCREMENT = 1", nativeQuery = true)
    void resetAutoIncrement();


    Klijent findKlijentByBrlkAndJmbgAndIme(String brlk,String jmbg,String ime);


    Klijent findKlijentByJmbg(String jmbg);






}
