package com.example.demo.service;

import com.example.demo.entity.Komentar;
import com.example.demo.repository.KomentariRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Transactional
@Service
public class KomentarService {

    @Autowired
    private KomentariRepository komentarRepository;


    public List<Komentar> getAllKomentari() {

        return komentarRepository.findAll();
    }

    public Komentar saveKomentar(Komentar komentar) {

        komentar.setDatum(Date.valueOf(LocalDate.now()));
        return komentarRepository.save(komentar);
    }

    public boolean removeKomentar(Long id) {
        if (komentarRepository.existsById(id)) {
            komentarRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
