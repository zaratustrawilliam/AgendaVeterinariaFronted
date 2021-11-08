import { HttpResponse } from "@angular/common/http";
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpService } from "@core/services/http.service";
import { environment } from "src/environments/environment";
import { Agenda } from "../model/Agenda";
import { DtoAgenda } from "../model/DtoAgenda";
import { DtoFechasDisponibles } from "../model/DtoFechasDisponibles";
import { AgendaService } from "./agenda.service";

describe('AgendaService', () => {
    let httpMock: HttpTestingController;
    let service: AgendaService;
    const apiEndpointAgendas = `${environment.endpoint}/agendas`;

    beforeEach(() => {
        const injector = TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [AgendaService, HttpService]
        });
        httpMock = injector.inject(HttpTestingController);
        service = TestBed.inject(AgendaService);
      });

      it('should be created', () => {
        const productService: AgendaService = TestBed.inject(AgendaService);
        expect(productService).toBeTruthy();
      });

      it('deberia crear una agenda',()=>{
        const dummyAgenda = new DtoAgenda(null,1,'2015/05/12',null,null);
        service.crearAgenda(dummyAgenda).subscribe(r =>{
            expect(r).toEqual(1);
        });

        const req = httpMock.expectOne(apiEndpointAgendas);
        expect(req.request.method).toBe('POST');
        req.event(new HttpResponse<Number>({body: 1}));
      });

      it('consultar agendas por usuario',()=>{

        const dummyAgenda = [new Agenda(null,1,new Date(),null,null)];
        let idUsuario = 1;

        service.consultarAgendasPorUsuario(idUsuario).subscribe(r =>{
            expect(r).toEqual(dummyAgenda);
        });
        const req = httpMock.expectOne(apiEndpointAgendas.concat(`/${idUsuario}`));
        expect(req.request.method).toBe('GET');
        req.flush(dummyAgenda);
      });

      it('consultar Agenda dispibilidad por rango',()=>{

        const dummyDisponibilidad= [new DtoFechasDisponibles('1','mayo','2021','07:00')];
        let fecha = new Date();
        service.consultarAgendaDisponiblePorRango(fecha,1).subscribe(r =>{
            expect(r).toEqual(dummyDisponibilidad);
        });
        const req = httpMock.expectOne(apiEndpointAgendas.concat(`/disponibilidad?fecha=${fecha.toISOString()}&registros=${1}`));
        expect(req.request.method).toBe('GET');
        req.flush(dummyDisponibilidad);
      });

      it('eliminar agenda',()=>{
        let idAgenda = 1;
        service.eliminarAgenda(idAgenda).subscribe(() =>{
        });
        const req = httpMock.expectOne(apiEndpointAgendas.concat(`/${idAgenda}`));
        expect(req.request.method).toBe('DELETE');
      });

      it('deberia actualizar agenda',()=>{
        const dummyAgenda = new DtoAgenda(1,1,'2015/05/12',null,null);
        service.actualizarAgenda(dummyAgenda).subscribe(r =>{
            expect(r).toEqual(1);
        });

        const req = httpMock.expectOne(apiEndpointAgendas);
        expect(req.request.method).toBe('PUT');
      });

      it('deberia listar items horarios para el select',()=>{
        let items = service.listarItemsDeHoras();
        expect(items).toHaveSize(11);
        expect(items[0].id).toEqual(7);
        expect(items[0].nombre).toEqual('07:00 AM');
      });

});