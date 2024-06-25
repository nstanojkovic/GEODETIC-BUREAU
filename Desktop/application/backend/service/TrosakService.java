package com.example.demo.service;

import com.example.demo.entity.Trosak;


import com.example.demo.repository.TrosakRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Service
public class TrosakService {

    @Autowired
    private TrosakRepository trosakRepository;
    public Trosak saveTrosak(Trosak trosak) {

        trosak.setDatum(Date.valueOf(LocalDate.now()));

        return trosakRepository.save(trosak);
    }


    public List<Trosak> getTroskoviMesecno(int godina, int mesec) {
        YearMonth mesecIGodina = YearMonth.of(godina, mesec);
        LocalDate prviDanMeseca = mesecIGodina.atDay(1);
        LocalDate poslednjiDanMeseca = mesecIGodina.atEndOfMonth();
        Date prviDan = Date.valueOf(prviDanMeseca);
        Date poslednjiDan = Date.valueOf(poslednjiDanMeseca);
        return trosakRepository.findByDatumBetween(prviDan, poslednjiDan);
    }
}
