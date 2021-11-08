import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertaService } from '@core/services/alerta.service';
import { AuthService } from '@core/services/auth.service';

@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.sass']
})
export class LoginComponent implements OnInit{

    nombre:string;
    clave:string;

    constructor(public router :Router,private authService:AuthService,
        private alerta : AlertaService){}

    ngOnInit(): void {
    }

    logIn(){
        this.authService.login(this.nombre,this.clave).then(() =>{
            this.router.navigate(['home']);
        },()=>{
            this.alerta.error('Usuario no existe o clave incorrecta');
        });
    }
    
}
