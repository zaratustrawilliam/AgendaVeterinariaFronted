import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.sass']
})
export class LoginComponent implements OnInit{

    nombre:string;
    clave:string;

    constructor(public router :Router,private authService:AuthService){}

    ngOnInit(): void {
    }

    logIn(){
        this.authService.login(this.nombre,this.clave).then(() =>{
            this.router.navigate(['home']);
        },()=>{
            alert('Usuario no existe o clave incorrecta');
        });
    }
    
}
