export class Komentar {
    id: number;
    ime: string;
    prezime: string;
    poruka: string;
    ocena: number;
    datum: Date;
  
    constructor() {
      this.id = 0;
      this.ime = '';
      this.prezime = '';
      this.poruka = '';
      this.ocena = 0;
      this.datum = new Date(); // Initialize with the current date
    }
  }
  