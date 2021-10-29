import { HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http.service";
import { environment } from "src/environments/environment";
import { Agenda } from "../model/Agenda";
import { DtoAgenda } from "../model/DtoAgenda";
import { DtoFechasDisponibles } from "../model/DtoFechasDisponibles";


@Injectable()
export class AgendaService {

    constructor(protected http:HttpService){}

    public consultarAgendasPorUsuario(idUsuario : Number){
        return this.http.doGet<Array<Agenda>>(`${environment.endpoint}/agendas/${idUsuario}`);
    }

    public consultarAgendaDisponiblePorRango(fechaConsulta:Date,registros:Number){

        const params = new HttpParams()
        .set('fecha',fechaConsulta.toISOString())
        .set('registros',registros.toString());
        return this.http.doGet<Array<DtoFechasDisponibles>>(`${environment.endpoint}/agendas/disponibilidad`,
        {params});
    }

    public crearAgenda(agenda:DtoAgenda){
        return this.http.doPost<DtoAgenda,Number>(`${environment.endpoint}/agendas`,agenda);
    }

    public actualizarAgenda(agenda:DtoAgenda){
        return this.http.doPut<DtoAgenda,VoidFunction>(`${environment.endpoint}/agendas`,agenda);
    }

    public eliminarAgenda(idAgenda:Number){
        return this.http.doDelete<VoidFunction>(`${environment.endpoint}/agendas/${idAgenda}`);
    }
}