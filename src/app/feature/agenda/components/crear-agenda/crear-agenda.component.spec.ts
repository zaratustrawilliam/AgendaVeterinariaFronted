import { CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, waitForAsync, TestBed, async } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "@core/services/auth.service";
import { HttpService } from "@core/services/http.service";
import { of } from "rxjs";
import { Mascota } from "src/app/feature/mascota/shared/model/Mascota";
import { TipoMascota } from "src/app/feature/mascota/shared/model/TipoMascota";
import { MascotasService } from "src/app/feature/mascota/shared/service/mascotas.service";
import { Usuario } from "src/app/feature/usuario/shared/model/usuario";
import { Agenda } from "../../share/model/Agenda";
import { DtoFechasDisponibles } from "../../share/model/DtoFechasDisponibles";
import { AgendaService } from "../../share/service/agenda.service";
import { ConsultarAgendaComponent } from "../consultar-agenda/consultar-agenda.component";
import { CrearAgendaComponent } from "./crear-agenda.component";

describe('CrearAgendaComponent', () => {
    let component: CrearAgendaComponent;
    let fixture: ComponentFixture<CrearAgendaComponent>;

    let agendaService: AgendaService;
    let agendaMascota: MascotasService;
    let auth; AuthService;
    let router = {
        navigate : jasmine.createSpy('navigate')
    }
    let activatedRoute = {
        params : of()
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [CrearAgendaComponent],
            imports: [
                CommonModule,
                HttpClientTestingModule ,
                RouterTestingModule.withRoutes([{
                    path:'agenda/listar',component:ConsultarAgendaComponent
                }])
            ],
            providers: [AuthService, AgendaService,MascotasService, HttpService,{
                provide : ActivatedRoute,
                useValue : activatedRoute
            },{
                provide : Router,
                useValue : router
            }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CrearAgendaComponent);
        component = fixture.componentInstance;
        agendaService = TestBed.inject(AgendaService);
        auth = TestBed.inject(AuthService);
        agendaMascota = TestBed.inject(MascotasService);
        spyOn(auth, '_getUUIDUsuario').and.returnValue(1);
        const dummyUsuario = new Usuario(1, 'Juan', '12345', new Date());
        const dymmyTipoMascota = [new TipoMascota(1,'PERRO'),new TipoMascota(2,'GATO'),
        new TipoMascota(3,'AVE'),new TipoMascota(4,'ROEDOR')];
        const dummyMascota = [new Mascota(1, 'Tobias', dummyUsuario, dymmyTipoMascota[0])];
        const dummyAgenda = [new Agenda(1,1,new Date(),null,null)];
        const dummyDisponible = [new DtoFechasDisponibles('1','mayo','2022','07:00')];

        spyOn(agendaMascota, 'consultarMascotasPorUsuario').and.returnValue(of(dummyMascota));
        spyOn(agendaService, 'consultarAgendasPorUsuario').and.returnValue(of(dummyAgenda));
        spyOn(agendaService,'consultarAgendaDisponiblePorRango').and.returnValue(of(dummyDisponible));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('formulario invalido',async(() => {
        component.agendaForm.controls['mascotas'].setValue('');
        component.agendaForm.controls['horas'].setValue('');
        component.agendaForm.controls['fecha'].setValue('');
        component.agendaForm.controls['direccion'].setValue('');
        expect(component.agendaForm.valid).toBeFalsy();
    }));

    it('formulario valido',async(() => {
        component.agendaForm.controls['mascotas'].setValue('1');
        component.agendaForm.controls['horas'].setValue('8');
        component.agendaForm.controls['fecha'].setValue('05-09-2021');
        expect(component.agendaForm.valid).toBeTruthy();
    }));

    it('crear agenda tipo seleccion 1', () => {
        component.agendaForm.value.fecha = '2020-05-21';
        component.agendaForm.value.horas = 8;
        spyOn(agendaService,'crearAgenda').and.returnValue(of(1));

        component.crear();

        expect(component['route'].navigate).toHaveBeenCalledWith(['agenda','listar']);
    });

    it('handle change, fecha automatica',()=>{
        component.handleChange();
        expect(component.fechaHoraCal).not.toBeNull();
        expect(component.fechaHoraCalculada).not.toBeNull();
    })

    it('crear agenda tipo seleccion 2', () => {
        component.tipoSeleccion = '2';
        let fechaDtoDummy = new DtoFechasDisponibles('15','mayo','2021','9:00');
        component.fechaHoraCal = fechaDtoDummy;
        spyOn(agendaService,'crearAgenda').and.returnValue(of(1));

        component.crear();

        expect(component['route'].navigate).toHaveBeenCalledWith(['agenda','listar']);
    });

    it('nombre componente',()=>{
        component.modoActualizar = false;
        expect(component.nombreComponente()).toBe('Crear Agenda');
    });

    it('nombre componente actualizar',()=>{
        component.modoActualizar = true;
        expect(component.nombreComponente()).toBe('Actualizar Agenda');
    });

    it('actualizar agenda', () => {
        component.tipoSeleccion = '1';
        activatedRoute.params = of({'idAgenda':1});
        component.ngOnInit();
        component.agendaForm.value.fecha = '2020-05-21';
        component.agendaForm.value.horas = 8;
        spyOn(agendaService,'actualizarAgenda').and.returnValue(of(()=>{}));

        component.actualizar();

        expect(component['route'].navigate).toHaveBeenCalledWith(['agenda','listar']);
    });

    
});