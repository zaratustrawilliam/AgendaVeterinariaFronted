import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component(
    {
        selector:'app-baseusuario',
        templateUrl:'./base-usuario.component.html',
        styleUrls:[]
    }
)
export class BaseUsuarioComponent implements OnInit{

    constructor(public router : Router){}
    
    ngOnInit(): void {
        if(this.router.url.endsWith('usuario')){
            this.router.navigate(['usuario','perfil']);
        }
    }
    
}
