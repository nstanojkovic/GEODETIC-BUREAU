import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/User';
import { Observable } from 'rxjs';
import { Zahtev } from './models/Zahtev';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  uri = 'http://localhost:8080'

  constructor(private http:HttpClient) { }

  register(usernameForm, passwordForm, firstnameForm, lastnameForm){

    const data = {

      username: usernameForm,
      password: passwordForm,
      firstname: firstnameForm,
      lastname: lastnameForm,
      fired:false,
      admin:false
    }    

    return this.http.post<User>(`${this.uri}/user`, data);

  }

  

  sendRequest(usernameForm, passwordForm, firstnameForm, lastnameForm){

    const data = {

      username: usernameForm,
      password: passwordForm,
      firstname: firstnameForm,
      lastname: lastnameForm
    }    

    return this.http.post<User>(`${this.uri}/zahtev/dodaj`, data);

  }

  userUpdate(user:User){

    const data = {
      userID:user.userID,
      username: user.username,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
      fired:user.fired,
      admin:user.admin
    }    

    return this.http.post(`${this.uri}/user/promeni`, data);

  }


  //prihvatanje zahteva za registraciju i brisanje korisnika 
  acceptRequest(zahtevId: number): Observable<User> {
    const url = `${this.uri}/zahtev/prihvati/${zahtevId}`;
    return this.http.post<User>(url, null);
  }

  
  otpustiUsera(id:number){
    
    return this.http.post(`${this.uri}/user/otpusti/${id}`,null );
  }


  removeRequest(id:number){
    
    return this.http.delete(`${this.uri}/zahtev/izbrisi/${id}`, );
  }




  login(usernameForm, passwordForm){
            
    let queryParams = new HttpParams();        
    queryParams = queryParams.append("username", usernameForm)
    queryParams = queryParams.append("password", passwordForm)    

    return this.http.get<User>(`${this.uri}/login`, {params: queryParams})
  }

  getAllRadnici(){
    return this.http.get(`${this.uri}/radnici`)
  }

  getAllZahtevi(){
    return this.http.get(`${this.uri}/zahtevi`)
  }


  
}
