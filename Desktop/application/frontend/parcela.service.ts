import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parcela } from './models/Parcela';
import { Observable } from 'rxjs';
import { Predmet } from './models/Predmet';

@Injectable({
  providedIn: 'root'
})
export class ParcelaService {
  uri = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllParcele() {
    return this.http.get(`${this.uri}/parcele`);
  }

  uploadPdf(file: File,id) {
    const formData = new FormData();
    formData.append('file', file);
      formData.append('id', id);

    return this.http.post<any>(`${this.uri}/parcele/promeni`, formData);
  }

  promeniParcelu( p:Parcela){

    const data = {
      id:p.id,
      ln: p.ln,
      brKatParcele: p.brKatParcele,
      katOpstina: p.katOpstina,
      opstina: p.opstina
      
    }    

    return this.http.post<Parcela>(`${this.uri}/parcele/promenisve`, data);

  }

  dodajParcelu( p:Parcela){

    const data = {
      
      brKatParcele:p.brKatParcele,
      katOpstina:p.katOpstina,
      opstina:p.opstina,
      ln:p.ln
      
    }    

    return this.http.post<Parcela>(`${this.uri}/parcele/dodaj`, data);

  }
  

  downloadPdf(id: number) {
    return this.http.get(`${this.uri}/parcele/getpdf/${id}`, { responseType: 'arraybuffer' });
  }



  izbrisiParcelu(id:number){
    
    return this.http.delete(`${this.uri}/parcele/izbrisi/${id}`, );
  }




  getPredmetiParcela(id: number): Observable<Predmet[]> {
    return this.http.get<Predmet[]>(`${this.uri}/${id}/parcela/predmeti`);
  }
}
