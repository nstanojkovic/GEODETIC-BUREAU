import { Component } from '@angular/core';
import { ParcelaService } from '../parcela.service';
import { Router } from '@angular/router';
import { Parcela } from '../models/Parcela';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Observable, catchError, flatMap, throwError } from 'rxjs';
import { Predmet } from '../models/Predmet';
import { User } from '../models/User';


@Component({
  selector: 'app-parcele',
  templateUrl: './parcele.component.html',
  styleUrls: ['./parcele.component.css']
})
export class ParceleComponent {

  constructor(private parcelaService: ParcelaService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    if (localStorage.getItem('User')) {

      this.radnik = JSON.parse(localStorage.getItem('User'));

          
    }
    else{
      this.router.navigate([''])
    }
    this.sveParcele()
  }

  radnik:User
  dodajProvera:boolean=false
  promeniProvera: boolean[] = [];
  predmeti: Predmet[] = []
  parcela: Parcela=new Parcela()

  predmetiMap: Map<number, Predmet[]> = new Map<number, Predmet[]>();

  parcele: Parcela[] = []
  detaljiParcele: number | null = null;
  visibleRowIndex: number | null = null;  // Add this line

  poruka: string = ""
  naziv: string = ""

  pdfUrl: string = '';

  br_kat_parcele: string = ""
  kat_opstina: string = ""
  opstina: string = ""
  ln: Array<number> = []



  file: File

  sveParcele() {
    this.parcelaService.getAllParcele().subscribe((data: Parcela[]) => {
      this.parcele = data

      this.sviPredmetiPoParceli()
    })
  }

  sviPredmetiPoParceli(){

    for (const k of this.parcele) {
        this.parcelaService.getPredmetiParcela(k.id).subscribe((data:Predmet[])=>{
          if(data.length>0)
            this.predmetiMap.set(k.id,data)
        })
    }

}

  

  promeniProvere(index: number) {
    this.promeniProvera[index] = !this.promeniProvera[index];
  }

  promeniParcelu(i) {
    this.promeniProvera[i] = false;
    this.parcela = this.parcele[i]

    if (this.file) {
      this.convertMultipartFileToNumberArray(this.file).pipe(
        catchError(error => {
          return throwError("Greška pri konverziji fajla u niz brojeva.");
        }),
        flatMap((numberArray: number[]) => {
        //  this.ln = numberArray;

          this.parcela.ln=numberArray
          return this.parcelaService.promeniParcelu(this.parcela)
        })
      ).subscribe(
        (data: Parcela) => {
          alert("Uspesno promenjena parcela");
          window.location.reload();
        },
        (error) => {
          alert("Nemoguce je promeniti parcelu");
        }
      );
    } else {
      this.ln = null;
      this.parcelaService.promeniParcelu(this.parcela).subscribe(
        (data: Parcela) => {
          alert("Uspesno promenjena parcela");
          window.location.reload();
        },
        (error) => {
          alert("Nemoguce je promeniti parcelu");
        })
    }
  }


  izbrisiParcelu(i) {
    
    const confirmed = confirm("Da li ste sigurni da želite da obrišete ovu parcelu?");
    if (confirmed) {
      this.parcelaService.izbrisiParcelu(i).subscribe(
        (data: string) => {
          alert("Parcela je uspešno obrisana.");
        },
        (error) => {
          alert("Nemoguće je izbrisati datu parcelu.");
        }
      );
    }
    window.location.reload();
  }

  

  dodajParcelu() {

    if(this.parcela.katOpstina=="" || this.parcela.opstina=="" || this.br_kat_parcele!=""){
      this.poruka="Zao nam je ali  niste popunili sva polja"
    }
    else
    if (this.file) {
      this.convertMultipartFileToNumberArray(this.file).pipe(
        catchError(error => {
          return throwError("Greška pri konverziji fajla u niz brojeva.");
        }),
        flatMap((numberArray: number[]) => {
          this.parcela.ln=numberArray
          return this.parcelaService.dodajParcelu(this.parcela)
        })
      ).subscribe(
        (data: Parcela) => {
          alert("Uspesno dodata parcela");
          window.location.reload();
        },
        (error) => {
          alert("Nemoguce je dodati parcelu");
        }
      );
    } else {
      this.ln = null;
      
      this.parcelaService.dodajParcelu(this.parcela).subscribe(
        (data: Parcela) => {

          if(data){
            alert("Uspesno dodata parcela");
            window.location.reload();
          }
          else{
            alert("Data parcela postoji");
          }
        
        },
        (error) => {
          alert("Data parcela postoji");
        })
    }
  }

  proveraBoja(id:number):boolean{

    if(this.predmetiMap.has(id)){
      if(this.predmetiMap.get(id).length>=2)return true;
    }

    return false
  }

  onFileSelected(event, i) {
    this.file = event.target.files[0];
  }

  onFileSelected1(event) {
    this.file = event.target.files[0];
  }

  uploadPdf(index: number) {
    this.parcela = this.parcele[index]
    if (this.file) {
      this.parcelaService.uploadPdf(this.file, index).subscribe(() => { });
    }
    this.file = null
  }

  downloadPdf(index: number) {
    const parcelaId = index;
    this.parcelaService.downloadPdf(parcelaId).subscribe((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    });
  }

  convertMultipartFileToNumberArray(file: File): Observable<number[]> {
    return new Observable<number[]>((observer) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const byteArray = new Uint8Array(arrayBuffer);
        const numberArray = Array.from(byteArray);
        observer.next(numberArray);
        observer.complete();
      };
      reader.onerror = (error) => observer.error(error);
    });
  }

  prikaziPredmete(id: number): void {
    if (this.detaljiParcele === id) {
      this.detaljiParcele = null;
    } else {

      this.detaljiParcele=id
     this.predmeti=this.predmetiMap.get(id)
    }
  }

  zatvori(){
    this.dodajProvera = false; 

    window.location.reload()
  }


  
  sortDirection:boolean=false
  sortBy(field: string) {
    this.sortDirection = !this.sortDirection;
    this.parcele.sort((a, b) => {
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
