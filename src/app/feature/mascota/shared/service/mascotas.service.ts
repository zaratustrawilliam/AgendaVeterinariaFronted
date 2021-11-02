import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { DtoMascota } from '../model/DtoMascota';
import { Mascota } from '../model/Mascota';
import { TipoMascota } from '../model/TipoMascota';

@Injectable()
export class MascotasService{

    constructor(protected http:HttpService){}

    public consultarTiposMascotas(){
        return this.http.doGet<Array<TipoMascota>>(`${environment.endpoint}/tiposmascotas`);
    }

    public consultarMascotasPorUsuario(idUsuario  :number){
        return this.http.doGet<Array<Mascota>>(`${environment.endpoint}/mascotas/${idUsuario}`);
    }

    public eliminarMascota(idMascota : number){
        return this.http.doDelete<VoidFunction>(`${environment.endpoint}/mascotas/${idMascota}`)
    }

    public crearMascota( dtoMascota : DtoMascota){
        return this.http.doPost<DtoMascota,number>(`${environment.endpoint}/mascotas`,dtoMascota);
    }

    public actualizarMascota( dtoMascota : DtoMascota){
        return this.http.doPut<DtoMascota,VoidFunction>(`${environment.endpoint}/mascotas`,dtoMascota);
    }
}