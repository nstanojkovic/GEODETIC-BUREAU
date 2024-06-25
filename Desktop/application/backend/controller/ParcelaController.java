package com.example.demo.controller;


import com.example.demo.entity.Parcela;
import com.example.demo.entity.Predmet;
import com.example.demo.service.ParcelaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:4200/")

public class ParcelaController {



    @Autowired
    private ParcelaService parcelaService;



    @GetMapping(path = "/parcele") public List<Parcela>getAllParcele(){
        return parcelaService.getAllParcele();
    }


    @PostMapping(path ="/parcele/promeni")
    public ResponseEntity<?> uploadPdf(@Valid @RequestParam("file") MultipartFile file,@Valid @RequestParam("id") Long id  ) throws IOException {
        return parcelaService.uploadPdf(file,id );
    }

    @PostMapping(path ="/parcele/promenisve")
    public Parcela updateParcela(@Valid @RequestBody Parcela parcela)  {
        return parcelaService.updateParcela(parcela );
    }

    @PostMapping(path ="/parcele/dodaj")
    public Parcela saveParcela( @Valid @RequestBody Parcela parcela) throws  IOException {
         return parcelaService.saveParcela(parcela );
    }
    @GetMapping(path="/parcele/getpdf/{id}")
    public ResponseEntity<byte[]> downloadPdf(@PathVariable Long id) {
       return parcelaService.downloadPdf(id);
    }

    @DeleteMapping (path = "/parcele/izbrisi/{id}")
    public String removeParcela(@Valid @PathVariable("id") Long id){
        return parcelaService.removeParcela(id);
    }

    @GetMapping("/{id}/parcela/predmeti")
    public List<Predmet> getPredmetByParcelaId(@PathVariable Long id) {
        List<Predmet> predmeti = parcelaService.getPredmetiByParcela(id);
        return predmeti;
    }




}
