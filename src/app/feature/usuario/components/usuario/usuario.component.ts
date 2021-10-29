import { Component,OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@core/services/auth.service";
import { Usuario } from "../../shared/model/usuario";
import { UsuarioService } from "../../shared/service/usuario.service";

@Component(
    {
        selector:'app-usuario',
        templateUrl:'./usuario.component.html',
        styleUrls:['./usuario.component.sass']
    }
)
export class UsuarioComponent implements OnInit{

    mostrarOpciones : boolean;
    usuario : Usuario;
    
    constructor(protected authUser:AuthService,protected usuarioServicio:UsuarioService,
        private router :Router ){
        }
    
    ngOnInit(): void {
        //falsa inicializacion
        this.usuario = new Usuario(-1,'','',null);

        this.mostrarOpciones = this.authUser.statusLogged();
        this.usuarioServicio.consultarUsuarioPorId(this.authUser._getUUIDUsuario())
        .subscribe( usuario => {
            this.usuario = usuario;
        }, error=>{
            console.log(error);
        });
    }

    cerrarCesion(){
        this.authUser.logoutUser();
        this.router.navigate(['login']);
    }

    eliminarUsuario(){
        this.usuarioServicio.eliminarUsuario(this.authUser._getUUIDUsuario())
        .subscribe(() => {
            this.authUser.logoutUser();
            this.router.navigate(['login']);
        },error =>{
            alert(error);
        })
    }

    actualizarUsuario(){
        this.router.navigate(['usuario','crear']);
    }
    
}