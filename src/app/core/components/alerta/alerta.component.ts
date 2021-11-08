import { Component, OnInit } from '@angular/core';
import { Alerta } from '@core/modelo/Alerta';
import { TipoAlerta } from '@core/modelo/TipoAlerta';
import { AlertaService } from '@core/services/alerta.service';

@Component({
    selector:'app-alerta',
    templateUrl:'alerta.component.html',
    styles:['']
})
export class AlertaComponent implements OnInit{

    alerta :Alerta;

    constructor(private servicioAlerta : AlertaService){
    }

    ngOnInit(): void {
        this.servicioAlerta.mostrarAlerta().subscribe((alerta)=>{
            this.alerta = alerta;
        });
    }

    eliminar(){
        this.alerta = new Alerta(null,null);
    }

    cssClass(alert: Alerta) {
        switch (alert.tipoAlerta) {
            case TipoAlerta.Exito:
                return 'alert alert-success';
            case TipoAlerta.Error:
                return 'alert alert-danger';
            case TipoAlerta.Informativo:
                return 'alert alert-info';
        }
    }
    
}