package com.example.demo.service;

import com.example.demo.entity.Teren;


import com.example.demo.repository.TerenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class TerenService {

    @Autowired
    private TerenRepository terenRepository;




    public List<Teren>getAllTereni(){
        return terenRepository.findAll();
    }
    public Teren saveTeren(Teren teren){

        teren.setDatum(Date.valueOf(LocalDate.now()));

        return terenRepository.save(teren);
    }

}
