import { CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, waitForAsync, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "@core/services/auth.service";
import { HttpService } from "@core/services/http.service";
import { of } from "rxjs";
import { Usuario } from "src/app/feature/usuario/shared/model/usuario";
import { Mascota } from "../../shared/model/Mascota";
import { TipoMascota } from "../../shared/model/TipoMascota";
import { MascotasService } from "../../shared/service/mascotas.service";
import { CrearMascotaComponent } from "../crear-mascota/crear-mascota.component";
import { ConsultarMascotaComponent } from "./consultar-mascota.component";

describe('ConsultarMascotaComponent', () => {
    let component: ConsultarMascotaComponent;
    let fixture: ComponentFixture<ConsultarMascotaComponent>;

    let mascotaService: MascotasService;
    let auth; AuthService;
    let router = {
        navigate : jasmine.createSpy('navigate')
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ConsultarMascotaComponent],
            imports: [
                CommonModule,
                HttpClientTestingModule ,
                RouterTestingModule.withRoutes([{path:'mascota/actualizar/:idMascota',component:CrearMascotaComponent},{
                    path:'mascota/crear',component:CrearMascotaComponent
                }])
            ],
            providers: [AuthService, MascotasService, HttpService,{
                provide : Router,
                useValue : router
            }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConsultarMascotaComponent);
        component = fixture.componentInstance;
        mascotaService = TestBed.inject(MascotasService);
        auth = TestBed.inject(AuthService);
        spyOn(auth, '_getUUIDUsuario').and.returnValue(1);
        const dummyUsuario = new Usuario(1, 'Juan', '12345', new Date());
        const dymmyTipoMascota = [new TipoMascota(1,'PERRO'),new TipoMascota(2,'GATO'),
        new TipoMascota(3,'AVE'),new TipoMascota(4,'ROEDOR')];
        const dummyMascota = [new Mascota(null, 'Tobias', dummyUsuario, dymmyTipoMascota[0])];
        spyOn(mascotaService, 'consultarMascotasPorUsuario').and.returnValue(of(dummyMascota));
        spyOn(mascotaService, 'consultarTiposMascotas').and.returnValue(of(dymmyTipoMascota));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('traer nombre tipo mascota',()=>{
        expect(component.traerNombreTipoMascota(1)).toEqual('PERRO');
    });

    it('eliminar nascota', () => {
        const dummyUsuario = new Usuario(1, 'Juan', '12345', new Date());
        const dymmyTipoMascota = [new TipoMascota(1,'PERRO'),new TipoMascota(2,'GATO'),
        new TipoMascota(3,'AVE'),new TipoMascota(4,'ROEDOR')];
        const dummyMascota = [new Mascota(null, 'Tobias', dummyUsuario, dymmyTipoMascota[0])];
        component.listaMascotas = dummyMascota;
        spyOn(mascotaService, 'eliminarMascota').and.returnValue(of(()=>{}));
        let tama??oVectorMascotas = component.listaMascotas.length;

        component.eliminarMascota(0);

        expect(mascotaService.eliminarMascota).toHaveBeenCalled();
        expect(component.listaMascotas).toBeLessThan(tama??oVectorMascotas);
    });

    it('editar mascota', () => {        
        component.editarMascota(component.listaMascotas[0]);

        expect(component.router.navigate).toHaveBeenCalledWith(['mascota','actualizar',component.listaMascotas[0].id]);
    });

    it('crear mascota', () => {
        component.crearMascota();

        expect(component.router.navigate).toHaveBeenCalledWith(['mascota','crear']);
    })

});