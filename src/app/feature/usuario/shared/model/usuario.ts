export class Usuario{
    id: Number;
    nombre : string;
    clave : string;
    fechaCreacion : Date;

    constructor(id:Number,nombre:string,clave:string,fechaCreacion:Date){
        this.id = id;
        this.nombre = nombre;
        this.clave = clave;
        this.fechaCreacion=fechaCreacion;
    }

}