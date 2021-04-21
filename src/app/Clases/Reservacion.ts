export class Reservacion{
    public id:number;
    public finicio:string;
    public hinicio:string;
    public ffin:string;
    public hfin:string;
    public monto:number;

    constructor(pid:number,finicio:string,hinicio:string,ffin:string,hfin:string,pmonto:number){
        this.id=pid;
        this.finicio=finicio;
        this.hinicio=hinicio;
        this.ffin=ffin;
        this.hfin=hfin;
        this.monto=pmonto;
    }
}