import { Klijent } from "./Klijent";
import { Parcela } from "./Parcela";
import { Posao } from "./Posao";

export class Predmet {
    id: number;
    parcela: Parcela;
    klijent: Klijent;
    posao: Posao;
    datum: Date;
    cena: number;
    dug: number;
    zavrsen: boolean;

    constructor() {
        this.id = 0;
        this.posao = { id: 0, naziv: '' };
        this.klijent = {
            id: 18,
            ime: '',
            imeOca: '',
            prezime: '',
            jmbg: '',
            brlk: '',
            pribivaliste: '',
            telefon: ''
        };
        this.parcela = {
            id: 0,
            brKatParcele: '',
            katOpstina: '',
            opstina: '',
            ln: null
        };
        this.cena = null;
        this.datum = null;
        this.zavrsen = false;
        this.dug = 0;
    }
}
