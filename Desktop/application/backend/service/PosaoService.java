package com.example.demo.service;

import com.example.demo.entity.Klijent;
import com.example.demo.entity.Posao;
import com.example.demo.entity.Predmet;
import com.example.demo.repository.PosaoRepository;
import com.example.demo.repository.PredmetRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Transactional
@Service
public class PosaoService {

    @Autowired
    private PosaoRepository posaoRepository;

    public List<Posao> getAllPoslovi(){


        return posaoRepository.findAll();
    }


    public Posao savePosao(Posao p){

        Posao pp=posaoRepository.findPosaoByNaziv(p.getNaziv());

        if(pp!=null){
            return pp;
        }
        return  posaoRepository.save(p);


    }

    public String removePosao(Long id){
        posaoRepository.deleteById(id);

        return "Uspesno obrisan posao";

    }

    public Posao updatePosao(Posao posao) {
        Posao posaoB=posaoRepository.findById(posao.getId()).get();

        if(!posao.getNaziv().equals("")){
            posaoB.setNaziv(posao.getNaziv());
        }

        return posaoRepository.save(posaoB);
    }

    public List<Predmet> getPredmetiByPosaoId(Long id) {


        return posaoRepository.findPredmetiByPosaoId(id);

    }
}
