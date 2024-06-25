import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { PosaoService } from '../posao.service';
import { Posao } from '../models/Posao';
import { Predmet } from '../models/Predmet';
import { User } from '../models/User';

@Component({
  selector: 'app-poslovi',
  templateUrl: './poslovi.component.html',
  styleUrls: ['./poslovi.component.css']
})
export class PosloviComponent implements OnInit {
  
  constructor(private posaoService: PosaoService, private router: Router) {}

  posao: Posao;
  poslovi: Posao[] = [];
  naziv: string = "";
  promeniProvera: boolean[] = []; 
  predmetiMap: Map<number, Predmet[]> = new Map<number, Predmet[]>();
  predmeti: Predmet[] = [];
  detaljiPosao: number | null = null;
  poruka: string = "";

  collapseTable: boolean = false;

    toggleCollapse() {
        this.collapseTable = !this.collapseTable;
    }
  
  sortDirection: boolean = true;  // true za A-Z, false za Z-A
  radnik:User

  ngOnInit(): void {

    if (localStorage.getItem('User')) {

      this.radnik = JSON.parse(localStorage.getItem('User'));
          
    }
    else{
      this.router.navigate([''])
    }
    
    this.sviPoslovi();
  }

  sviPoslovi() {
    this.posaoService.getAllPoslovi().subscribe((data: Posao[]) => {
      this.poslovi = data;
      this.sviPredmetiPoPoslu();
    });
  }

  prikaziPredmete(id: number): void {
    if (this.detaljiPosao === id) {
      this.detaljiPosao = null;
    } else {
      this.detaljiPosao = id;
      this.predmeti = this.predmetiMap.get(id);
    }
  }

  zatvoriPredmete() {
    this.detaljiPosao = null;
  }
    
  promeniProvere(index: number) {
    this.promeniProvera[index] = !this.promeniProvera[index];
  }

  promeniPosao(index: number) {
    this.promeniProvera[index] = false; 
    this.posao = this.poslovi[index];


    
    this.posaoService.promeniPosao(this.posao).subscribe((data: Posao) => {
      alert("Uspesno promenjen Posao");
      this.poslovi[index] = data;
      window.location.reload();
    }, (error) => {
      alert("Greska nemoguca promena Posla");
    });
  }

  izbrisiPosao(index) {
    const confirmed = confirm("Da li ste sigurni da želite da obrišete ovaj posao?");
    if (confirmed) {
      this.posaoService.izbrisiPosao(index).subscribe((data: string) => {
        alert("Posao je uspešno obrisan.");
       
      })
    }
    window.location.reload();
  
    
  }

  dodajPosao() {
    if (this.naziv != "") {
      this.posaoService.dodajPosao(this.naziv).subscribe((data: Posao) => {
        alert("Uspesno dodat posao");
        window.location.reload();
      });
    } else {
      this.poruka = "Dopunite polje naziv";
    }
  }

  sviPredmetiPoPoslu() {
    for (const p of this.poslovi) {
      this.posaoService.getPredmetiParcela(p.id).subscribe((data: Predmet[]) => {
        if (data.length > 0) {
          this.predmetiMap.set(p.id, data);
        }
      });
    }
  }

  sortBy(field: string) {
    this.sortDirection = !this.sortDirection;
    this.poslovi.sort((a, b) => {
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

  povratakNazad(){
    this.collapseTable=false
  }
}
