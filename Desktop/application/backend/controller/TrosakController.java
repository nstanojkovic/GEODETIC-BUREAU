package com.example.demo.controller;


import com.example.demo.entity.Trosak;
import com.example.demo.service.GodMesecRequest;
import com.example.demo.service.TrosakService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:4200/")

public class TrosakController {

    @Autowired
    private TrosakService trosakService;

    @PostMapping(path = "/trosak/dodaj")
    public Trosak saveTrosak(@Valid @RequestBody Trosak trosak){
        return trosakService.saveTrosak(trosak);
    }


    @PostMapping("/troskovi/mesecni")
    public List<Trosak> getStanjeNakonMeseca(@RequestBody GodMesecRequest request) {
        return trosakService.getTroskoviMesecno(request.getGodina(), request.getMesec());
    }


}
