import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private router: Router){}
  isLoggedIn=localStorage.getItem

  odjavi(){

    var lastKey = localStorage.key(localStorage.length - 1);

    localStorage.removeItem(lastKey);
    this.router.navigate(['']).then(() => {
      window.location.reload();
    });

  }

  user:User

  ngOnInit() {
    // Dohvati vrijednost iz localStorage pri inicijalizaciji komponente
    
 
    if (localStorage.getItem('User')) {

      this.user = JSON.parse(localStorage.getItem('User'));

    }
    const storedSearchTerm = localStorage.getItem('Search');
    if (storedSearchTerm) {
      this.searchTerm = JSON.parse(storedSearchTerm);
      localStorage.removeItem('Search');
    }
  }

  searchTerm:string

  poslovi(){
    ///da li da pomeram to ili ne da ostavim da stoji tako 
    //u sustini mogu da pomeram a mogu i da ostavim da tako stoji

    this.router.navigate(['poslovi'])
  }

  radnici(){
    this.router.navigate(['radnici'])
  }


  klijenti(){

    this.router.navigate(['klijenti'])

  }

  meni(){
    this.router.navigate(['meni'])
  }

  parcele(){
    this.router.navigate(['parcele'])
  }

  katastar(){
    this.router.navigate(['katastar'])
  }

  predmeti(){

    this.router.navigate(['predmeti'])

  }

  blagajna(){

    this.router.navigate(['blagajna'])

  }

  pretrazi(){
    if(this.searchTerm){

      
   if(   JSON.parse(localStorage.getItem('Search'))){
    localStorage.removeItem('Search')
   }
      localStorage.setItem('Search', JSON.stringify(this.searchTerm));
      this.router.navigate(['predmeti']).then(() => {
        window.location.reload();
      });
    } 
}


}
