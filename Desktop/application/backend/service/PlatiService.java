package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.repository.PlatiRepository;
import com.example.demo.repository.PosaoRepository;
import com.example.demo.repository.PredmetRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;

@Transactional
@Service
public class PlatiService {

    @Autowired
    private PlatiRepository platiRepository;
    @Autowired
    private PredmetRepository predmetRepository;

    public Plati savePlati(Long idPredmeta, double iznos,String napomena) {
        Predmet predmet = predmetRepository.findById(idPredmeta).get();

        Plati plati = new Plati();
        plati.setDatum(Date.valueOf(LocalDate.now()));
        plati.setPredmet(predmet);
        plati.setIznos(iznos);
        if(napomena!=null)
        plati.setNapomena(napomena);


        return platiRepository.save(plati);
    }

    public Plati savePrihod( Plati plati) {


        plati.setDatum(Date.valueOf(LocalDate.now()));
        plati.setPredmet(null);

        return platiRepository.save(plati);
    }


    public List<Plati> findByPredmetId(Long idPredmet) {

        return platiRepository.findByPredmetId(idPredmet);
    }

    public List<Plati> getPrihodiMesecno(int godina, int mesec) {
        YearMonth mesecIGodina = YearMonth.of(godina, mesec);
        LocalDate prviDanMeseca = mesecIGodina.atDay(1);
        LocalDate poslednjiDanMeseca = mesecIGodina.atEndOfMonth();
        Date prviDan = Date.valueOf(prviDanMeseca);
        Date poslednjiDan = Date.valueOf(poslednjiDanMeseca);
        return platiRepository.findByDatumBetween(prviDan, poslednjiDan);
    }
}
