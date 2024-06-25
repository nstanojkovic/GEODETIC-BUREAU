package com.example.demo.service;

import com.example.demo.entity.Zahtev;
import com.example.demo.repository.UserRepository;


import com.example.demo.repository.ZahtevRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service

public class ZahtevService {

    @Autowired
    private ZahtevRepository zahtevRepository;

    @Autowired
    private UserRepository radnikRepository;


    public Zahtev saveZahtev(Zahtev zahtev) {


        zahtev.setDatum(Date.valueOf(LocalDate.now()));


        return zahtevRepository.save(zahtev);
    }


    public List<Zahtev> getAllZahtevi() {

        return zahtevRepository.findAll();
    }

    public String removeZahtev(Long id) {

        zahtevRepository.deleteById(id);
        return "uspesno obrisan zahtev";
    }
}
