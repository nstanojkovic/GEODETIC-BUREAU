import { Component, OnInit } from '@angular/core';
import { PredmetService } from '../predmet.service';
import { Router } from '@angular/router';
import { Predmet } from '../models/Predmet';
import { Posao } from '../models/Posao';
import { ParcelaService } from '../parcela.service';
import { Parcela } from '../models/Parcela';
import { KlijentService } from '../klijent.service';
import { Klijent } from '../models/Klijent';
import { PosaoService } from '../posao.service';
import { catchError, flatMap, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Plati } from '../models/Plati';
import { Katastar } from '../models/Katastar';
import { KatastarService } from '../katastar.service';
import { TerenService } from '../teren.service';
import { User } from '../models/User';
import { Teren } from '../models/Teren';



@Component({
  selector: 'app-predmeti',
  templateUrl: './predmeti.component.html',
  styleUrls: ['./predmeti.component.css']
})
export class PredmetiComponent implements OnInit {

  constructor(
    private predmetService: PredmetService,
    private parcelaService: ParcelaService,
    private klijentService: KlijentService,
    private posaoService: PosaoService,
    private katastarService: KatastarService,
    private terenService: TerenService,
    private router: Router
  ) {}

  sortDirection: boolean = true;  // true za A-Z, false za Z-A

  newPredmet: Predmet = new Predmet()
  

  dodajProvera: boolean;
  predmeti: Predmet[] = [];
  id: number;
  idparcela: number;
  idklijent: number;
  idposao: number;
  detaljiKlijenta: number | null = null;
  detaljiParcele: number | null = null;
  poslovi: Posao[] = [];
  editKlijent = false;
  editParcela = false;
  klijent: Klijent;
  selectedPosao: number;
  predmet: Predmet;
  promeniProvera: boolean[] = [];
  parcela: Parcela;
  file: File;
  editingIndex: number | null = null;
  detaljiPlacanja:number | null = null;

  detaljiKatastar:number | null = null;
  detaljiTeren:number | null = null;

  katastar:Katastar=new Katastar()

  vidiPlacanja: boolean = false;
  placanja: Plati[] = [];
  teren:Teren
  tereni:Teren[]=[]
  katastri:Katastar[]=[]

  katastarPredmet:Katastar[]=[]
  selektovaniPredmet: Predmet | null = null;
  existingSearch:string
  radnik:User=null

  ngOnInit(): void {

        if (localStorage.getItem('Search')) {

          this.existingSearch = JSON.parse(localStorage.getItem('Search'));
    
            
      }
      
        if (localStorage.getItem('User')) {

            this.radnik = JSON.parse(localStorage.getItem('User'));
 
          }
          else{
            this.router.navigate([''])
          }

          if(this.existingSearch)
            this.sviPredmetiSaFilterom();
          else
          this.sviPredmeti()
            this.sviPoslovi();
            this.sviTereni();
            this.sviKatastri();
  }

  sviPoslovi() {
    this.posaoService.getAllPoslovi().subscribe((data: Posao[]) => {
      this.poslovi = data;
    });
  }

  sviTereni(){
    this.terenService.getAllTereni().subscribe((data:Teren[])=>{
      this.tereni=data
    })
  }

  sviKatastri(){
    this.katastarService.getAllKatastar().subscribe((data:Katastar[])=>{
      this.katastri=data
    })
  }

  prikaziDetaljeKlijenta(index: number) {
    this.detaljiKlijenta = index;
    this.detaljiParcele = null;
  }

  prikaziDetaljeParcele(index: number) {
    this.detaljiParcele = index;
    this.detaljiKlijenta = null; // Hide client details if open
  }

  zatvoriDetalje() {
    this.detaljiKlijenta = null;
    this.detaljiParcele = null;
    this.editKlijent = false;
    this.editParcela = false;
  }

  sviPredmetiSaFilterom() {
    this.predmetService.getAllPredmeti().subscribe(
      (data: Predmet[]) => {
        // Pretvaramo existingSearch u mala slova radi lakšeg poređenja
        const searchLower = this.existingSearch.toLowerCase();
  
        // Filtriramo predmete koji zadovoljavaju uslov
        this.predmeti = data.filter(predmet => 
          predmet.posao.naziv.toLowerCase().includes(searchLower) ||
          predmet.klijent.ime.toLowerCase().includes(searchLower) || 
          predmet.klijent.prezime.toLowerCase().includes(searchLower) || 
          predmet.klijent.imeOca.toLowerCase().includes(searchLower) || 
          predmet.parcela.brKatParcele.toLowerCase().includes(searchLower)  ||
          predmet.parcela.katOpstina.toLowerCase().includes(searchLower) ||
          predmet.parcela.opstina.toLowerCase().includes(searchLower) 
        );
      },
      (error) => {
        alert("Greška prilikom uzimanja svih predmeta");
      }
    );
  }
  

  sviPredmeti() {
    this.predmetService.getAllPredmeti().subscribe(
      (data: Predmet[]) => {
        this.predmeti = data;
      },
      (error) => {
        alert("Greska prilikom uzimanja svih predmeta");
      }
    );
  }

  promeniProvere(index: number) {
    this.promeniProvera[index] = !this.promeniProvera[index];
  }

  prikaziFormuZaPromenu(index: number) {
    this.editingIndex = index;
    this.newPredmet = { ...this.predmeti[index] };
    this.promeniProvera[index] = true;
    this.dodajProvera = true; // Prikazujemo formu
  }

  promeniPredmet(i: number) {
    this.editingIndex = i;
  }

  zatvori() {
    this.dodajProvera = false;
    this.editingIndex = null;
    window.location.reload();
  }

  izbrisiPredmet(id: number) {
    const confirmed = confirm("Da li ste sigurni da želite da obrišete ovaj predmet?");
    if (confirmed) {
      this.predmetService.izbrisiPredmet(id).subscribe(
        (data: string) => {
          alert("Predmet je uspešno obrisan.");
        },
        (error) => {
          //alert("Nemoguće je izbrisati dati predmet.");
        }
      );
      alert("Predmet je uspešno obrisan.");
      window.location.reload();
    }
  }

  dodajPredmet() {

    if(this.file){
      this.convertMultipartFileToNumberArray(this.file).subscribe((data)=>{

        
        this.newPredmet.parcela.ln=data
        
      })
  
    }
    if (this.editingIndex == null && this.newPredmet != null) {
      this.predmetService.dodajPredmet(this.newPredmet).subscribe((predmet: Predmet) => {
        alert("Uspesno");
        window.location.reload();
      }, error => {
        alert("Greska");
      });
    } else if (this.newPredmet != null) {
      this.predmetService.promeniPredmet(this.newPredmet).subscribe((predmet: Predmet) => {
        alert("Uspesno");
        window.location.reload();
      }, error => {
        alert("Greska");
      });
    } else {
      alert("NEEEEEEEEEE");
    }
  }
  //menjanje parcele
  promeniParcelu(i: number) {
    this.editParcela = false;
    this.parcela = this.predmeti[i].parcela;

    if (this.parcela != null) {
      this.parcelaService.promeniParcelu(this.parcela).subscribe((data: Parcela) => {
        if (data != null) {
          this.uploadPdf(this.parcela.id);
          window.location.reload();
        }
        alert('Uspesno je promenjena parcela');
      });
    }
  }

  onFileSelected(event, i: number) {
    this.file = event.target.files[0];
  }

  //moze da bude od koristi da vidimo
  downloadPdf(p: Parcela) {
    const parcelaId = p.id;
    this.parcelaService.downloadPdf(parcelaId).subscribe((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    });
  }


  downloadPdf1(index: number) {

    const katastarId = index; 
    this.katastarService.downloadPdf(katastarId).subscribe((data: ArrayBuffer) => {
      const blob = new Blob([data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    });
  }

  uploadPdf(index: number) {
    this.parcela = this.predmeti[index].parcela;
    if (this.file) {
      this.parcelaService.uploadPdf(this.file, index).subscribe(() => {
 
      });
    }
    this.file = null;
  }

  convertMultipartFileToNumberArray(file: File) {
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

  //menjanje klijenta
  promeniKlijenta(index: number) {
    this.editKlijent = false;
    this.promeniProvera[index] = false;
    this.klijent = this.predmeti[index].klijent;

    this.klijentService.promeniKlijenta(this.klijent).subscribe(
      (data: Klijent) => {
        alert("Uspesno promenjen Klijent");
        this.predmeti[index].klijent = data;
      },
      (error) => {
        alert("Greska nemoguca promena Klijenta");
      }
    );
    window.location.reload();
  }


  zavrsiPredmet(id: number,provera:boolean) {

    if(!provera)

      {  const potvrda = window.confirm('Da li ste sigurni da želite da završite ovaj predmet?');
        
          if (potvrda) {
            this.predmetService.zavrsiPredmet(id).subscribe(
              (data: Predmet) => {
                console.log('Predmet je uspešno završen.', data);
                this.sviPredmeti();
              },
              (error) => {
                console.error('Došlo je do greške prilikom završavanja predmeta.', error);
              }
            );
          }
        }}


        


        platiPredmet(idPredmeta: number, dug: number) {
          const iznos = prompt("Unesite iznos koji želite da platite u:");
          if (iznos !== null) {
            const iznosPlacanja = parseFloat(iznos);
            if (!isNaN(iznosPlacanja) && iznosPlacanja > 0 && iznosPlacanja <= dug) {
              const napomena = prompt("Unesite napomenu (opcionalno):");
              const potvrda = confirm("Da li ste sigurni da želite da platite ovaj predmet?");
              if (potvrda) {
                this.predmetService.platiPredemt(idPredmeta, iznosPlacanja, napomena || '').subscribe(data => {
                }
              );
              }
        
            } else {
              alert("Unesite validan iznos koji je manji ili jednak dugu.");
            }

            window.location.reload();
          }
        }
        


        // Dodajemo novi atribut u TypeScript komponentu
    mouseOver(predmet: any) {
    this.vidiPlacanja = true;
    }

    mouseLeave(predmet: any) {
      this.vidiPlacanja = false;
    }

 

    otvoriPlacanja(idPredmeta: number,red:number) {

      this.detaljiPlacanja=red
      this.predmetService.placanjaPredmet(idPredmeta).subscribe(data => {
        this.placanja = data;
        
        this.selektovaniPredmet = this.predmeti.find(predmet => predmet.id === idPredmeta) || null;
      },
      error=>{
        alert("Greska nema placanja za dati predmet")
      }
    
    );
    }
  
    zatvoriPlacanja() {
      this.detaljiPlacanja=null
      this.placanja = [];
      this.selektovaniPredmet = null;
    }

    katastarVidi:boolean=false

      proveraKatastar(idPredmeta:number){
            for(const k of this.katastri){
              if(k.predmet.id==idPredmeta){
                return true
              }
          }
          return false

      }

      proveraTeren(idPredmeta:number){
        for(const t of this.tereni){
          if(t.predmet.id==idPredmeta){
            return true
            }
        }
        return false

    } 

    prikaziKatastar(id,i){
        this.predmetService.getKatastarByPredmet(id).subscribe((data:Katastar[])=>{
          this.detaljiKatastar=i
          if(data.length>0)
          {
            
            this.katastarVidi=true
            this.katastarPredmet=data
            this.predmet=this.predmeti[i]
        
           }

          else{
            this.dodajKatastarBool=true
            this.dodajKatastar(id,i)
          }
        })

    }
 
    

    terenVidi:boolean=false
    

    prikaziTeren(idPredmeta:number,i:number){

      this.detaljiTeren=i

      for(const t of this.tereni){
          if(t.predmet.id==idPredmeta){
            this.teren=t
            this.terenVidi=true
          }
      }
      if(!this.terenVidi){
         
          this.dodajTeren(this.predmeti[i])
      }

  }


  dodajTeren(pr: Predmet) {
    const potvrda = confirm("Da li ste sigurni da želite da dodate teren?");

    if (potvrda) {
      this.terenService.addTeren(this.radnik, pr).subscribe(
        (data) => {
          if (data) {
            alert("Uspešno dodat teren");
            window.location.reload()
          }
        },
        (error) => {
          alert("Greška: ne može da se doda teren");
        }
      );
    } else {
      console.log("Dodavanje terena je otkazano");
      window.location.reload()
    }
  }
  

    onFileSelected1(event) {
      this.file = event.target.files[0];
    }

    dodajKatastarBool:boolean=false


    dodajKatastar(predmetId:number,index:number):void{
      this.detaljiKatastar=index
      this.dodajKatastarBool=true
      this.predmet=this.predmeti[index]

      

    }

    sacuvajKatastar(){

      this.katastar.predmet=this.predmet
      if (this.file) {

        this.convertMultipartFileToNumberArray(this.file).pipe(
          catchError(error => {
            return throwError("Greška pri konverziji fajla u niz brojeva.");
          }),
          flatMap((numberArray: number[]) => {
          //  this.ln = numberArray;
    
            this.katastar.podaci=numberArray
           
            return this.katastarService.dodajKatastar(this.katastar)
          })
        ).subscribe(
          (data: Katastar) => {
            alert("Uspesno dodat katastar");
            window.location.reload();
          },
          (error) => {
            alert("Nemoguce je dodati katastar");
          }
        );
      } else {

        this.katastarService.dodajKatastar(this.katastar).subscribe(
          (data: Katastar) => {
            alert("Uspesno dodat katastar");
            window.location.reload();
          },
          (error) => {
            alert("Nemoguce je dodati katastar");
          })
      }
       this.file=null;
    }


    povratakNazad(){
      window.location.reload()
    }


    sortBy(field: string) {
      this.sortDirection = !this.sortDirection;
      this.predmeti.sort((a, b) => {
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


    sortColumn
    
    sortByColumn(column: string) {
      if (this.sortColumn === column) {
        this.sortDirection = !this.sortDirection;
      } else {
        this.sortColumn = column;
        this.sortDirection = true;
      }
  
      this.predmeti.sort((a, b) => {
        let comparison = 0;
        if (column === 'datum_kat' || column === 'datum_placanja') {
          const dateA = new Date(a[column]).getTime();
          const dateB = new Date(b[column]).getTime();
          comparison = dateA - dateB;
        } else if (typeof a[column] === 'number' && typeof b[column] === 'number') {
          comparison = a[column] - b[column];
        } else {
          comparison = a[column].localeCompare(b[column]);
        }
        return this.sortDirection ? comparison : -comparison;
      });
    }
  
  
}
