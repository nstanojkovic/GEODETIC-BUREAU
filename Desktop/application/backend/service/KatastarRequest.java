package com.example.demo.service;

import com.example.demo.entity.Katastar;
import org.springframework.web.multipart.MultipartFile;

public class KatastarRequest {

    private Katastar katastar;

    private MultipartFile file;

    public KatastarRequest(Katastar katastar, MultipartFile multipleFile) {

        this.katastar=katastar;
        this.file=multipleFile;
    }


    public Katastar getKatastar() {
        return katastar;
    }

    public void setKatastar(Katastar katastar) {
        this.katastar = katastar;
    }

    public MultipartFile getFile() {
        return file;
    }

    public void setFile(MultipartFile file) {
        this.file = file;
    }
}
