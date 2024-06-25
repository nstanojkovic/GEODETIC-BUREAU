import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posao } from './models/Posao';
import { Observable } from 'rxjs';
import { Predmet } from './models/Predmet';

@Injectable({
  providedIn: 'root'
})
export class PosaoService {

  uri = 'http://localhost:8080'

  constructor(private http:HttpClient) { }

  getAllPoslovi(){
    return this.http.get(`${this.uri}/poslovi`)
  }
  dodajPosao(naziv1){
    const data={
      naziv:naziv1
    }

    return this.http.post<Posao>(`${this.uri}/poslovi/dodaj`, data);
  }

  promeniPosao( p:Posao){

    const data = {
      id:p.id,
      naziv: p.naziv
    }    

    return this.http.post<Posao>(`${this.uri}/poslovi/promeni`, data);
  }

  izbrisiPosao(id:number){
    
    return this.http.delete(`${this.uri}/poslovi/izbrisi/${id}`, );
  }
  getPredmetiParcela(id: number): Observable<Predmet[]> {
    return this.http.get<Predmet[]>(`${this.uri}/${id}/posao/predmeti`);
  }
}
