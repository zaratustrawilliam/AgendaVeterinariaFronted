import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Agenda } from '../model/Agenda';
import { DtoAgenda } from '../model/DtoAgenda';
import { DtoFechasDisponibles } from '../model/DtoFechasDisponibles';
import { HoraItem } from '../model/HoraItem';

const HORA_INICIO_JORNADA_LABORAL = 7;
const HORA_FINALIZACION_JORNADA_LABORAL = 17;
const CERO = "0";
const FORMATO_HORA = ":00 ";
const AM = "AM";
const FM = "FM";

@Injectable()
export class AgendaService {

    constructor(protected http:HttpService){}

    public consultarAgendasPorUsuario(idUsuario : number){
        return this.http.doGet<Array<Agenda>>(`${environment.endpoint}/agendas/${idUsuario}`);
    }

    public consultarAgendaDisponiblePorRango(fechaConsulta:Date,registros:number){

        const params = new HttpParams()
        .set('fecha',fechaConsulta.toISOString())
        .set('registros',registros.toString());
        return this.http.doGet<Array<DtoFechasDisponibles>>(`${environment.endpoint}/agendas/disponibilidad`,
        {params});
    }

    public crearAgenda(agenda:DtoAgenda){
        return this.http.doPost<DtoAgenda,number>(`${environment.endpoint}/agendas`,agenda);
    }

    public actualizarAgenda(agenda:DtoAgenda){
        return this.http.doPut<DtoAgenda,VoidFunction>(`${environment.endpoint}/agendas`,agenda);
    }

    public eliminarAgenda(idAgenda:number){
        return this.http.doDelete<VoidFunction>(`${environment.endpoint}/agendas/${idAgenda}`);
    }

    public listarItemsDeHoras():Array<HoraItem>{
        let listaHoras = new Array<HoraItem>();
        let horaBalanceada = 0;
        for (let index = HORA_INICIO_JORNADA_LABORAL; index <= HORA_FINALIZACION_JORNADA_LABORAL; index++) {
            horaBalanceada = index > 12 ? index - 12 : index;
            let hora = horaBalanceada >= 10 ? horaBalanceada.toString() : CERO.concat(horaBalanceada.toString());
            let jornada = index > 12 ? FM : AM;
            listaHoras.push(new HoraItem(index,hora.concat(FORMATO_HORA).concat(jornada)));           
        }
        return listaHoras;
    }
}