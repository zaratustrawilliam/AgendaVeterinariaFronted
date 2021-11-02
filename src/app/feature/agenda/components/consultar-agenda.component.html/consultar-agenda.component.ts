import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Mascota } from 'src/app/feature/mascota/shared/model/Mascota';
import { MascotasService } from 'src/app/feature/mascota/shared/service/mascotas.service';
import { Agenda } from '../../share/model/Agenda';
import { AgendaService } from '../../share/service/agenda.service';

@Component({
    selector:'app-consultaragenda',
    templateUrl:'./consultar-agenda.component.html',
    styleUrls:['consultar-agenda.component.sass']
})
export class ConsultarAgendaComponent implements OnInit{

    listaAgendas : Array<Agenda>;
    listaMascotas : Array<Mascota>;
    
    constructor(private servicioMascota:MascotasService, private servicioAgenda:AgendaService,
        protected authServer:AuthService,private router:Router){}

    ngOnInit(): void {
        this.listaAgendas = [];
        this.listaMascotas= [];
        this.servicioAgenda.consultarAgendasPorUsuario(this.authServer._getUUIDUsuario())
        .subscribe(lista =>{
            this.listaAgendas = lista;
            this.consultarMaacotas();
        },error=>{
            alert(error);
        });
    }

    eliminarAgenda(indice : number){
        this.servicioAgenda.eliminarAgenda(this.listaAgendas[indice].id)
        .subscribe(()=>{
            this.listaAgendas.splice(indice,1);
        },error=>{
            alert(error);
        })
    }

    editarAgenda(idMascota:Number){
        this.router.navigate(['agenda','actualizar',idMascota]);
    }

    crearAgenda(){
        this.router.navigate(['agenda','crear']);
    }

    private consultarMaacotas(){
        this.servicioMascota.consultarMascotasPorUsuario(this.authServer._getUUIDUsuario())
        .subscribe( lista =>{
            this.listaMascotas = lista;
        }, error =>{
            console.error(error);
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

};