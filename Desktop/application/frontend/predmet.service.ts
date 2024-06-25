import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Posao } from './models/Posao';
import { Predmet } from './models/Predmet';
import { Parcela } from './models/Parcela';
import { Klijent } from './models/Klijent';
import { Observable } from 'rxjs';
import { Plati } from './models/Plati';
import { Katastar } from './models/Katastar';

@Injectable({
  providedIn: 'root'
})
export class PredmetService {
  uri = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  getAllPredmeti() {
    return this.http.get<Predmet[]>(`${this.uri}/predmeti`);
  }

  izbrisiPredmet(id: number) {
    return this.http.delete(`${this.uri}/predmeti/izbrisi/${id}`);
  }

  zavrsiPredmet(id: number) {
    return this.http.post<Predmet>(`${this.uri}/predmet/zavrsi/${id}`,null);
  }

  dodajPredmet(predmet1:Predmet) {
    const data = {
      predmet:predmet1,
      parcela: predmet1.parcela,
      klijent: predmet1.klijent,
     
    };

    return this.http.post<Predmet>(`${this.uri}/predmeti/dodaj`, data);
  }

  promeniPredmet(p: Predmet) {
    const data = {
      id: p.id,
      cena: p.cena,
      klijent: p.klijent,
      parcela: p.parcela,
      datum: p.datum,
      posao: p.posao,
      status: 'nije zavrsen'
    };

    return this.http.post<Predmet>(`${this.uri}/predmeti/promeni`, data);
  }

  platiPredemt(idPredmeta: number, iznos: number,napomena:string) {
    const params = { idPredmeta: idPredmeta.toString(), iznos: iznos.toString(),napomena };


    return this.http.post<any>(`${this.uri}/predmet/plati`, null, { params });
  }
  placanjaPredmet(idPredmet: number): Observable<Plati[]> {
    return this.http.get<Plati[]>(`${this.uri}/predmet/placanja/${idPredmet}`);
  }

  getKatastarByPredmet(idPredmet: number): Observable<Katastar[]> {
    return this.http.get<Katastar[]>(`${this.uri}/predmet/katastar/${idPredmet}`);
  }


}
