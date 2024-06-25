import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent {

  constructor(private userService: UserService, private router: Router){}



  radnici:User[]
  user:User
  ngOnInit(): void{
    if (localStorage.getItem('User')) {

      this.user = JSON.parse(localStorage.getItem('User'));

    }
    else{
      this.router.navigate[('')]
    }

    this.sviRadnici()

  }

  sviRadnici(){
    this.userService.getAllRadnici().subscribe((data:User[])=>{
          this.radnici=data
    })
  }

  optpustiRadnika(id: number) {
    if (confirm("Da li ste sigurni da želite da otpustite radnika?")) {
      this.userService.otpustiUsera(id).subscribe((data) => {
        if (data) {
          alert("Radnik je uspešno otpušten.");
          window.location.reload();
        }
      }, error => {
        //alert("Došlo je do greške prilikom otpuštanja radnika.");
      });
      window.location.reload();
    }
  }
  

}
