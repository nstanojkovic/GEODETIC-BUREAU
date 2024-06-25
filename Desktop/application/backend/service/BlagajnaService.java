package com.example.demo.service;

import com.example.demo.entity.Blagajna;
import com.example.demo.repository.BlagajnaRepository;
import com.example.demo.repository.PlatiRepository;
import com.example.demo.repository.TrosakRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;


@Transactional
@Service
public class BlagajnaService {


    @Autowired
    private BlagajnaRepository blagajnaRepository;

    @Autowired
    private PlatiRepository platiRepository;

    @Autowired
    private TrosakRepository trosakRepository;

    public List<Blagajna> getAllBlagajnaEntries() {
        return blagajnaRepository.findAll();
    }


    public List<Double> getStanjeMesecno(int godina, int mesec) {
        YearMonth mesecIGodina = YearMonth.of(godina, mesec);
        LocalDate prviDanMeseca = mesecIGodina.atDay(1);
        LocalDate poslednjiDanMeseca = mesecIGodina.atEndOfMonth();
        Date prviDan = Date.valueOf(prviDanMeseca);
        Date poslednjiDan = Date.valueOf(poslednjiDanMeseca);

        List<Double>lista=new ArrayList<>();
        lista.add(platiRepository.sumaIznosaOdDatumaDoDatume(prviDan,poslednjiDan));//prihod

        lista.add(trosakRepository.sumaIznosaOdDatumaDoDatume(prviDan,poslednjiDan));//trosak

        return lista;
    }
}
