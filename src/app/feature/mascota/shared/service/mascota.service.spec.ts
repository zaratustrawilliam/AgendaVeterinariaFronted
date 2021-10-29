import { HttpResponse } from "@angular/common/http";
import { HttpTestingController, HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpService } from "@core/services/http.service";
import { Usuario } from "src/app/feature/usuario/shared/model/usuario";
import { environment } from "src/environments/environment";
import { DtoMascota } from "../model/DtoMascota";
import { Mascota } from "../model/Mascota";
import { TipoMascota } from "../model/TipoMascota";
import { MascotasService } from "./mascotas.service";

describe('MascotaService', () => {
    let httpMock: HttpTestingController;
    let service: MascotasService;
    const apiEndpointMascota = `${environment.endpoint}/mascotas`;
    const apiEndpointTiposMascota = `${environment.endpoint}/tiposmascotas`;

    beforeEach(() => {
        const injector = TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [MascotasService, HttpService]
        });
        httpMock = injector.inject(HttpTestingController);
        service = TestBed.inject(MascotasService);
      });

      it('should be created', () => {
        const productService: MascotasService = TestBed.inject(MascotasService);
        expect(productService).toBeTruthy();
      });

      it('deberia crear una mascota',()=>{
        const dummyUsuario= new Usuario(1,'Juan','12345',new Date());
        const dymmyTipoMascota = new TipoMascota(1,'PERRO');
        const dummyMascota= new DtoMascota(null,'Tobias',dummyUsuario.id,dymmyTipoMascota.id);
        service.crearMascota(dummyMascota).subscribe(r =>{
            expect(r).toEqual(1);
        });

        const req = httpMock.expectOne(apiEndpointMascota);
        expect(req.request.method).toBe('POST');
        req.event(new HttpResponse<Number>({body: 1}));
      });

      it('consultar tipos mascota',()=>{

        const dymmyTipoMascota = [new TipoMascota(1,'PERRO'),new TipoMascota(2,'GATO'),
        new TipoMascota(3,'AVE'),new TipoMascota(4,'ROEDOR')];
        service.consultarTiposMascotas().subscribe(r =>{
            expect(r.length).toBe(4);
            expect(r).toEqual(dymmyTipoMascota);
        });
        const req = httpMock.expectOne(apiEndpointTiposMascota);
        expect(req.request.method).toBe('GET');
        req.flush(dymmyTipoMascota);
      });

      it('consultar mascotas usuario',()=>{

        const dummyUsuario= new Usuario(1,'Juan','12345',new Date());
        const dymmyTipoMascota = new TipoMascota(1,'PERRO');
        const dummyMascota= [new Mascota(1,'Tobias',dummyUsuario,dymmyTipoMascota)];
        let idUsuario  = 1;
        service.consultarMascotasPorUsuario(idUsuario).subscribe(r =>{
            expect(r).toEqual(dummyMascota);
        });
        const req = httpMock.expectOne(apiEndpointMascota.concat(`/${idUsuario}`));
        expect(req.request.method).toBe('GET');
        req.flush(dummyMascota);
      });

      it('eliminar mascota',()=>{
        let idMascota = 1;
        service.eliminarMascota(idMascota).subscribe(() =>{
        });
        const req = httpMock.expectOne(apiEndpointMascota.concat(`/${idMascota}`));
        expect(req.request.method).toBe('DELETE');
      });

      it('deberia actualizar mascota',()=>{
        const dummyUsuario= new Usuario(1,'Juan','12345',new Date());
        const dymmyTipoMascota = new TipoMascota(1,'PERRO');
        const dummyMascota= new DtoMascota(null,'Tobias',dummyUsuario.id,dymmyTipoMascota.id);
        service.actualizarMascota(dummyMascota).subscribe(() =>{
        });

        const req = httpMock.expectOne(apiEndpointMascota);
        expect(req.request.method).toBe('PUT');
      });

});