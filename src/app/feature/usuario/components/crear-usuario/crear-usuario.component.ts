import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "../../shared/service/usuario.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "@core/services/auth.service";
import { Router } from "@angular/router";
import { Usuario } from "../../shared/model/usuario";

const LONGITUD_MINIMA_CONTRASENIA = 4;

@Component({
    selector:'app-crear-usuario',
    templateUrl:'./crear-usuario.component.html',
    styleUrls:['./crear-usuario.component.sass']
})
export class CrearUsuarioComponent implements OnInit{
    usuarioForm : FormGroup;
    actualizarUsuario : boolean = false;

    usuarioActaulizar :Usuario;

    constructor(protected usuarioServicio : UsuarioService,
        protected authService :AuthService,private router :Router){
        }

    ngOnInit(): void {
        this.construirFormularioUsuario();
        if(this.authService.statusLogged()){
            this.actualizarUsuario = true;
            this.usuarioServicio.consultarUsuarioPorId(this.authService._getUUIDUsuario())
        .subscribe( usuario => {
            this.usuarioActaulizar = usuario;
            this.rellenarFormularioUsuario();
        }, error=>{
            console.log(error);
        });
        }
    }

    crear(){
        this.usuarioServicio.crear(this.usuarioForm.value).subscribe(
            res=>{
                this.authService.registrarUsuario(this.usuarioForm.value.nombre,
                    res);
                    this.router.navigate(['home']);
            },error=>{
                console.log(error);
                alert(error);
            }
        );
    }

    actualizar(){
        this.usuarioActaulizar.clave = this.usuarioForm.value.clave;
        this.usuarioActaulizar.nombre = this.usuarioForm.value.nombre;
        this.usuarioServicio.actualizarUsuario(this.usuarioActaulizar)
        .subscribe(
            ()=>{
                this.authService.registrarUsuario(this.usuarioActaulizar.nombre,
                    this.usuarioActaulizar.id);
                    this.router.navigate(['usuario','perfil']);
            },error=>{
                console.log(error);
                alert(error);
            }
        )
    }

    private construirFormularioUsuario(){
        this.usuarioForm = new FormGroup({
            nombre : new FormControl('',[Validators.required]),
            clave : new FormControl('',[Validators.required,
            Validators.minLength(LONGITUD_MINIMA_CONTRASENIA)])
        });
    }

    private rellenarFormularioUsuario(){
        this.usuarioForm.get('nombre').setValue(this.usuarioActaulizar.nombre);
        this.usuarioForm.get('clave').setValue(this.usuarioActaulizar.clave);
    }

    nombreComponente():string{ 
        return  (!this.actualizarUsuario ? "Crear usuario" : "Actualizar Usuario");
    }
    
}