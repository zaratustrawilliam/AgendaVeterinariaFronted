import { CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, waitForAsync, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "@core/services/auth.service";
import { HttpService } from "@core/services/http.service";
import { of } from "rxjs";
import { Mascota } from "src/app/feature/mascota/shared/model/Mascota";
import { TipoMascota } from "src/app/feature/mascota/shared/model/TipoMascota";
import { MascotasService } from "src/app/feature/mascota/shared/service/mascotas.service";
import { Usuario } from "src/app/feature/usuario/shared/model/usuario";
import { Agenda } from "../../share/model/Agenda";
import { AgendaService } from "../../share/service/agenda.service";
import { ConsultarAgendaComponent } from "./consultar-agenda.component";

describe('ConsultarAgendaComponent', () => {
    let component: ConsultarAgendaComponent;
    let fixture: ComponentFixture<ConsultarAgendaComponent>;

    let agendaService: AgendaService;
    let agendaMascota: MascotasService;
    let auth; AuthService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ConsultarAgendaComponent],
            imports: [
                CommonModule,
                HttpClientTestingModule ,
                RouterTestingModule
            ],
            providers: [AuthService, AgendaService,MascotasService, HttpService]
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
        spyOn(agendaService, 'eliminarAgenda').and.returnValue(of());
        component.eliminarAgenda(0);
        expect(agendaService.eliminarAgenda).toHaveBeenCalled();
    });

    it('editar agenda', () => {
        spyOn(component, 'editarAgenda');
        component.editarAgenda(component.listaMascotas[0].id);
        expect(component.editarAgenda).toHaveBeenCalled();
    });

    it('crear agenda', () => {
        spyOn(component, 'crearAgenda');
        component.crearAgenda();
        expect(component.crearAgenda).toHaveBeenCalled();
    })

});