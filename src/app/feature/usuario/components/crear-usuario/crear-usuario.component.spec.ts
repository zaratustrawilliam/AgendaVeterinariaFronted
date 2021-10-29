import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, waitForAsync, TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "@core/services/auth.service";
import { HttpService } from "@core/services/http.service";
import { of } from "rxjs";
import { Usuario } from "../../shared/model/usuario";
import { UsuarioService } from "../../shared/service/usuario.service";
import { CrearUsuarioComponent } from "./crear-usuario.component";

describe('CrearUsuarioComponent', () => {
    let component: CrearUsuarioComponent;
    let fixture: ComponentFixture<CrearUsuarioComponent>;

    let userService: UsuarioService;
    let auth; AuthService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CrearUsuarioComponent],
            imports: [
                CommonModule,
                HttpClientModule,
                RouterTestingModule
            ],
            providers: [AuthService, UsuarioService, HttpService]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CrearUsuarioComponent);
        component = fixture.componentInstance;
        userService = TestBed.inject(UsuarioService);
        auth = TestBed.inject(AuthService);
        spyOn(auth, '_getUUIDUsuario').and.returnValue(1);
        const dummyUsuario = new Usuario(1, 'Juan', '12345', new Date());
        spyOn(userService, 'consultarUsuarioPorId').and.returnValue(of(dummyUsuario));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('formularioIngresado', async(() => {
        spyOn(component, 'crear');
        component.crear();
        expect(component.crear).toHaveBeenCalled();
    }));

    it('formularioIngresado actualizar', async(() => {
        spyOn(component, 'actualizar');
        component.actualizar();
        expect(component.actualizar).toHaveBeenCalled();
    }));

    it('formulario invalido',async(() => {
        component.usuarioForm.controls['nombre'].setValue('');
        component.usuarioForm.controls['clave'].setValue('');
        expect(component.usuarioForm.valid).toBeFalsy();
    }));

    it('formulario valido',async(() => {
        component.usuarioForm.controls['nombre'].setValue('juan');
        component.usuarioForm.controls['clave'].setValue('12345');
        expect(component.usuarioForm.valid).toBeTruthy();
    }));

    it('nombre componente',()=>{
        component.actualizarUsuario = false;
        expect(component.nombreComponente()).toBe('Crear usuario');
    });

    it('nombre componente actualizar',()=>{
        component.actualizarUsuario = true;
        expect(component.nombreComponente()).toBe('Actualizar Usuario');
    });

})
