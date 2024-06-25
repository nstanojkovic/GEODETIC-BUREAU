import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { KomentarService } from '../komentar.service';
import { Komentar } from '../models/Komentar';

declare var jQuery: any;
declare var WOW: any;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {

  komentar: Komentar = new Komentar();

  komentari: Komentar[] = [];
  stars: number[] = [1, 2, 3, 4, 5];
  constructor(private komentarService: KomentarService, private router: Router) { }


  size:number=0
  ngOnInit(): void {
    this.sviKomentari();
    this.size=this.komentari.length
    
  }

  ngAfterViewInit(): void {
    this.initializeJQueryFunctions();
    this.initializeOwlCarousel();

  }

  provera(id){

    
    if(this.size>=id)return true;
    return false
  }

  sviKomentari() {
    this.komentarService.getAllKomentari().subscribe((data: Komentar[]) => {
      this.komentari = data;
     
    });
  }

  initializeJQueryFunctions(): void {
    (function ($) {
      "use strict";

      // Spinner
      var spinner = function () {
        setTimeout(function () {
          if ($('#spinner').length > 0) {
            $('#spinner').removeClass('show');
          }
        }, 1);
      };
      spinner();

      // Initiate the wowjs
      new WOW().init();

      // Back to top button
      $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
          $('.back-to-top').fadeIn('slow');
        } else {
          $('.back-to-top').fadeOut('slow');
        }
      });
      $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
      });
    })(jQuery);
  }

  initializeOwlCarousel(): void {
    (function ($) {
      "use strict";

      // Testimonial carousel
      $('.testimonial-carousel').owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: true,
        dots: true,
        loop: true,
        margin: 0,
        nav: true,
        navText: false,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1
          },
          576: {
            items: 1
          },
          768: {
            items: 2
          },
          992: {
            items: 3
          }
        }
      });
    })(jQuery);
  }

  setRating(rating: number): void {
    this.komentar.ocena = rating;
  }

  proveraa:boolean=false
  
  dodajKomentar() {
    this.proveraa=true
    this.komentarService.dodajKomentar(
      this.komentar.ime,
      this.komentar.prezime,
      this.komentar.poruka,
      this.komentar.ocena
    ).subscribe(response => {
      console.log('Komentar uspesno dodat:', response);
      // Optional: Reset the form or give feedback to the user
      alert("Uspesno ostavljen komentar")
      this.komentar=new Komentar()
      window.location.reload()
      
    }, error => {
      console.error('Greska prilikom dodavanja komentara:', error);
      alert("Greska ne moze da se doda komentar")
    });
  }


  
}
