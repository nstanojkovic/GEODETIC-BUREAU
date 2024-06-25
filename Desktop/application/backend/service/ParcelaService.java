package com.example.demo.service;

import com.example.demo.entity.Parcela;
import com.example.demo.entity.Predmet;
import com.example.demo.repository.ParcelaRepository;
import com.example.demo.repository.PredmetRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

@Transactional
@Service
public class ParcelaService {


    public static MultipartFile fajl;

    @Autowired
    private ParcelaRepository parcelaRepository;



    @Autowired
    private PredmetRepository predmetRepository;






    public List<Parcela> getAllParcele(){

        List<Parcela>lista=parcelaRepository.findAll();

        for(Parcela parcela:lista){
            if (parcela != null) {
                 parcela.setLn(ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).body(parcela.getLn()).getBody());
            } else {

            }
        }
        return lista;
    }


    public ResponseEntity<?> uploadPdf(MultipartFile file, Long id) throws IOException {

        if(id==-10){
            fajl=file;
            System.out.println(55555);
            return ResponseEntity.ok().build();

        }
        else {
            Parcela parcela = parcelaRepository.findById(id).get();

            if (parcela == null) {
                return ResponseEntity.notFound().build();
            }

            parcela.setLn(file.getBytes());

            parcelaRepository.save(parcela);
            return ResponseEntity.ok().build();
        }
    }

    public ResponseEntity<byte[]> downloadPdf(Long id) {

        Parcela parcela = parcelaRepository.findById(id).orElse(null);
        if (parcela != null) {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).body(parcela.getLn());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public Parcela updateParcela(Parcela parcela) {
        Parcela parcelaB=parcelaRepository.findById(parcela.getId()).get();//klijent baza

        if(!parcela.getBrKatParcele().equals("")){
            parcelaB.setBrKatParcele(parcela.getBrKatParcele());
        }
        if(!parcela.getKatOpstina().equals("")){
            parcelaB.setKatOpstina(parcela.getKatOpstina());
        }
        if(!parcela.getOpstina().equals("")){
            parcelaB.setOpstina(parcela.getOpstina());
        }

        if(parcela.getLn()!=null){
            parcelaB.setLn(parcela.getLn());
        }


        return parcelaRepository.save(parcelaB);
    }

    public Parcela saveParcela(  Parcela parcela) throws IOException {

        if(parcelaRepository.findParcelaByBrKatParceleAndKatOpstina(parcela.getBrKatParcele(),parcela.getKatOpstina())!=null){
            return null;
        }


       return parcelaRepository.save(parcela);

    }

    public String removeParcela(Long id){
        parcelaRepository.deleteById(id);


        return "Uspesno obrisana parcela";

    }

    public List<Predmet> getPredmetiByParcela(Long parcelaId) {
        return predmetRepository.findByParcelaId(parcelaId);
    }



}
