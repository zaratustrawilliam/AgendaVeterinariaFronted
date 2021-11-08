import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Mascota } from 'src/app/feature/mascota/shared/model/Mascota';
import { MascotasService } from 'src/app/feature/mascota/shared/service/mascotas.service';
import { DtoAgenda } from '../../share/model/DtoAgenda';
import { DtoFechasDisponibles } from '../../share/model/DtoFechasDisponibles';
import { HoraItem } from '../../share/model/HoraItem';
import { AgendaService } from '../../share/service/agenda.service';

const TIPO_SELECCION_INGRESAR_FECHA = '1';
const TIPO_SELECCION_AUTOMATICA =  '2';
const MESES = {'ENERO': 0,'FEBRERO':1,'MARZO':2,'ABRIL':3,'MAYO':4,'JUNIO':5,
               'JULIO':6,'AGOSTO':7,'OCTUBRE':9,'NOVIEMBRE':10,'DICIEMBRE':11};

@Component({
    selector:'app-crearagenda',
    templateUrl:'crear-agenda.component.html',
    styleUrls:['crear-agenda.component.sass']
})
export class CrearAgendaComponent implements OnInit{
    
    modoActualizar : boolean;
    agendaForm : FormGroup;
    listaMascotas : Array<Mascota>;
    parametroAgenda : number;
    listaHoras : Array<HoraItem>;
    tipoSeleccion : string;
    fechaHoraCalculada : string;
    fechaHoraCal : DtoFechasDisponibles;

    constructor(protected servicioMascotas : MascotasService,
        protected route :Router,protected userService : AuthService,
        private rutaActiva: ActivatedRoute,protected servicioAgenda:AgendaService){}

    ngOnInit(): void {
        this.modoActualizar = false;
        this.listaMascotas = [];
        this.construirFormularioAgenda();
        this.listaHoras = this.servicioAgenda.listarItemsDeHoras();
        this.fechaHoraCalculada = '';
        this.tipoSeleccion = TIPO_SELECCION_INGRESAR_FECHA;

        this.rutaActiva.params.subscribe((params: Params) => this.parametroAgenda = params['idAgenda']);

        this.servicioMascotas.consultarMascotasPorUsuario(this.userService._getUUIDUsuario())
        .subscribe(lista=>{
            this.listaMascotas = lista;
            if(this.parametroAgenda != null){
                this.modoActualizar = true;
                this.actualizarFormulario();
            }
        });
    }

    nombreComponente():string{ 
        return  (!this.modoActualizar ? 'Crear Agenda' : 'Actualizar Agenda');
    }

    actualizar(){
        let fecha = new Date();
        const indexObjeto = 2;
        let valoresFecha = this.agendaForm.value.fecha.split('-');
        fecha.setFullYear(parseInt(valoresFecha[0],10),parseInt(valoresFecha[1],10),
        parseInt(valoresFecha[indexObjeto],10));
        fecha.setUTCHours(this.agendaForm.value.horas,0,0,0);
        let agenda = new DtoAgenda(this.parametroAgenda,this.agendaForm.get('mascotas').value,
        this.formatearFechaIso(fecha.toISOString()),null,this.agendaForm.get('direccion').value);

        this.servicioAgenda.actualizarAgenda(agenda).subscribe(
            () =>{
                this.route.navigate(['agenda','listar']);
            });
    }

    crear(){
        let fecha = new Date();
        const indexObjeto = 2;
        if(this.tipoSeleccion === TIPO_SELECCION_INGRESAR_FECHA){
            let valoresFecha = this.agendaForm.value.fecha.split('-');
            fecha.setFullYear(parseInt(valoresFecha[0],10),parseInt(valoresFecha[1],10) - 1,
            parseInt(valoresFecha[indexObjeto],10));
            fecha.setUTCHours(this.agendaForm.value.horas,0,0,0);
        }else if(this.tipoSeleccion ===TIPO_SELECCION_AUTOMATICA){
            fecha.setFullYear(parseInt(this.fechaHoraCal.anio,10),
            MESES[this.fechaHoraCal.mes.toUpperCase()],parseInt(this.fechaHoraCal.dia,10));
            let hora = this.fechaHoraCal.hora.split(':')[0];
            fecha.setUTCHours(parseInt(hora,10));
        }
 
        let agenda = new DtoAgenda(null,this.agendaForm.get('mascotas').value,
        this.formatearFechaIso(fecha.toISOString()),null,this.agendaForm.get('direccion').value);

        this.servicioAgenda.crearAgenda(agenda).subscribe(
            () =>{
                this.route.navigate(['agenda','listar'])
            }
        );
    }

    private construirFormularioAgenda(){
        this.agendaForm = new FormGroup({
            mascotas : new FormControl('',[Validators.required]),
            fecha: new FormControl('',[Validators.required]),
            direccion: new FormControl('',[]),
            horas:new FormControl('',[])
        });
    }

    private calcularFechaAutomatica(){
        this.servicioAgenda.consultarAgendaDisponiblePorRango(new Date(),1)
        .subscribe(lista=>{
            let fechaDisponible = lista[0];
            this.fechaHoraCal = lista[0];
            this.fechaHoraCalculada = this.formatearFecha(fechaDisponible);
        });
    }

    private formatearFecha(fechaDisponible :DtoFechasDisponibles) :string{
        let salida = fechaDisponible.anio.concat('-');
        salida = salida.concat(fechaDisponible.mes.concat('-'));
        salida = salida.concat(fechaDisponible.dia.concat(' '));
        salida = salida.concat(fechaDisponible.hora);
        return salida;
    }

    handleChange(){ 
        this.calcularFechaAutomatica();
    } 
    
    private formatearFechaIso(fecha : string):string{
        fecha = fecha.replace('T',' ');
        fecha = fecha.substring(0,fecha.indexOf('.'));
        return fecha;
    }

    private convertirFechaPicker(fecha : string):string{
        const anio = 2;
        const mes = 1;
        const dia = 0;
        let fechaPartida = fecha.split('/');
        let valorMes_MM = fechaPartida[mes].length === 1 ? '0'.concat(fechaPartida[mes]) :  fechaPartida[mes];
        let valorDia_DD = fechaPartida[dia].length === 1 ? '0'.concat(fechaPartida[dia]) :  fechaPartida[dia];
        return `${fechaPartida[anio]}-${valorMes_MM}-${valorDia_DD}`;
    }

    private actualizarFormulario(){
        this.servicioAgenda.consultarAgendasPorUsuario(this.userService._getUUIDUsuario())
        .subscribe(lista=>{
            lista.forEach( item => {
                if(item.id == this.parametroAgenda){
                    item.fechaAgenda = new Date(item.fechaAgenda);
                    this.agendaForm.get('mascotas').setValue(item.idMascota);
                    this.agendaForm.get('horas').setValue(item.fechaAgenda.getHours());
                    this.agendaForm.get('fecha').setValue(this.convertirFechaPicker(item.fechaAgenda.toLocaleDateString()));
                    this.agendaForm.get('direccion').setValue(item.direccionMascota);
                }
            })
        });
    }
    
}
