package com.example.demo.controller;

import com.example.demo.entity.Blagajna;
import com.example.demo.entity.Plati;
import com.example.demo.entity.Trosak;
import com.example.demo.service.GodMesecRequest;
import com.example.demo.service.BlagajnaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class BlagajnaController {

    @Autowired
    private BlagajnaService blagajnaService;

    @GetMapping("/blagajna")
    public List<Blagajna> getAllBlagajnaEntries() {
        return blagajnaService.getAllBlagajnaEntries();
    }



    @PostMapping("/blagajna/stanje")
    public List<Double> getStanjeNakonMeseca(@RequestBody GodMesecRequest request) {
        return blagajnaService.getStanjeMesecno(request.getGodina(), request.getMesec());
    }



}
