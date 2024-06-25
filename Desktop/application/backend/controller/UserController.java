package com.example.demo.controller;


import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins="http://localhost:4200/")

public class UserController {






    @Autowired
    private UserService userService;


    @PostMapping(path = "/user")
    public User saveUser(@Valid @RequestBody User user){
        return userService.saveUser(user);
    }


    @GetMapping(path = "/radnici")
    public List<User>getAllRadnici(){
        return userService.getAllRadnici();
    }

    @GetMapping(path="/login")
    public User getUserByUsernameAndPassword(@Valid @RequestParam("username") String username,
                                             @Valid @RequestParam("password") String password){
        return userService.getUserByUsernameAndPassword(username,password);

    }

    @PostMapping(path = "/zahtev/prihvati/{id}")
    public User prihvatiZahtev(@Valid @PathVariable("id") Long id) {
        return userService.prihvatiZahtev(id);
    }


    @PostMapping(path = "/user/promeni")
    public User updateUser(@Valid @RequestBody User user) {
        return userService.promeniNalog(user);
    }


    @PostMapping(path = "/user/otpusti/{id}")
    public User otpustiUsera(@Valid @PathVariable("id") Long id) {
        return userService.otpustiUsera(id);
    }





}
