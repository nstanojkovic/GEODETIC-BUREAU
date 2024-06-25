import { Component } from '@angular/core';


import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private userService: UserService, private router: Router){}

  ngOnInit(): void{

  }

  username: string
  password: string
  message: string

  poruka:string=""

  dataNotFilled: boolean = false
  login(){
    
    if(this.username == null || this.password == null){
      this.poruka = "Popunite sva polja"
    } else{
      this.poruka = ""
      this.userService.login(this.username, this.password).subscribe((data: User) =>{

        if(data == null){
          this.poruka="Pogresno korisnicko ime ili sifra "         
        } else {
          localStorage.setItem('User', JSON.stringify(data))
          this.router.navigate(['meni'])
        }        
        
      })
    }
    

  }

  

}
