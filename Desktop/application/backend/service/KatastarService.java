package com.example.demo.service;

import com.example.demo.entity.Katastar;
import com.example.demo.entity.Trosak;
import com.example.demo.repository.KatastarRepository;
import com.example.demo.repository.TrosakRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Transactional
@Service
public class KatastarService {

    @Autowired
    private KatastarRepository katastarRepository;

    @Autowired
    private TrosakRepository trosakRepository;

    // Dohvati sve vezano za katastar
    public List<Katastar> getAllKatastar() {
        return katastarRepository.findAll();
    }

    public Katastar updateKatastar(Katastar katastar) throws IOException {


        Katastar katastarB = katastarRepository.findById(katastar.getId()).orElse(null);

        if (katastarB != null) {
            if (!katastar.getBr_predmeta().isEmpty()) {
                katastarB.setBr_predmeta(katastar.getBr_predmeta());
            }
            if (katastar.getTroskovi() >= 0) {
                katastarB.setTroskovi(katastar.getTroskovi());
            }
            if (katastar.getDatum_kat() != null && !katastar.getDatum_kat().equals(katastarB.getDatum_kat())) {
                katastarB.setDatum_kat(katastar.getDatum_kat());
            }

            if ( katastar.getPodaci()!=null) {
                katastarB.setPodaci(katastar.getPodaci());
            }

            if (katastar.getPodaci() != null) {
                katastar.setPodaci(katastar.getPodaci());

            }
            return katastarRepository.save(katastarB);

        }

        return null;



    }

    public ResponseEntity<?> uploadPdf(MultipartFile file, Long id) throws IOException {
        Katastar katastar = katastarRepository.findById(id).orElse(null);

        if (katastar != null) {
            katastar.setPodaci(file.getBytes());
            katastarRepository.save(katastar);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    public ResponseEntity<byte[]> downloadPdf(Long id) {
        Katastar katastar = katastarRepository.findById(id).orElse(null);
        if (katastar != null) {
            return ResponseEntity.ok().contentType(MediaType.APPLICATION_PDF).body(katastar.getPodaci());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public Katastar saveKatastar(Katastar katastar) {
        
        katastar.setDatum_kat(Date.valueOf(LocalDate.now()));
        return katastarRepository.save(katastar);
    }

    public Katastar plati(Long id) {
        Katastar katastar = katastarRepository.findById(id).orElse(null);

        if (katastar != null) {

            Trosak trosak=new Trosak();
            trosak.setIznos(katastar.getTroskovi());
            trosak.setOpis("Katastar");
            trosak.setDatum(Date.valueOf(LocalDate.now()));

            trosakRepository.save(trosak);

            katastar.setDatum_placanja(Date.valueOf(LocalDate.now()));
            return katastarRepository.save(katastar);
        }
        return null;


    }

    public String removeKatastar(Long id) {
        katastarRepository.deleteById(id);
        return "Uspešno brisanje";
    }
}
