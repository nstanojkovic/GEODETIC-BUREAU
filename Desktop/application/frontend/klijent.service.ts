import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Klijent } from './models/Klijent';
import { Predmet } from './models/Predmet';
import { Observable } from 'rxjs';
import { Plati } from './models/Plati';

@Injectable({
  providedIn: 'root'
})
export class KlijentService {

  uri = 'http://localhost:8080'

  constructor(private http:HttpClient) { }


  dodajKlijenta(ime1, prezime1, imeOca1, jmbg1,
    pribivaliste1,telefon1,brlk1
  ){

    const data = {

      ime: ime1,
      prezime: prezime1,
      imeOca: imeOca1,
      jmbg: jmbg1,
      pribivaliste:pribivaliste1,
      telefon:telefon1,
      brlk:brlk1
    }    

    return this.http.post<Klijent>(`${this.uri}/klijenti/dodaj`, data);

  }


  promeniKlijenta( k:Klijent){

    const data = {
      id:k.id,
      ime: k.ime,
      prezime: k.prezime,
      imeOca: k.imeOca,
      jmbg: k.jmbg,
      telefon:k.telefon,
      pribivaliste:k.pribivaliste,
      brlk:k.brlk
    }    

    return this.http.post<Klijent>(`${this.uri}/klijenti/promeni`, data);

  }

  izbrisiKlijenta(id:number){
    
    return this.http.delete(`${this.uri}/klijenti/izbrisi/${id}`, );
  }

  getAllKlijenti(){
    return this.http.get(`${this.uri}/klijenti`)
  }


  getPredmetiKlijent(id: number): Observable<Predmet[]> {
    return this.http.get<Predmet[]>(`${this.uri}/${id}/klijent/predmeti`);
  }

  getPlacanjaKlijentById(id:number):Observable<Plati[]>{

    return this.http.get<Plati[]>(`${this.uri}/${id}/klijent/placanja`);

  }

  getPlacanjaSvaKlijenta(){

    return this.http.get<Map<number, Plati[]>>(`${this.uri}/klijenti/svaplacanja`);

  }
  
}
