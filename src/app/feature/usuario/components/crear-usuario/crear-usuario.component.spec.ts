import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, waitForAsync, TestBed, async } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { DtoValor } from "@core/modelo/DtoValor";
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
        spyOn(component['router'],'navigate').and.returnValue(Promise.resolve(true));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('crear usuario',()=>{
        let dummyDtoValor = new DtoValor(1);
        spyOn(userService,'crear').and.returnValue(of(dummyDtoValor));
        spyOn(auth,'registrarUsuario');
        component.usuarioForm.controls['nombre'].setValue('juan');
        component.usuarioForm.controls['clave'].setValue('12345');
        component.crear();

        expect(auth.registrarUsuario).toHaveBeenCalled();
    });

    it('formularioIngresado actualizar', async(() => {
        spyOn(auth,'statusLogged').and.returnValue(true);
        spyOn<any>(component, 'rellenarFormularioUsuario');
        
        fixture.detectChanges();
        component.ngOnInit();

        expect(component['rellenarFormularioUsuario']).toHaveBeenCalled();
    }));

    it('actualizar usuario',()=>{
        const dummyUsuario = new Usuario(1, 'Juan', '12345', new Date());
        component.usuarioActaulizar = dummyUsuario;
        component.usuarioForm.controls['nombre'].setValue('juan');
        component.usuarioForm.controls['clave'].setValue('12345');
        spyOn(userService,'actualizarUsuario').and.returnValue(of());

        component.actualizar();

        expect(userService.actualizarUsuario).toHaveBeenCalled();
    });

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
