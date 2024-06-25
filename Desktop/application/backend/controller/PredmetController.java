package com.example.demo.controller;


import com.example.demo.entity.Katastar;
import com.example.demo.entity.Plati;
import com.example.demo.entity.Predmet;
import com.example.demo.service.PlatiService;
import com.example.demo.service.PredmetRequest;
import com.example.demo.service.PredmetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:4200/")

public class PredmetController {





    @Autowired
    private PredmetService predmetService;

    @Autowired
    private PlatiService platiService;


    @PostMapping("/predmeti/dodaj")
    public Predmet dodajPredmet(@RequestBody PredmetRequest request) {

        return predmetService.savePredmet(request) ;
    }


    @PostMapping(path = "/predmeti/promeni")
    public Predmet updatePredmet(@Valid @RequestBody Predmet predmet){
        return predmetService.updatePredmet(predmet);
    }




    @GetMapping(path = "/predmeti") public List<Predmet>getAllPredmeti(){
        return predmetService.getAllPredmeti();
    }

    @DeleteMapping (path = "/predmeti/izbrisi/{id}")
    public String removePredmet(@Valid @PathVariable("id") Long id){
        return predmetService.removePredmet(id);
    }

    @PostMapping (path = "/predmet/zavrsi/{id}")
    public Predmet zavrsiPredmet(@Valid @PathVariable("id") Long id){
        return predmetService.zavrsiPredmet(id);
    }


    @PostMapping(path = "/predmet/plati")
    public String platiPredmet(
            @RequestParam("idPredmeta") Long idPredmeta,
            @RequestParam("iznos") double iznos,
            @RequestParam("napomena") String napomena

    ) {

        return predmetService.platiPredmet(idPredmeta,iznos,napomena);
    }

    @GetMapping("/predmet/placanja/{idPredmet}")
    public List<Plati> getPlacanjaByPredmetId(@PathVariable Long idPredmet) {
        return platiService.findByPredmetId(idPredmet);
    }

    @GetMapping("/predmet/katastar/{idPredmet}")
    public List<Katastar> getKatastarByPredmetId(@PathVariable Long idPredmet) {
        return predmetService.findKatastarByPredmet(idPredmet);
    }



}
