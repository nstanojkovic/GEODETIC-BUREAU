package com.example.demo.controller;


import com.example.demo.entity.Zahtev;
import com.example.demo.service.ZahtevService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:4200/")
public class ZahtevControlller {

    @Autowired
    private ZahtevService zahtevService;

    @GetMapping(path = "/zahtevi")
    public List<Zahtev>getAllZahtevi(){
        return zahtevService.getAllZahtevi();
    }





    @PostMapping(path = "/zahtev/dodaj")
    public Zahtev saveZahtev(@Valid @RequestBody Zahtev zahtev){
        return zahtevService.saveZahtev(zahtev);
    }

    @DeleteMapping(path = "/zahtev/izbrisi/{id}")
    public String removeZahtev(@Valid @PathVariable("id") Long id) {
        return zahtevService.removeZahtev(id);
    }

}
