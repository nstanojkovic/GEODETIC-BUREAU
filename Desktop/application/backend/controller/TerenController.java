package com.example.demo.controller;

import com.example.demo.entity.Teren;
import com.example.demo.service.TerenService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class TerenController {


    @Autowired
    private TerenService terenService;


    @PostMapping(path = "/teren")
    public Teren saveteren(@Valid @RequestBody Teren teren){
        return terenService.saveTeren(teren);
    }


    @GetMapping(path = "/tereni")
    public List<Teren>getAllTereni(){
        return terenService.getAllTereni();
    }
}
