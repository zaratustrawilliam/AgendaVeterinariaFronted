import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Mascota } from '../../shared/model/Mascota';
import { TipoMascota } from '../../shared/model/TipoMascota';
import { MascotasService } from '../../shared/service/mascotas.service';

@Component({
    selector:'app-consultarmascota',
    templateUrl:'./consultar-mascota.component.html',
    styleUrls:['consultar-mascota.component.sass']
})
export class ConsultarMascotaComponent implements OnInit{
    
    listaMascotas : Array<Mascota>;
    listaTipoMascotas : Array<TipoMascota>;

    constructor(protected authServe :AuthService, public router :Router,
        private mascotaService: MascotasService){}
    
    ngOnInit(): void {
        
        this.listaTipoMascotas = [];
        this.listaMascotas = [];
        this.mascotaService.consultarMascotasPorUsuario(this.authServe._getUUIDUsuario())
        .subscribe( lista =>{
            this.listaMascotas = lista;
        });

        this.mascotaService.consultarTiposMascotas()
        .subscribe(tipos=>{
            this.listaTipoMascotas = tipos;
        });

    }

    public traerNombreTipoMascota(idTipoMascota : number):string{
        let salida = '';
        this.listaTipoMascotas.forEach(item =>{
            if(item.id === idTipoMascota){
                salida = item.nombre;
            }
        });
        return salida;
    }

    public eliminarMascota(indice : number){
        this.mascotaService.eliminarMascota(this.listaMascotas[indice].id)
        .subscribe(()=>{
            this.listaMascotas.splice(indice,1);
        });
    }

    public editarMascota(mascota : Mascota){
        this.router.navigate(['mascota','actualizar',mascota.id]);
    }

    public crearMascota(){
        this.router.navigate(['mascota','crear']);
    }
    
}
