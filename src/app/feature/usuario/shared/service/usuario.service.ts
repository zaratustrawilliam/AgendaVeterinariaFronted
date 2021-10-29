import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';

@Injectable()
export class UsuarioService {
    constructor(protected http:HttpService){}

    public crear(usuario : Usuario){
        return this.http.doPost<Usuario,Number>(`${environment.endpoint}/usuarios`,
        usuario);
    }

    consultarUsuarioPorId(idUsuario: Number){
        return this.http.doGet<Usuario>(`${environment.endpoint}/usuarios/${idUsuario}`);
    }

    eliminarUsuario(idUsuario : Number){
        return this.http.doDelete<VoidFunction>(`${environment.endpoint}/usuarios/${idUsuario}`);
    }

    actualizarUsuario(usuario : Usuario){
        return this.http.doPut<Usuario,VoidFunction>(`${environment.endpoint}/usuarios/${usuario.id}`,
        usuario);
    }
}