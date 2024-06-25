package com.example.demo.controller;

import com.example.demo.entity.Katastar;
import com.example.demo.service.KatastarRequest;
import com.example.demo.service.KatastarService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class KatastarController {

    @Autowired
    private KatastarService katastarService;

    @GetMapping(path = "/katastri")
    public List<Katastar> getAllKatastar() {
        return katastarService.getAllKatastar();
    }

    @PostMapping(path = "/katastar/promenisve")
    public Katastar updateKatastar(@Valid @RequestBody Katastar katastar) throws IOException {
        return katastarService.updateKatastar(katastar);
    }
    @PostMapping(path = "/katastar/promeni")
    public ResponseEntity<?> uploadPdf(@Valid @RequestParam("file") MultipartFile file, @Valid @RequestParam("id") Long id) throws IOException {
        return katastarService.uploadPdf(file, id);
    }

    @GetMapping(path = "/katastar/getpdf/{id}")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable Long id) {
        return katastarService.downloadPdf(id);
    }

    @PostMapping(path = "/katastar/dodaj")
    public Katastar saveKatastar(@Valid @RequestBody Katastar katastar) throws IOException {
        return katastarService.saveKatastar(katastar);
    }

    @PostMapping(path = "/katastar/plati")
    public Katastar payKatastar(@Valid @RequestParam("id") Long id) {
        return katastarService.plati(id);
    }

    @DeleteMapping(path = "/katastar/izbrisi/{id}")
    public String removeKatastar(@Valid @PathVariable("id") Long id) {
        return katastarService.removeKatastar(id);
    }
}
