import { TipoAlerta } from './TipoAlerta';

export class Alerta{
    tipoAlerta : TipoAlerta;
    mensaje : string;
    activa : boolean;

    constructor(tipoAlerta : TipoAlerta, mensaje : string){
        this.tipoAlerta = tipoAlerta;
        this.mensaje = mensaje;
        this.activa = mensaje == null ? false : true;
    }
}