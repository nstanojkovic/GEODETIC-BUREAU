import { Predmet } from './Predmet';

export class Katastar {
    id: number;
    predmet: Predmet;
    datum_kat: Date;
    podaci: Array<number>;
    br_predmeta: string;
    troskovi: number;
    datum_placanja: Date;

    constructor() {
        this.id = 0;
        this.predmet = null;
        this.datum_kat = null;
        this.podaci =null;
        this.br_predmeta = '';
        this.troskovi = null;
        this.datum_placanja = null;
    }
}
