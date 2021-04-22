export class Users{
    public Id:number;
    public nombre:string;
    public paterno:string;
    public materno:string;
    public correo:string;
    public password:string;

    constructor(Id:number,nombre:string,paterno:string,materno:string,correo:string,password:string){
        this.Id = Id;
        this.nombre=nombre;
        this.paterno=paterno;
        this.materno=materno;
        this.correo=correo;
        this.password=password;
    }
}
