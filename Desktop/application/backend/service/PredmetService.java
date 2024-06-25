package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.repository.*;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PredmetService {


    @Autowired
    private PredmetRepository predmetRepository;

    @Autowired
    private PosaoRepository posaoRepository;

    @Autowired
    private KlijentRepository klijentRepository;

    @Autowired
    private ParcelaRepository parcelaRepository;


    @Autowired
    private KatastarRepository katastarRepository;


    @Autowired
    private PlatiRepository platiRepository;
    @Autowired
    private PlatiService platiService;

    public List<Predmet> getAllPredmeti() {

        return predmetRepository.findAll();
    }

    public String removePredmet(Long id){
        predmetRepository.deleteById(id);


        return "Uspesno obrisan predmet";

    }

    public Predmet savePredmet(PredmetRequest request){


        Klijent klijent = klijentRepository.findKlijentByJmbg(
                request.getKlijent().getJmbg());
        if (klijent == null) {
            klijent = klijentRepository.save(request.getKlijent());
        }

        Parcela parcela = parcelaRepository.findParcelaByBrKatParceleAndKatOpstina(
                request.getParcela().getBrKatParcele(),request.getParcela().getKatOpstina()
        );
        if (parcela == null) {
            parcela = parcelaRepository.save(request.getParcela());
        }


        Predmet predmet = request.getPredmet();

        predmet.setDatum(Date.valueOf(LocalDate.now()));
        predmet.setKlijent(klijent);
        predmet.setParcela(parcela);
        predmet.setZavrsen(false);

        predmet.setDug(predmet.getCena());

        return predmetRepository.save(predmet);
    }

    public Predmet updatePredmet(Predmet predmet) {

        Predmet predmetB=predmetRepository.findById(predmet.getId()).get();//predmet baza

        if(predmet.getKlijent()!=null){
            predmetB.setKlijent(predmet.getKlijent());
        }
        if(predmet.getParcela()!=null){
            predmetB.setParcela(predmet.getParcela());
        }
        if(predmet.getPosao()!=null){
            predmetB.setPosao(predmet.getPosao());
        }

        if(predmet.getCena()!=0){
            predmetB.setCena(predmet.getCena());
        }

        return predmetRepository.save(predmetB);
    }

    public Predmet zavrsiPredmet(Long id) {

        Predmet p=predmetRepository.findById(id).get();

        p.setZavrsen(true);

        return predmetRepository.save(p);

    }


    public String platiPredmet(Long idPredmeta, double iznos,String napomena) {
          Plati plati=  platiService.savePlati(idPredmeta,iznos,napomena);
          if(plati!=null){
                  Predmet predmet=predmetRepository.findById(idPredmeta).get();

                  double dug=predmet.getDug();
                  dug-=iznos;
                  if(dug<0)dug=0;

                  predmet.setDug(dug);

                  predmetRepository.save(predmet);

                  return "Uspesno placanje";
              }

          return "Zao nam je ne mozete da platite";


    }


    public List<Katastar> findKatastarByPredmet(Long id){
        return katastarRepository.findByPredmetId(id);
    }
}
