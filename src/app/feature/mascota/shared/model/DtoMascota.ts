export class DtoMascota{
    id : Number;
    nombre :string;
    usuario : Number;
    tipoMascota : Number;

    constructor(id:Number,nombre : string,usuario:Number,tipoMascota:Number){
        this.id=id;
        this.nombre=nombre;
        this.usuario=usuario;
        this.tipoMascota=tipoMascota;
    }
}