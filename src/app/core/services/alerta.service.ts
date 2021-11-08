import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Alerta } from '@core/modelo/Alerta';
import { TipoAlerta } from '@core/modelo/TipoAlerta';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class AlertaService{

    private subject = new Subject<Alerta>();

    constructor(private router: Router) {
         
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.subject.next(new Alerta(null,null));
            }
        });
    }

    exito(mensaje:string){
        this.alerta(new Alerta(TipoAlerta.Exito,mensaje));
    }

    informativo(mensaje:string){
        this.alerta(new Alerta(TipoAlerta.Informativo,mensaje));
    }

    error(mensaje:string){
        this.alerta(new Alerta(TipoAlerta.Error,mensaje));
    }

    alerta(alerta : Alerta){
        this.subject.next(alerta);
    }

    mostrarAlerta():Observable<Alerta>{
        return this.subject.asObservable();
    }

}