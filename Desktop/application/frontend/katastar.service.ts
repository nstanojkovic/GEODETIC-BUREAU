import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Katastar } from './models/Katastar';
import { Predmet } from './models/Predmet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KatastarService {
  uri = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getAllKatastar() {
    return this.http.get(`${this.uri}/katastri`);
  }



  uploadPdf(file: File,id) {
    const formData = new FormData();
    formData.append('file', file);
      formData.append('id', id);

    return this.http.post<any>(`${this.uri}/katastar/promeni`, formData);
  }

  promeniKatastar(k: Katastar) {
    const data = {

      id:k.id,
      predmet:k.predmet,
      datum_kat:k.datum_kat,
      podaci:k.podaci,
      br_predmeta:k.br_predmeta,
      troskovi:k.troskovi,
      datum_placanja:k.datum_placanja
      
    }     

    return this.http.post<Katastar>(`${this.uri}/katastar/promenisve`, data);
  }
  

  downloadPdf(id: number) {
    return this.http.get(`${this.uri}/katastar/getpdf/${id}`, { responseType: 'arraybuffer' });
  }


  dodajKatastar(k:Katastar){

    const data = {
      
      predmet:k.predmet,
      datum_kat:k.datum_kat,
      podaci:k.podaci,
      br_predmeta:k.br_predmeta,
      troskovi:k.troskovi,
      datum_placanja:k.datum_placanja
      
    }     

    return this.http.post<Katastar>(`${this.uri}/katastar/dodaj`, data);

  }




  plati(k: number) {
    let queryParams = new HttpParams().set("id", k.toString());

    return this.http.post<Katastar>(`${this.uri}/katastar/plati`, null, { params: queryParams });
}

izbrisiKatastar(id:number){
    
  return this.http.delete(`${this.uri}/katastar/izbrisi/${id}`, );
}



}
