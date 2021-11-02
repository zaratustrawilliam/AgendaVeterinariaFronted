import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { DtoMascota } from '../../shared/model/DtoMascota';
import { TipoMascota } from '../../shared/model/TipoMascota';
import { MascotasService } from '../../shared/service/mascotas.service';

@Component({
    selector:'app-crearmascota',
    templateUrl:'crear-mascota.component.html',
    styleUrls:['crear-mascota.component.sass']
})
export class CrearMascotaComponent implements OnInit{
    
    mascota : DtoMascota;
    mascotaForm : FormGroup;
    modoActualizar : boolean;
    listaTipoMascotas : Array<TipoMascota>;
    parametroMascota : number;

    constructor(protected servicioMascotas : MascotasService,
        protected route :Router,protected userService : AuthService,
        private rutaActiva: ActivatedRoute){}

    ngOnInit(): void {
        this.modoActualizar = false;
        this.construirFormularioMascota();
        this.listaTipoMascotas = [];

        this.rutaActiva.params.subscribe((params: Params) => this.parametroMascota = params['idMascota']);

        this.servicioMascotas.consultarTiposMascotas()
            .subscribe(tipos=>{
                this.listaTipoMascotas = tipos;
                if(this.parametroMascota != null){
                    this.rellenarFormulario();
                    this.modoActualizar = true;
                }
            });

    }

    private construirFormularioMascota(){
        this.mascotaForm = new FormGroup({
            nombre : new FormControl('',[Validators.required]),
            tipoMascota : new FormControl('',[Validators.required])
        });
    }

    private construirDtoMascota() {
        this.mascota = new DtoMascota(null,this.mascotaForm.value.nombre,
            this.userService._getUUIDUsuario(),this.mascotaForm.value.tipoMascota);
    }

    crear(){
        this.construirDtoMascota();
        this.servicioMascotas.crearMascota(this.mascota)
        .subscribe(idMascota=>{
            console.log('se creo mascota con id',idMascota);
            this.route.navigate(['mascota','listar']);
        });
    }

    actualizar(){
        this.construirDtoMascota();
        this.mascota.id = this.parametroMascota;
        this.servicioMascotas.actualizarMascota(this.mascota)
        .subscribe(()=>{
            this.route.navigate(['mascota','listar']);
        });
    }

    nombreComponente():string{ 
        return  (!this.modoActualizar ? 'Crear Mascota' : 'Actualizar Mascota');
    }

    private rellenarFormulario(){
        this.servicioMascotas.consultarMascotasPorUsuario(this.userService._getUUIDUsuario())
        .subscribe( lista =>{
            lista.forEach( mascota =>{
                if(mascota.id == this.parametroMascota){
                    this.mascotaForm.get('nombre').setValue(mascota.nombre);
                    this.mascotaForm.get('tipoMascota').setValue(mascota.tipoMascota.id);
                }
            });
        });
    }
}