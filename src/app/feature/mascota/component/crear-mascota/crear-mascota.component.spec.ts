import { CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, waitForAsync, TestBed, async } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "@core/services/auth.service";
import { HttpService } from "@core/services/http.service";
import { of } from "rxjs";
import { Usuario } from "src/app/feature/usuario/shared/model/usuario";
//import { DtoMascota } from "../../shared/model/DtoMascota";
import { Mascota } from "../../shared/model/Mascota";
import { TipoMascota } from "../../shared/model/TipoMascota";
import { MascotasService } from "../../shared/service/mascotas.service";
import { MascotasComponent } from "../mascota/mascota.component";
import { CrearMascotaComponent } from "./crear-mascota.component";

describe('CrearMascotaComponent', () => {
    let component: CrearMascotaComponent;
    let fixture: ComponentFixture<CrearMascotaComponent>;

    let mascotaService: MascotasService;
    let auth: AuthService;
    let router = {
        navigate : jasmine.createSpy('navigate')
    }
    let activatedRoute = {
        params : of()
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CrearMascotaComponent],
            imports: [
                CommonModule,
                HttpClientTestingModule ,
                RouterTestingModule.withRoutes([{path:'mascota/listar',component:MascotasComponent}])
            ],
            providers: [AuthService, MascotasService, HttpService,{
                provide : Router,
                useValue : router
            },{
                provide : ActivatedRoute,
                useValue : activatedRoute
            }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CrearMascotaComponent);
        component = fixture.componentInstance;
        mascotaService = TestBed.inject(MascotasService);
        auth = TestBed.inject(AuthService);
        spyOn(auth, '_getUUIDUsuario').and.returnValue(1);
        const dummyUsuario = new Usuario(1, 'Juan', '12345', new Date());
        const dymmyTipoMascota = [new TipoMascota(1,'PERRO'),new TipoMascota(2,'GATO'),
        new TipoMascota(3,'AVE'),new TipoMascota(4,'ROEDOR')];
        const dummyMascota = [new Mascota(1, 'Tobias', dummyUsuario, dymmyTipoMascota[0])];
        spyOn(mascotaService, 'consultarMascotasPorUsuario').and.returnValue(of(dummyMascota));
        spyOn(mascotaService, 'consultarTiposMascotas').and.returnValue(of(dymmyTipoMascota));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('formulario invalido',async(() => {
        component.mascotaForm.controls['nombre'].setValue('');
        component.mascotaForm.controls['tipoMascota'].setValue('');
        expect(component.mascotaForm.valid).toBeFalsy();
    }));

    it('formulario valido',async(() => {
        component.mascotaForm.controls['nombre'].setValue('Tobias');
        component.mascotaForm.controls['tipoMascota'].setValue('1');
        expect(component.mascotaForm.valid).toBeTruthy();
    }));

    it('crear mascota', () => {
        component.mascotaForm.controls['nombre'].setValue('Tobias');
        component.mascotaForm.controls['tipoMascota'].setValue('1');
        spyOn(mascotaService, 'crearMascota').and.returnValue(of(1));
        spyOn<any>(component,'construirDtoMascota');

        component.crear();

        expect(component['construirDtoMascota']).toHaveBeenCalled();
        expect(mascotaService.crearMascota).toHaveBeenCalled();
        expect(component['route'].navigate).toHaveBeenCalledWith(['mascota','listar']);
    });

    it('nombre componente',()=>{
        component.modoActualizar = false;
        expect(component.nombreComponente()).toBe('Crear Mascota');
    });

    it('nombre componente actualizar',()=>{
        component.modoActualizar = true;
        expect(component.nombreComponente()).toBe('Actualizar Mascota');
    });

    it('actualizar mascota', () => {
        activatedRoute.params = of({'idMascota':1});
        component.ngOnInit();
        spyOn(mascotaService, 'actualizarMascota').and.returnValue(of(()=>{}));

        component.actualizar();

        expect(mascotaService.actualizarMascota).toHaveBeenCalled();
        expect(component['route'].navigate).toHaveBeenCalledWith(['mascota','listar']);
    });

    
});