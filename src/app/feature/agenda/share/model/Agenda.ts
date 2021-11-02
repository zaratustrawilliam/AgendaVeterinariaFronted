export class Agenda{
    id:number;
    idMascota:number;
    fechaAgenda:Date;
    precio:number;
    direccionMascota:string;

    constructor(id:number,idMascota:number,fechaAgenda:Date,
        precio:number,direccionMascota:string){
        this.id =id;
        this.idMascota=idMascota;
        this.fechaAgenda=fechaAgenda;
        this.precio=precio;
        this.direccionMascota=direccionMascota;
    }
}

