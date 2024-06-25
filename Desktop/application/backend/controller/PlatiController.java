package com.example.demo.controller;


import com.example.demo.entity.Plati;
import com.example.demo.entity.Trosak;
import com.example.demo.service.GodMesecRequest;
import com.example.demo.service.PlatiService;
import com.example.demo.service.TrosakService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:4200/")

public class PlatiController {

    @Autowired
    private PlatiService platiService;

    @PostMapping("/prihodi/mesecni")
    public List<Plati> getStanjeNakonMeseca(@RequestBody GodMesecRequest request) {
        return platiService.getPrihodiMesecno(request.getGodina(), request.getMesec());
    }

    @PostMapping(path = "/prihod/dodaj")
    public Plati savePlati(@Valid @RequestBody Plati plati){
        return platiService.savePrihod(plati);
    }
}
