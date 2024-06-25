import { Component, OnInit } from '@angular/core';
import { BlagajnaService } from '../blagajna.service';
import { Router } from '@angular/router';
import { Blagajna } from '../models/Blagajna';
import { Trosak } from '../models/Trosak';
import { Plati } from '../models/Plati';

@Component({
  selector: 'app-blagajna',
  templateUrl: './blagajna.component.html',
  styleUrls: ['./blagajna.component.css']
})
export class BlagajnaComponent implements OnInit {
  constructor(private blagajnaService: BlagajnaService, private router: Router) {}

  blagajne: Blagajna[] = null;
  blagajna: Blagajna = null;
  mesec: number;
  godina: number;
  prihod: number;
  trosak: number;
  stanje: number;

  showAddExpenseForm: boolean = false;
  showExpenses: boolean = false;

  showIncome :boolean=false
  showAddIncomeForm:boolean=false


  noviTrosakIznos: number;
  noviTrosakOpis: string;
  troskovi: Trosak[] = [];


  noviPrihodIznos: number;
  noviPrihodOpis: string;
  prihodi:Plati[]=[]

  meseci: string[] = [
    'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
    'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
  ];
  
  godine: number[] = [2024, 2023, 2022, 2021, 2020];

  ngOnInit(): void {


    if (!localStorage.getItem('User')) {
      this.router.navigate([''])
    }
  }

  prihodTrosakOdDatuma() {
    this.prihod = 0;
    this.trosak = 0;
  
    this.blagajnaService.getStanjeMesecno(this.godina, this.mesec).subscribe((data: number[]) => {
      if (data && data.length >= 2) { 
        this.prihod += data[0]; 
        this.trosak += data[1]; 
        this.stanje = this.prihod - this.trosak;
      } else {
        alert("Podaci nisu pronađeni");
      }
    });
  }
  

  toggleAddExpenseForm() {
    this.showAddExpenseForm = !this.showAddExpenseForm;
    this.showExpenses = false; // Hide expenses view if showing add expense form
  }

  dodajTrosak() {
    if (this.noviTrosakIznos && this.noviTrosakOpis) {
      this.blagajnaService.addTrosak(this.noviTrosakIznos, this.noviTrosakOpis).subscribe(() => {
        alert("Trošak uspešno dodat!");
        this.showAddExpenseForm = false;
        window.location.reload();
      });
    } else {
      alert("Molimo unesite iznos i opis troška.");
    }
  }

  vidiTroskove() {
    if(!this.mesec || !this.godina){
      alert("Uneseite mesec i godinu")
    }
    else
    this.blagajnaService.getTroskoviMesecni(this.godina, this.mesec).subscribe((data: Trosak[]) => {
      if (data) {
        this.troskovi = data;
        this.showExpenses = true;
        this.showAddExpenseForm = false; // Hide add expense form if showing expenses
      } else {
        alert("Podaci nisu pronađeni");
      }
    });
  }

  dodajPrihod() {
    if (this.noviPrihodIznos && this.noviPrihodOpis) {
      this.blagajnaService.addPrihod(this.noviPrihodIznos, this.noviPrihodOpis).subscribe(() => {
        alert("Prihod uspešno dodat!");
        this.showAddIncomeForm = false;
        window.location.reload();
      });
    } else {
      alert("Molimo unesite iznos i opis prihoda.");
    }
  }


  toggleAddIncomeForm() {
    this.showAddIncomeForm = !this.showAddIncomeForm;
    this.showIncome = false; 
  }
  vidiPrihode(){
    if(!this.mesec || !this.godina){
      alert("Uneseite mesec i godinu")
    }
    else
    this.blagajnaService.getPrihodiMesecni(this.godina, this.mesec).subscribe((data: Plati[]) => {
      if (data) {
        this.prihodi = data;
        this.showIncome = true;
        this.showAddIncomeForm = false; // Hide add expense form if showing expenses
      } else {
        alert("Podaci nisu pronađeni");
      }
    });
  }

  nazad(){

    this.showAddExpenseForm= false;
    this.showExpenses = false;
  
    this.showIncome =false
   this. showAddIncomeForm=false

  }
}
