import { Usuario } from 'src/app/feature/usuario/shared/model/usuario';
import { TipoMascota } from './TipoMascota';

export class Mascota{
    id: number;
    nombre :string;
    usuario : Usuario;
    tipoMascota :TipoMascota;

    constructor(id:number,nombre:string,usuario:Usuario,tipoMascota:TipoMascota){
        this.id=id;
        this.nombre=nombre;
        this.usuario=usuario;
        this.tipoMascota=tipoMascota;
    }
}
