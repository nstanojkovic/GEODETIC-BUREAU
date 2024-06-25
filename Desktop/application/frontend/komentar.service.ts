import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Komentar } from './models/Komentar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KomentarService {

  uri = 'http://localhost:8080'

  constructor(private http:HttpClient) { }


  getAllKomentari(){
    return this.http.get(`${this.uri}/komentari`)
  }

  izbrisiKomentar(id:number){
    
    return this.http.delete(`${this.uri}/komentar/izbrisi/${id}`, );
  }

  dodajKomentar( firstnameForm, lastnameForm,messageForm,gradeForm,){

    const data = {
      ime: firstnameForm,
      prezime: lastnameForm,
      poruka: messageForm,
      ocena: gradeForm
    }    
    return this.http.post<Komentar>(`${this.uri}/komentar`, data);
  }
}
