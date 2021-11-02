import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { DtoValor } from '@core/modelo/DtoValor';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';

@Injectable()
export class UsuarioService {
    constructor(protected http:HttpService){}

    public crear(usuario : Usuario){
        return this.http.doPost<Usuario,DtoValor>(`${environment.endpoint}/usuarios`,
        usuario);
    }

    consultarUsuarioPorId(idUsuario: number){
        return this.http.doGet<Usuario>(`${environment.endpoint}/usuarios/${idUsuario}`);
    }

    eliminarUsuario(idUsuario : number){
        return this.http.doDelete<VoidFunction>(`${environment.endpoint}/usuarios/${idUsuario}`);
    }

    actualizarUsuario(usuario : Usuario){
        return this.http.doPut<Usuario,VoidFunction>(`${environment.endpoint}/usuarios/${usuario.id}`,
        usuario);
    }
}
