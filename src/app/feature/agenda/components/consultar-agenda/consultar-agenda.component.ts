import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HTTP_ERRORES_CODIGO } from '@core/interceptor/http-codigo-error';
import { AlertaService } from '@core/services/alerta.service';
import { AuthService } from '@core/services/auth.service';
import { Mascota } from 'src/app/feature/mascota/shared/model/Mascota';
import { MascotasService } from 'src/app/feature/mascota/shared/service/mascotas.service';
import { Agenda } from '../../share/model/Agenda';
import { AgendaService } from '../../share/service/agenda.service';

const HTTP_BAD_REQUEST = 400;

@Component({
    selector:'app-consultaragenda',
    templateUrl:'./consultar-agenda.component.html',
    styleUrls:['consultar-agenda.component.sass']
})
export class ConsultarAgendaComponent implements OnInit{

    listaAgendas : Array<Agenda>;
    listaMascotas : Array<Mascota>;
    
    constructor(private servicioMascota:MascotasService, private servicioAgenda:AgendaService,
        protected authServer:AuthService,private router:Router,private alerta : AlertaService){}

    ngOnInit(): void {
        this.listaAgendas = [];
        this.listaMascotas= [];
        this.servicioAgenda.consultarAgendasPorUsuario(this.authServer._getUUIDUsuario())
        .subscribe(lista =>{
            this.listaAgendas = lista;
            this.consultarMaacotas();
        });
    }

    eliminarAgenda(indice : number){
        this.servicioAgenda.eliminarAgenda(this.listaAgendas[indice].id)
        .subscribe(()=>{
            this.listaAgendas.splice(indice,1);
            this.alerta.exito('se elimino exitosamente');
        },error=>{
            this.alerta.error(error.status === HTTP_BAD_REQUEST ? error.error.mensaje : 
                HTTP_ERRORES_CODIGO.PETICION_FALLIDA);
        });
    }

    editarAgenda(idMascota:number){
        this.router.navigate(['agenda','actualizar',idMascota]);
    }

    crearAgenda(){
        this.router.navigate(['agenda','crear']);
    }

    private consultarMaacotas(){
        this.servicioMascota.consultarMascotasPorUsuario(this.authServer._getUUIDUsuario())
        .subscribe( lista =>{
            this.listaMascotas = lista;
        });
    }

    traerNombreMascota(idMascota : number):string{
        let salida = '';
        this.listaMascotas.forEach(item =>{
            if(item.id === idMascota){
                salida = item.nombre;
            }
        });
        return salida;
    }

}
