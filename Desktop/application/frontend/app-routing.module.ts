import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { RegisterUserComponent } from './register/register-user.component';
import { MeniComponent } from './meni/meni.component';
import { HeaderComponent } from './header/header.component';
import { PosloviComponent } from './poslovi/poslovi.component';
import { RadnikComponent } from './radnik/radnik.component';
import { KlijentiComponent } from './klijenti/klijenti.component';
import { ParceleComponent } from './parcele/parcele.component';
import { KatastarComponent } from './katastar/katastar.component';
import { PredmetiComponent } from './predmeti/predmeti.component';
import { BlagajnaComponent } from './blagajna/blagajna.component';



const routes: Routes = [
  {path: "", component: MainComponent},
  {path: "registerUser", component: RegisterUserComponent},
  {path: "login", component: LoginComponent},
  {path: "meni", component: MeniComponent},
  {path: "header", component: HeaderComponent},
  {path: "poslovi", component: PosloviComponent},
  {path: "radnici", component: RadnikComponent},
  {path: "klijenti", component: KlijentiComponent},
  {path: "parcele", component: ParceleComponent},
  {path: "katastar", component: KatastarComponent},
  {path: "predmeti", component: PredmetiComponent},
  {path: "blagajna", component: BlagajnaComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
