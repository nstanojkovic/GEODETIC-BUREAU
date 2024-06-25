import { Component, OnInit } from '@angular/core';
import { KlijentService } from '../klijent.service';
import { Router } from '@angular/router';
import { Klijent } from '../models/Klijent';
import { Predmet } from '../models/Predmet';
import { Plati } from '../models/Plati';
import { Parcela } from '../models/Parcela';

@Component({
  selector: 'app-klijenti',
  templateUrl: './klijenti.component.html',
  styleUrls: ['./klijenti.component.css']
})
export class KlijentiComponent  implements OnInit {


  constructor(private klijentService: KlijentService, private router: Router){}



  detaljiKlijenta: number | null = null;
  detaljiPlacanja:number|null=null;

  placanja: Plati[] = [];

  placanjaMap: Map<number, Plati[]> = new Map<number, Plati[]>();

  predmetiMap: Map<number, Predmet[]> = new Map<number, Predmet[]>();


  dodajProvera:boolean=false

  predmeti:Predmet[]=[]
  ime:string=""
  prezime:string=""
  imeOca:string=""
  jmbg:string=""
  brlk:string=""
  pribivaliste:string=""
  telefon:string=""

  klijent:Klijent
  klijenti:Klijent[]

  poruka:string=""
  poruka1:string=""
  jmbg1:string=""


  promeniProvera: boolean[] = []; 


  ngOnInit(): void{

    if (!localStorage.getItem('User')) {
      this.router.navigate([''])
    }


    this.sviKlijenti()


  }

  sviKlijenti(){
    this.klijentService.getAllKlijenti().subscribe((data:Klijent[])=>{
          this.klijenti=data
          this.svaPlacanjaPoKlijentu()
          this.sviPredmetiPoKlijentu()
    })
  }

  dodajKlijenta(){

   

    if(this.provera())
    {
        this.klijentService.dodajKlijenta(this.ime,this.prezime,this.imeOca,
          this.jmbg,this.pribivaliste,this.telefon,this.brlk).subscribe((data:Klijent)=>{
            if(data){
            alert("Uspesno dodat")
            window.location.reload();
            }

          
        },(error)=>{
          alert("Postoji klijent sa datim jmbg ili licnom katom");
          this.jmbg=""
        })
      
      }
      else{
        this.poruka=this.poruka1
      }
       
    
 

  }

  izbrisiKlijenta(id) {
    
    const confirmed = confirm("Da li ste sigurni da želite da obrišete ovog klijenta?");
    if (confirmed) {
      
      this.klijentService.izbrisiKlijenta(id).subscribe(
        (data:string) => {
          alert(data);
         // window.location.reload();
     
        }
      
      );
    } else {
 
    }
    window.location.reload();


}


 

  
menjanje:boolean=false
  promeniProvere(index: number) {
    this.promeniProvera[index] = !this.promeniProvera[index];
    this.menjanje=true
  }

  promeniKlijenta(index: number) {
    this.promeniProvera[index] = false; 


    this.klijent=this.klijenti[index]
   
    if (!/^\d{13}$/.test(this.klijent.jmbg)) {
      alert( "Greška: JMBG mora sadržati samo cifre i to 13.")
  
    }
  
   else if (!/^\d{9}$/.test(this.klijent.brlk)) {
      alert("Greška: BRLK mora sadržati tačno 9 cifara.")
   }
     
   else 
   { this.klijentService.promeniKlijenta(this.klijent).subscribe((data:Klijent)=>{
          alert("Uspesno promenjen Klijent")
          this.klijenti[index]=data

          
          
        },
        (error)=>{
          alert("Greska nemoguca promena Klijenta")
        }
        )

        window.location.reload();}
    }

  


    
    provera(): boolean {
      if (this.jmbg === "" || this.ime === "" || 
          this.prezime === "" || this.imeOca === "" || 
          this.brlk === "" || this.telefon === "") {
        this.poruka1 = "Dopunite sva polja";
        return false;
      }
    
      if (!/^\d{13}$/.test(this.jmbg)) {
        this.poruka1 = "Greška: JMBG mora sadržati samo cifre i to 13.";
        return false;
      }
    
      if (!/^\d{9}$/.test(this.brlk)) {
        this.poruka1 = "Greška: BRLK mora sadržati tačno 9 cifara.";
        return false;
      }
    
      return true;
    }
    

    resetForm(): void {
      this.ime = '';
      this.prezime = '';
      this.imeOca = '';
      this.pribivaliste = '';
      this.telefon = '';
      this.jmbg = '';
      this.brlk = '';
    }


    prikaziPredmete(id: number): void {
      if (this.detaljiKlijenta === id ) {
        this.detaljiKlijenta = null;
        this.predmeti=null
        
     
      } else {
       
        this.detaljiKlijenta = id;
  

          this.predmeti=this.predmetiMap.get(id)
        
      }
    }


    prikaziPlacanja(id:number):void{

      if (this.detaljiPlacanja === id) {

        this.placanja=null
        this.detaljiPlacanja=null
        
      
        
      } else {
        this.detaljiPlacanja=id
     

      this.placanja=this.placanjaMap.get(id)

      }


    }

    sviPredmetiPoKlijentu(){

      for (const k of this.klijenti) {
          this.klijentService.getPredmetiKlijent(k.id).subscribe((data:Predmet[])=>{
            if(data.length>0)
              this.predmetiMap.set(k.id,data)
          })
      }

  }

    svaPlacanjaPoKlijentu(){

        for (const k of this.klijenti) {
            this.klijentService.getPlacanjaKlijentById(k.id).subscribe((data:Plati[])=>{
              if(data.length>0)
                this.placanjaMap.set(k.id,data)
            })
        }



    }

    zatvoriPlacanja(){
      this.detaljiPlacanja=null

     
    }

    zatvoriPredmet(){
      this.detaljiKlijenta=null

    }



    zatvori(){
      this.dodajProvera = false; 
      window.location.reload()
    }

    placanjeparcela(parcela:Parcela):string{
      return parcela.brKatParcele+" "+parcela.katOpstina;
  
    }

    sumaDuga:number=0

    dug(id: number): number {
      let predmeti1 = this.predmetiMap.get(id);
      let sumaDuga = 0;
  
      if (predmeti1) {
          for (const predmet of predmeti1) {
              sumaDuga += predmet.dug;
          }
      }
  
      return sumaDuga;
  }

   sortDirection:boolean=false

  sortBy(field: string) {
    this.sortDirection = !this.sortDirection;
    this.klijenti.sort((a, b) => {
      let nameA = a[field].toLowerCase();
      let nameB = b[field].toLowerCase();
      if (nameA < nameB) {
        return this.sortDirection ? -1 : 1;
      }
      if (nameA > nameB) {
        return this.sortDirection ? 1 : -1;
      }
      return 0;
    });
  }
  

  



}
