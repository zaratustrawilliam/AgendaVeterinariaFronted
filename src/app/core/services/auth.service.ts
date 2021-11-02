import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { DtoUsuario } from '@core/modelo/Dtousuario';

@Injectable()
export class AuthService{

    private isLoggedIn: boolean;
    private userName: string;
    private idUsuario : number;

    constructor(private http: HttpService){
        this.isLoggedIn=false;
    }

    registrarUsuario(usuario:string,idUsuario:number){
        this.userName = usuario;
        this.idUsuario = idUsuario;
        this.isLoggedIn = true;       
    }

    async login(usuario:string,clave:string):Promise<boolean>{
           
        this.isLoggedIn = await this.loginPromise(usuario,clave);
        return this.isLoggedIn;
    }

    private async loginPromise(usuario:string,clave:string):Promise<boolean>{
        return new Promise((resolve,reject)=>{

            this.http.doGet<DtoUsuario[]>(`${environment.endpoint}/usuarios`)
            .subscribe(consultaDao=>{ 
                if(this.validarExistenciaUsuario(usuario,clave,consultaDao)){
                    this.userName = usuario;
                    resolve(true);
                }else{
                    reject(false);
                }
            },
                error=>{
                    reject(error);
            });
        })
    }

    private validarExistenciaUsuario(user:string,clave:string,listaUsuarios : Array<DtoUsuario>) : boolean{
        let usuarios : Array<DtoUsuario> = listaUsuarios;
        let existe : boolean = false;
        usuarios.forEach(usuario =>{ if(usuario.nombre === user && usuario.clave === clave){
            existe = true;
            this.idUsuario = usuario.id;
        }});
        return existe;
    }

    statusLogged():boolean{
        return this.isLoggedIn;
    }

    logoutUser(){
        this.isLoggedIn=false;
        this.idUsuario = null;
        this.userName = null;
    }

    _getUserName():string{
        return this.userName;
    }

    _getUUIDUsuario():number{
        return this.idUsuario;
    }
}
