import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { Zahtev } from '../models/Zahtev';
import { Komentar } from '../models/Komentar';
import { KomentarService } from '../komentar.service';

@Component({
  selector: 'app-meni',
  templateUrl: './meni.component.html',
  styleUrls: ['./meni.component.css']
})
export class MeniComponent implements OnInit {

  user: User | null = null; // Initialize user property with type User
  zahtevi: Zahtev[] = [];

  komentari:Komentar[]=[]

  proveraZahtevi:boolean=false
  proveraKomentari:boolean=false




  izmeniProvera:boolean=false

  message:string=null
  constructor(private userService: UserService,private komentarService: KomentarService,
     private router: Router) {}

  ngOnInit(): void {


    const storedUser = localStorage.getItem('User');

    if (storedUser) {
      // Parse the JSON string back to an object
      this.user = JSON.parse(storedUser);

    }
  }



  showZahtevi(): void {

    this.proveraZahtevi=!this.proveraZahtevi

    if(this.proveraZahtevi)
      this.getAllZahtevi();
  }

  showKomentari():void{

    this.proveraKomentari=!this.proveraKomentari


    if(this.proveraKomentari){
      this.sviKomentari()
    }

  }

  getAllZahtevi(): void {
    this.userService.getAllZahtevi().subscribe((data: Zahtev[]) => {
      if (data) {
        this.zahtevi = data;
      }
    });
  }


  sviKomentari(): void {
    this.komentarService.getAllKomentari().subscribe((data: Komentar[]) => {
      if (data) {
        this.komentari = data;
      }
    });
  }

  izbrisiKomentar(id: number): void {
    this.komentarService.izbrisiKomentar(id).subscribe(
      (data) => {
        // Uspešno brisanje
        if (data) {
          alert("Uspesno obrisan komentar");
          this.sviKomentari(); // Osvježavanje liste komentara
        }
      },
      (error) => {
      //  alert("Neuspesno obrisan komentar");
      }
    );

    alert("Uspesno obrisan komentar");
    this.sviKomentari(); // Osvježavanje liste komentara

  }
  

  prihvatiZahtev(id:number):void{

    this.userService.acceptRequest(id).subscribe((data:User)=>{

      alert("Uspesjno dodat korisnik:"
      +data.username+" "+data.firstname+" "+data.lastname)

      window.location.reload()

    }),error=>{
      alert("Zao nam je ali imate  gresku")
    }

  }


    izbrisiZahtev(id: number): void {
      this.userService.removeRequest(id).subscribe(
        (data) => {
          // Uspešno brisanje
          if (data) {
            alert("Uspesno odbijena registracija");
            this.getAllZahtevi(); // Osvježavanje liste komentara
          }
        },
        (error) => {
       //  alert("Neuspesno obrisan komentar");
        }
      );
  
      alert("Uspesno odbijena registracija");
   
      this.getAllZahtevi(); // Osvježavanje liste komentara
    
    

  }

  izmeniNalog(){
    if(this.user.username == "" || this.user.password == "" || this.user.firstname == "" || this.user.lastname == ""){
      this.message = "Popuniti sva polja"
    } else {
      this.message = ""

  
      this.userService.userUpdate(this.user).subscribe((data: User)=>{      
        if(data){
          localStorage.removeItem('User');
          localStorage.setItem('User', JSON.stringify(data))
          alert("Uspesna promena naloga")  
          window.location.reload()
       
    
        }
      },
      (error) =>{
        this.user.username=""
       
        console.error("Korisnicko ime vec postoji")
    
      
      })
    }    


  }

  izmeniProveru(){
    this.izmeniProvera=!this.izmeniProvera
  }

  povratakNazad(){
    window.location.reload()
  }


}
