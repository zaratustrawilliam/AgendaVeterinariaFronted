import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-mascotas',
    templateUrl:'./mascota.component.html',
    styleUrls: []
})
export class MascotasComponent implements OnInit{

    constructor(private router : Router){}

    ngOnInit(): void {
        if(this.router.url.endsWith('mascota')){
            this.router.navigate(['mascota','listar']);
        }
    }
    
}
