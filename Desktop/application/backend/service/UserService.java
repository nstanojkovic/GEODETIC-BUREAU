package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.entity.Zahtev;
import com.example.demo.repository.UserRepository;


import com.example.demo.repository.TerenRepository;
import com.example.demo.repository.ZahtevRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TerenRepository terenRepository;


    @Autowired
    private ZahtevRepository zahtevRepository;

    //nista ovde mozemo da napravimo saveUser
    //mozemo da naopravimo getUserByUsernameAndPassword


    public List<User>getAllRadnici(){
        return userRepository.findAll();
    }
    public User saveUser(User user){
        return userRepository.save(user);
    }

    public User getUserByUsernameAndPassword(String username, String password){
        User u= userRepository.findUserByUsernameAndPassword(username,password);
        if(u==null){
            return null;
        }
       else if(u.isFired()){
           return null;
       }
       else
           return u;
    }


    public User prihvatiZahtev(Long id) {
        Zahtev zahtev=zahtevRepository.findById(id).get();

        User r=new User();

        r.setUsername(zahtev.getUsername());
        r.setFirstname(zahtev.getFirstname());
        r.setLastname(zahtev.getLastname());
        r.setPassword(zahtev.getPassword());
        r.setFired(false);
        r.setAdmin(false);

       User radnik= this.userRepository.save(r);

        this.zahtevRepository.deleteById(id);

        return radnik;

    }

    public User otpustiUsera(Long id) {

        User u=userRepository.findById(id).get();

        u.setFired(true);



        return userRepository.save(u);
    }

    public User promeniNalog( User user) {
        User userB=userRepository.findById(user.getUserID()).get();

        if(!user.getFirstname().equals("")){
            userB.setFirstname(user.getFirstname());
        }
        if(!user.getLastname().equals("")){
            userB.setLastname(user.getLastname());
        }
        if(!user.getPassword().equals("")){
            userB.setPassword(user.getPassword());
        }

        if(!user.getUsername().equals("")){
            userB.setUsername(user.getUsername());
        }




        return userRepository.save(userB);
    }
}
