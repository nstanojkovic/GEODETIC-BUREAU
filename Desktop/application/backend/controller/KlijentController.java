package com.example.demo.controller;


import com.example.demo.entity.Klijent;
import com.example.demo.entity.Plati;
import com.example.demo.entity.Predmet;
import com.example.demo.service.KlijentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins="http://localhost:4200/")

public class KlijentController {



    @Autowired
    private KlijentService klijentService;


    @PostMapping(path = "/klijenti/dodaj")
    public Klijent saveKlijent(@Valid @RequestBody Klijent klijent){
        return klijentService.saveKlijent(klijent);
    }


    @PostMapping(path = "/klijenti/promeni")
    public Klijent updateKlijent(@Valid @RequestBody Klijent klijent){
        return klijentService.updateKlijent(klijent);
    }


    @GetMapping(path = "/klijenti") public List<Klijent>getAllKlijenti(){
        return klijentService.getAllKlijenti();
    }

    @DeleteMapping (path = "/klijenti/izbrisi/{id}")
    public String removeKlijent(@Valid @PathVariable("id") Long id){
        return klijentService.removeKlijent(id);
    }

    @GetMapping("/{id}/klijent/predmeti")
    public List<Predmet> getPredmetiByKlijentId(@PathVariable Long id) {
        List<Predmet> predmeti = klijentService.getPredmetiByKlijentId(id);
        return predmeti;
    }




    @GetMapping("/{id}/klijent/placanja")
    public List<Plati> getPlacanjaKlijentById(@PathVariable("id") Long id) {
        List<Plati> placanja = klijentService.getPlacanjaKlijentById(id);
        return placanja;
    }

    @GetMapping("/klijenti/svaplacanja")
    public Map<Long, List<Plati>> getPlacanjaForAllKlijent() {
        return klijentService.getPlacanjaGrupisanoPoKlijentu();

    }



}
