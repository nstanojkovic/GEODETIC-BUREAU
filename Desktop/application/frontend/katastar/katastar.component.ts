import { Component } from '@angular/core';
import { KatastarService } from '../katastar.service';
import { Router } from '@angular/router';
import { Katastar } from '../models/Katastar';
import { Observable, catchError, flatMap, throwError } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-katastar',
  templateUrl: './katastar.component.html',
  styleUrls: ['./katastar.component.css']
})
export class KatastarComponent {

  constructor(private katastarService: KatastarService, private router: Router) {}

  katastri: Katastar[] = [];
  katastar: Katastar = new Katastar();
  promeniProvera: boolean[] = [];
  podaci: Array<number> = [];
  poruka: string = "";
  datum_kat: Date;
  br_predmeta: string = "";
  troskovi: number = null;
  datum_placanja: Date;
  file: File = null;
  sortColumn: string = '';
  sortDirection: boolean = true;

  collapseTable: boolean = false;

    toggleCollapse() {
        this.collapseTable = !this.collapseTable;
    }

  ngOnInit(): void {

    if (!localStorage.getItem('User')) {
      this.router.navigate([''])
    }
    
    this.sve();
  }

  sve() {
    this.katastarService.getAllKatastar().subscribe((data: Katastar[]) => {
      this.katastri = data;
    });
  }

  promeniProvere(index: number) {
    this.promeniProvera[index] = !this.promeniProvera[index];
  }

  onFileSelected(event, i) {
    this.file = event.target.files[0];
    this.promeniProvere(i);
  }

  onFileSelected1(event) {
    this.file = event.target.files[0];
  }

  downloadPdf(index: number) {
    const katastarId = index;
    this.katastarService.downloadPdf(katastarId).subscribe((data: ArrayBuffer) => {
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

  promeniKatastar(i) {
    this.promeniProvera[i] = false;
    this.katastar = this.katastri[i];

    if (this.file) {
      this.convertMultipartFileToNumberArray(this.file).pipe(
        catchError(error => throwError("Greška pri konverziji fajla u niz brojeva.")),
        flatMap((numberArray: number[]) => {
          this.katastar.podaci = numberArray;
          return this.katastarService.promeniKatastar(this.katastar);
        })
      ).subscribe(
        (data: Katastar) => {
            alert("Uspešno promenjen katastar");
          window.location.reload();
        },
        (error) => {
          alert("Nemoguće je promeniti katastar");
        }
      );
    } else {
      this.katastarService.promeniKatastar(this.katastar).subscribe(
        (data: Katastar) => {
          alert("Uspešno promenjen katastar");
          window.location.reload();
        },
        (error) => {
          alert("Nemoguće je promeniti katastar");
        }
      );
    }
    this.file = null;
  }

  dodajKatastar() {
    if (this.katastar.br_predmeta === "" || this.katastar.troskovi === null) {
      this.poruka = "Zao nam je ali morate da popunite sva polja";
      return;
    }

    if (this.file) {
      this.convertMultipartFileToNumberArray(this.file).pipe(
        catchError(error => throwError("Greška pri konverziji fajla u niz brojeva.")),
        flatMap((numberArray: number[]) => {
          this.katastar.podaci = numberArray;
          return this.katastarService.dodajKatastar(this.katastar);
        })
      ).subscribe(
        (data: Katastar) => {
          alert("Uspešno dodat katastar");
          window.location.reload();
        },
        (error) => {
          alert("Nemoguće je dodati katastar");
        }
      );
    } else {
      this.katastarService.dodajKatastar(this.katastar).subscribe(
        (data: Katastar) => {
          alert("Uspešno dodat katastar");
          window.location.reload();
        },
        (error) => {
          alert("Nemoguće je dodati katastar");
        }
      );
    }
    this.file = null;
  }

  izbrisiKatastar(i) {
    const confirmed = confirm("Da li ste sigurni da želite da obrišete ovu parcelu?");
    if (confirmed) {
      this.katastarService.izbrisiKatastar(i).subscribe(
        (data: string) => {
          alert("Uspešno brisanje.");
          window.location.reload();
        },
        (error) => {
          //alert("Nemoguće je izbrisati");
        }
      );
      window.location.reload();
    }
  }

  plati(k: number) {
    this.katastarService.plati(k).subscribe(
      (data: Katastar) => {
        if (data != null) {
          alert("Uspešno plaćanje");
          window.location.reload();
        } else {
          alert("Neuspešno plaćanje");
        }
      },
      (error) => {
        alert("Greška prilikom plaćanja");
      }
    );
  }

  sortByColumn(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortColumn = column;
      this.sortDirection = true;
    }

    this.katastri.sort((a, b) => {
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
  povratakNazad(){
    this.collapseTable=false
  }
  
}

