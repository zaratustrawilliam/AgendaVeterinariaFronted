import { Component,OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@core/services/auth.service";

@Component({
    selector:'app-login',
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.sass']
})
export class LoginComponent implements OnInit{

    nombre:string;
    clave:string;

    constructor(private router :Router,private authService:AuthService){}

    ngOnInit(): void {
        if(this.authService.statusLogged){
            this.router.navigate(['home']); 
        }
    }

    logIn(){
        this.authService.login(this.nombre,this.clave).then(logIn =>{
            if(logIn){
                this.router.navigate(['home']);
            }
        },error=>{
            console.log(error);
            alert('Usuario no existe o clave incorrecta');
        });
    }
    
}