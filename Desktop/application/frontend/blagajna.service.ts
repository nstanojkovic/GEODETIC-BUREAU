import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blagajna } from './models/Blagajna';
import { Trosak } from './models/Trosak';
import { Plati } from './models/Plati';

@Injectable({
  providedIn: 'root'
})
export class BlagajnaService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:8080'


  getStanjeMesecno(godina: number, mesec: number): Observable<number[]> {
    return this.http.post<number[]>(`${this.uri}/blagajna/stanje`, { godina, mesec });
  }

  getTroskoviMesecni(godina:number,mesec:number):Observable<Trosak[]>{


    return this.http.post<Trosak[]>(`${this.uri}/troskovi/mesecni`, { godina, mesec });

  }

  getPrihodiMesecni(godina:number,mesec:number):Observable<Plati[]>{


    return this.http.post<Plati[]>(`${this.uri}/prihodi/mesecni`, { godina, mesec });

  }

  addTrosak(i:number,o:string):Observable<Trosak>{
  
    const data={

      iznos:i,
      opis:o
  
    }
    
    return this.http.post<Trosak>(`${this.uri}/trosak/dodaj`,data );
  }

  addPrihod(i:number,o:string):Observable<Plati>{
  
    const data={

      iznos:i,
      napomena:o
  
    }
    
    return this.http.post<Plati>(`${this.uri}/prihod/dodaj`,data );
  }

}
