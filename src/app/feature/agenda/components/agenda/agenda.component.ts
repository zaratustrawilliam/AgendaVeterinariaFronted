import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector:'app-agenda',
    templateUrl:'./agenda.component.html',
    styleUrls:[]
})
export class AgendaComponent implements OnInit{
    
    constructor(protected router:Router){
    }
    
    ngOnInit(): void {
        if(this.router.url.endsWith('agenda')){
            this.router.navigate(['agenda','listar']);
        }
    }
    
}