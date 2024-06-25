package com.example.demo.service;

import com.example.demo.entity.Klijent;
import com.example.demo.entity.Plati;
import com.example.demo.entity.Predmet;
import com.example.demo.repository.KlijentRepository;
import com.example.demo.repository.PlatiRepository;
import com.example.demo.repository.PredmetRepository;


import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Transactional
@Service
public class KlijentService {


    @Autowired
    private KlijentRepository klijentRepository;

    @Autowired
    private PredmetRepository predmetRepository;

    @Autowired
    private PlatiRepository platiRepository;


    public String reorderIdsAndResetAutoIncrement(){
        List<Klijent> klijenti = klijentRepository.findAll(Sort.by(Sort.Direction.ASC, "id"));
        klijentRepository.deleteAll();
        klijentRepository.saveAll(klijenti);

        return "ID-ovi su uspešno preuređeni i AUTO_INCREMENT je resetovan.";
    }

    //nista ovde mozemo da napravimo saveUser
    //mozemo da naopravimo getUserByUsernameAndPassword


    public Klijent saveKlijent(Klijent k){

        Klijent kk=klijentRepository.findKlijentByBrlkAndJmbgAndIme(k.getBrlk(),k.getJmbg(),k.getIme());

        if(kk!=null){
            return kk;
        }
        return klijentRepository.save(k);
    }

    public List<Klijent>getAllKlijenti(){


        return klijentRepository.findAll();
    }



    public String removeKlijent(Long id) {
        if (predmetRepository.existsByKlijentId(id)) {
            return "Nemoguće brisanje klijenta jer već postoji u predmetu";
        }

        klijentRepository.deleteById(id);
        return "Uspešno obrisan klijent";
    }



    public Klijent updateKlijent(Klijent klijent) {
        Klijent klijentB=klijentRepository.findById(klijent.getId()).get();//klijent baza

        if(!klijent.getIme().equals("")){
            klijentB.setIme(klijent.getIme());
        }
        if(!klijent.getPrezime().equals("")){
            klijentB.setPrezime(klijent.getPrezime());
        }
        if(!klijent.getImeOca().equals("")){
            klijentB.setImeOca(klijent.getImeOca());
        }



        if(!klijent.getPribivaliste().equals("")){
            klijentB.setPribivaliste(klijent.getPribivaliste());
        }

        if(!klijent.getTelefon().equals("")){
            klijentB.setTelefon(klijent.getTelefon());
        }
        if(!klijent.getJmbg().equals("") && klijent.getJmbg().length()==13){
            klijentB.setJmbg(klijent.getJmbg());
        }
        if(!klijent.getBrlk().equals("") ){
            klijentB.setBrlk(klijent.getBrlk());
        }


        return klijentRepository.save(klijentB);
    }

    public List<Predmet> getPredmetiByKlijentId(Long klijentId) {
        return predmetRepository.findByKlijentId(klijentId);
    }

    public List<Plati> getPlacanjaKlijentById(Long id) {

      /*  List<Plati>lista=new ArrayList<>();

        List<Predmet> predmeti=predmetRepository.findByKlijentId(id);

        for(Predmet p:predmeti){
            List<Plati> placanja = platiRepository.findByPredmetId(p.getId());
            lista.addAll(placanja);

        }

        return lista;*/

        return platiRepository.findPlaceniKlijenti(id);

    }

    public Map<Long, List<Plati>> getPlacanjaGrupisanoPoKlijentu() {
        List<Plati> svaPlacanja = platiRepository.findAll();

        Map<Long, List<Plati>> placanjaGrupisanaPoKlijentu = new HashMap<>();

        for (Plati placanje : svaPlacanja) {
            Long klijentId = placanje.getPredmet().getKlijent().getId();
            if (!placanjaGrupisanaPoKlijentu.containsKey(klijentId)) {
                placanjaGrupisanaPoKlijentu.put(klijentId, new ArrayList<>());
                System.out.println(klijentId);
            }
            placanjaGrupisanaPoKlijentu.get(klijentId).add(placanje);
        }

        return placanjaGrupisanaPoKlijentu;
    }
}