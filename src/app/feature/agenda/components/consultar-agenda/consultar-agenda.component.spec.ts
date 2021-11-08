import { CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, waitForAsync, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { AlertaService } from "@core/services/alerta.service";
import { AuthService } from "@core/services/auth.service";
import { HttpService } from "@core/services/http.service";
import { of, throwError } from "rxjs";
import { Mascota } from "src/app/feature/mascota/shared/model/Mascota";
import { TipoMascota } from "src/app/feature/mascota/shared/model/TipoMascota";
import { MascotasService } from "src/app/feature/mascota/shared/service/mascotas.service";
import { Usuario } from "src/app/feature/usuario/shared/model/usuario";
import { Agenda } from "../../share/model/Agenda";
import { AgendaService } from "../../share/service/agenda.service";
import { CrearAgendaComponent } from "../crear-agenda/crear-agenda.component";
import { ConsultarAgendaComponent } from "./consultar-agenda.component";

describe('ConsultarAgendaComponent', () => {
    let component: ConsultarAgendaComponent;
    let fixture: ComponentFixture<ConsultarAgendaComponent>;

    let agendaService: AgendaService;
    let agendaMascota: MascotasService;
    let auth; AuthService;
    let alerta = {
        error : jasmine.createSpy('error'),
        exito : jasmine.createSpy('exito')
    }
    let route = {
        navigate : jasmine.createSpy('navigate')
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ConsultarAgendaComponent],
            imports: [
                CommonModule,
                HttpClientTestingModule ,
                RouterTestingModule.withRoutes([{
                    path : 'agenda/crear',
                    component : CrearAgendaComponent
                },{
                    path : 'agenda/actualizar/:idAgenda',
                    component : CrearAgendaComponent
                }])
            ],
            providers: [AuthService, AgendaService,MascotasService, HttpService,AlertaService,{
                provide : Router,
                useValue : route
            },{
                provide  :AlertaService,
                useValue : alerta
            }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConsultarAgendaComponent);
        component = fixture.componentInstance;
        agendaService = TestBed.inject(AgendaService);
        auth = TestBed.inject(AuthService);
        agendaMascota = TestBed.inject(MascotasService);
        spyOn(auth, '_getUUIDUsuario').and.returnValue(1);
        const dummyUsuario = new Usuario(1, 'Juan', '12345', new Date());
        const dymmyTipoMascota = [new TipoMascota(1,'PERRO'),new TipoMascota(2,'GATO'),
        new TipoMascota(3,'AVE'),new TipoMascota(4,'ROEDOR')];
        const dummyMascota = [new Mascota(1, 'Tobias', dummyUsuario, dymmyTipoMascota[0])];
        const dummyAgenda = [new Agenda(null,1,new Date(),null,null)];

        spyOn(agendaMascota, 'consultarMascotasPorUsuario').and.returnValue(of(dummyMascota));
        spyOn(agendaService, 'consultarAgendasPorUsuario').and.returnValue(of(dummyAgenda));      
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('traer nombre mascota',()=>{
        expect(component.listaMascotas.length).toEqual(1)
        expect(component.traerNombreMascota(1)).toEqual('Tobias');
    });

    it('eliminar agenda', () => {
        component.listaAgendas = new Array<Agenda>();
        let dummyagenda = new Agenda(1,1,null,null,null);
        component.listaAgendas.push(dummyagenda);
        spyOn(agendaService, 'eliminarAgenda').and.returnValue(of(()=>{}));

        component.eliminarAgenda(0);

        expect(agendaService.eliminarAgenda).toHaveBeenCalled();
        expect(alerta.exito).toHaveBeenCalled();
    });

    it('eliminar agenda,se presento un error', () => {
        component.listaAgendas = new Array<Agenda>();
        let dummyagenda = new Agenda(1,1,null,null,null);
        component.listaAgendas.push(dummyagenda);
        spyOn(agendaService, 'eliminarAgenda').and.returnValue(throwError({status:412}));

        component.eliminarAgenda(0);

        expect(alerta.error).toHaveBeenCalled();
    });

    it('editar agenda', () => {
        component.editarAgenda(component.listaMascotas[0].id);

        expect(component['router'].navigate).toHaveBeenCalledWith(['agenda','actualizar',component.listaMascotas[0].id]);
    });

    it('crear agenda', () => {
        component.crearAgenda();

        expect(component['router'].navigate).toHaveBeenCalledWith(['agenda','crear']);
    })

});