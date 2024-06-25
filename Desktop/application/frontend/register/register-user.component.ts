import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {


  constructor(private userService:UserService,private router:Router){}

  username:string=""
  password:string=""
  firstname:string=""
  lastname:string=""

  message:string=null


  register(){    
    if(this.username == "" || this.password == "" || this.firstname == "" || this.lastname == ""){
      this.message = "Popuniti sva polja"
    } else {
      this.message = ""
      this.userService.sendRequest(this.username, this.password, this.firstname, this.lastname).subscribe((data: User)=>{      
        if(data){
          alert("Uspesna registracija")  
          this.router.navigate(['login'])
    
        }else{
          console.error("Korisnicko ime vec postoji")
        alert("Korisnicko ime vec postoji")

        }
      },
      (error) =>{
        this.username=""
       
        console.error("Korisnicko ime vec postoji")
        alert("Korisnicko ime vec postoji")
      
      })
    }    

  }  

}
