import { CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, waitForAsync, TestBed, async } from "@angular/core/testing";
import { Router,NavigationStart } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { DtoValor } from "@core/modelo/DtoValor";
import { AlertaService } from "@core/services/alerta.service";
import { AuthService } from "@core/services/auth.service";
import { HttpService } from "@core/services/http.service";
import { HomeComponent } from "@home/home.component";
import { of, throwError } from "rxjs";
import { Usuario } from "../../shared/model/usuario";
import { UsuarioService } from "../../shared/service/usuario.service";
import { UsuarioComponent } from "../usuario/usuario.component";
import { CrearUsuarioComponent } from "./crear-usuario.component";

describe('CrearUsuarioComponent', () => {
    let component: CrearUsuarioComponent;
    let fixture: ComponentFixture<CrearUsuarioComponent>;

    let userService: UsuarioService;
    let auth; AuthService;
    let router = {
        navigate : jasmine.createSpy('navigate'),
        events:jasmine.createSpy('events')
    }
    let alerta = {
        error : jasmine.createSpy('error')
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CrearUsuarioComponent],
            imports: [
                CommonModule,
                HttpClientTestingModule ,
                RouterTestingModule.withRoutes([{path:'home',component:HomeComponent},
            {path:'usuario/perfil',component:UsuarioComponent}])
            ],
            providers: [AuthService, UsuarioService, HttpService,
                {
                    provide : Router,
                    useValue : router
                },{
                    provide  :AlertaService,
                    useValue : alerta
                }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CrearUsuarioComponent);
        component = fixture.componentInstance;
        userService = TestBed.inject(UsuarioService);
        auth = TestBed.inject(AuthService);
        router.events.and.returnValue(of(NavigationStart));
        spyOn(auth, '_getUUIDUsuario').and.returnValue(1);
        const dummyUsuario = new Usuario(1, 'Juan', '12345', new Date());
        spyOn(userService, 'consultarUsuarioPorId').and.returnValue(of(dummyUsuario));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('crear usuario',()=>{
        let dummyDtoValor = new DtoValor(1);
        spyOn(userService,'crear').and.returnValue(of(dummyDtoValor));
        spyOn(auth,'registrarUsuario');
        //spyOn(alerta,'error');
        component.usuarioForm.controls['nombre'].setValue('juan');
        component.usuarioForm.controls['clave'].setValue('12345');

        component.crear();

        expect(auth.registrarUsuario).toHaveBeenCalled();
    });

    it('crear usuario, lanza error',()=>{
        spyOn(userService,'crear').and.returnValue(throwError({message:'error'}));
        spyOn(auth,'registrarUsuario');
        component.usuarioForm.controls['nombre'].setValue('juan');
        component.usuarioForm.controls['clave'].setValue('12345');

        component.crear();

        expect(auth.registrarUsuario).not.toHaveBeenCalled();
        expect(alerta.error).toHaveBeenCalled();
    });

    it('formularioIngresado actualizar', async() => {
        const dummyUsuario = new Usuario(1, 'Juan', '12345', new Date());
        spyOn(auth,'statusLogged').and.returnValue(true);
        spyOn<any>(component, 'rellenarFormularioUsuario');
        
        fixture.detectChanges();
        component.ngOnInit();

        expect(component.usuarioActaulizar.id).toEqual(dummyUsuario.id);
        expect(component['rellenarFormularioUsuario']).toHaveBeenCalled();
    });

    it('actualizar usuario',()=>{
        spyOn(auth,'statusLogged').and.returnValue(true);
        spyOn(userService,'actualizarUsuario').and.returnValue(of(()=>{}));
        spyOn(auth,'registrarUsuario');
        fixture.detectChanges();
        component.ngOnInit();

        component.actualizar();

        expect(auth.registrarUsuario).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith(['usuario','perfil']);
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
