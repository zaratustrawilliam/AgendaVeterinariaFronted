export class DtoMascota{
    id : number;
    nombre :string;
    usuario : number;
    tipoMascota : number;

    constructor(id:number,nombre : string,usuario:number,tipoMascota:number){
        this.id=id;
        this.nombre=nombre;
        this.usuario=usuario;
        this.tipoMascota=tipoMascota;
    }
}
