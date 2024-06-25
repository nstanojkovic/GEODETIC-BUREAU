export class Parcela{
    id: number
    brKatParcele:string
    katOpstina:string
    opstina:string
    ln: Array<number> // ili Array<number>

    constructor() {
        this.id = 0;
        this.brKatParcele = '';
        this.katOpstina = '';
        this.opstina = '';
        this.ln = null;
    }
    
}