package com.example.demo.repository;

import com.example.demo.entity.Teren;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface TerenRepository extends JpaRepository<Teren,Long> {
}
