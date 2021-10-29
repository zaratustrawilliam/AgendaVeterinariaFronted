import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, waitForAsync, TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "@core/services/auth.service";
import { HttpService } from "@core/services/http.service";
import { of } from "rxjs";
import { Usuario } from "src/app/feature/usuario/shared/model/usuario";
import { Mascota } from "../../shared/model/Mascota";
import { TipoMascota } from "../../shared/model/TipoMascota";
import { MascotasService } from "../../shared/service/mascotas.service";
import { CrearMascotaComponent } from "./crear-mascota.component";

describe('CrearMascotaComponent', () => {
    let component: CrearMascotaComponent;
    let fixture: ComponentFixture<CrearMascotaComponent>;

    let mascotaService: MascotasService;
    let auth; AuthService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CrearMascotaComponent],
            imports: [
                CommonModule,
                HttpClientModule,
                RouterTestingModule
            ],
            providers: [AuthService, MascotasService, HttpService]
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
        const dummyMascota = [new Mascota(null, 'Tobias', dummyUsuario, dymmyTipoMascota[0])];
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
        spyOn(component, 'crear');
        component.crear();
        expect(component.crear).toHaveBeenCalled();
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
        fixture.detectChanges();
        spyOn(component, 'actualizar');
        component.actualizar();
        expect(component.actualizar).toHaveBeenCalled();
    });

    
});