export class DtoUsuario{
    id: number;
    nombre : string;
    clave : string;
    fechaCreacion : Date;

    constructor(id:number,nombre:string,clave:string,fechaCreacion:Date){
        this.id = id;
        this.nombre = nombre;
        this.clave = clave;
        this.fechaCreacion=fechaCreacion;
    }
};