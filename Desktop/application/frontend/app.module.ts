import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatTableModule } from '@angular/material/table'
import { MatSelectModule } from '@angular/material/select'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatExpansionModule } from '@angular/material/expansion';
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
import { BlagajnaComponent } from './blagajna/blagajna.component'
import { OnlyNumbersAndSlashDirective } from './onlyNumbersAndSlash.directive';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    RegisterUserComponent,
    MeniComponent,
    HeaderComponent,
    PosloviComponent,
    RadnikComponent,
    KlijentiComponent,
    ParceleComponent,
    KatastarComponent,
    PredmetiComponent,
    BlagajnaComponent,
    OnlyNumbersAndSlashDirective
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,     
    MatListModule,
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

