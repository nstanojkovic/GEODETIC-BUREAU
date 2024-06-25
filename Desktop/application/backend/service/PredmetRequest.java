package com.example.demo.service;

import com.example.demo.entity.Klijent;
import com.example.demo.entity.Parcela;
import com.example.demo.entity.Predmet;

public class PredmetRequest {
    private Klijent klijent;
    private Parcela parcela;
    private Predmet predmet;

    public Parcela getParcela() {
        return parcela;
    }

    public Klijent getKlijent() {
        return klijent;
    }

    public void setKlijent(Klijent klijent) {
        this.klijent = klijent;
    }

    public void setParcela(Parcela parcela) {
        this.parcela = parcela;
    }

    public Predmet getPredmet() {
        return predmet;
    }

    public void setPredmet(Predmet predmet) {
        this.predmet = predmet;
    }
    // getters and setters
}