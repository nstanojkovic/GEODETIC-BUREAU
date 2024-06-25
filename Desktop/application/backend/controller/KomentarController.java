package com.example.demo.controller;


import com.example.demo.entity.*;
import com.example.demo.service.KomentarService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:4200/")

public class KomentarController {

    @Autowired
    private KomentarService komentarService;


   /* @PostMapping(path = "/komentari/dodaj")
    public Klijent saveKlijent(@Valid @RequestBody Klijent klijent){
        return klijentService.saveKlijent(klijent);
    }
    */

    @GetMapping(path = "/komentari") public List<Komentar>getAllKomentari(){
        return komentarService.getAllKomentari();

    }

    @PostMapping(path = "/komentar")
    public Komentar saveKomentar(@Valid @RequestBody Komentar komentar){
        return komentarService.saveKomentar(komentar);
    }

    @DeleteMapping(path = "/komentar/izbrisi/{id}")
    public ResponseEntity<String> removeKomentar(@Valid @PathVariable("id") Long id) {
        boolean isRemoved = komentarService.removeKomentar(id);

        if (isRemoved) {
            return ResponseEntity.ok("Uspesno obrisan komentar");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Komentar nije pronađen");
        }
    }



}
