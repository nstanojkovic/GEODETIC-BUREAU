package com.example.demo.controller;


import com.example.demo.entity.Posao;
import com.example.demo.entity.Predmet;
import com.example.demo.service.PosaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:4200/")

public class PosaoController {


    @Autowired
    private PosaoService posaoService;


    @GetMapping(path = "/poslovi") public List<Posao>getAllPoslovi(){
        return posaoService.getAllPoslovi();
    }


    @PostMapping(path = "/poslovi/dodaj")
    public Posao savePosao(@Valid @RequestBody Posao posao){
        return posaoService.savePosao(posao);
    }


    @PostMapping(path = "/poslovi/promeni")
    public Posao updatePosao(@Valid @RequestBody Posao posao){
        return posaoService.updatePosao(posao);
    }


    @DeleteMapping (path = "/poslovi/izbrisi/{id}")
    public String removePosao(@Valid @PathVariable("id") Long id){
        return posaoService.removePosao(id);
    }

    @GetMapping("/{id}/posao/predmeti")
    public List<Predmet> getPredmetiByKlijentId(@PathVariable Long id) {
        List<Predmet> predmeti = posaoService.getPredmetiByPosaoId(id);
        return predmeti;
    }

}
