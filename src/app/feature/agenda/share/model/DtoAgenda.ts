export class DtoAgenda{
    id:Number;
    idMascota:Number;
    fechaAgenda:string;
    precio:Number;
    direccionMascota:string;

    constructor(id:Number,idMascota:Number,fechaAgenda:string,
        precio:Number,direccionMascota:string){
        this.id =id;
        this.idMascota=idMascota;
        this.fechaAgenda=fechaAgenda;
        this.precio=precio;
        this.direccionMascota=direccionMascota;
    }
}