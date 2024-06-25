import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/User';
import { Predmet } from './models/Predmet';
import { Teren } from './models/Teren';

@Injectable({
  providedIn: 'root'
})
export class TerenService {
  uri = 'http://localhost:8080'

  constructor(private http:HttpClient) { }

  addTeren(radnik1:User, predmet1:Predmet){

    const data = {

      radnik: radnik1,
      predmet: predmet1
    }    

    return this.http.post<Teren>(`${this.uri}/teren`, data);

  }

  getAllTereni(){
    return this.http.get(`${this.uri}/tereni`)
  }


}
