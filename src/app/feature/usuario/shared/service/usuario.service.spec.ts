import { HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpService } from "@core/services/http.service";
import { environment } from "src/environments/environment";
import { Usuario } from "../model/usuario";
import { UsuarioService } from "./usuario.service";

describe('UsuarioService', () => {
    let httpMock: HttpTestingController;
    let service: UsuarioService;
    const apiEndpointCrearUsuario = `${environment.endpoint}/usuarios`;

    beforeEach(() => {
        const injector = TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          providers: [UsuarioService, HttpService]
        });
        httpMock = injector.inject(HttpTestingController);
        service = TestBed.inject(UsuarioService);
      });

      it('should be created', () => {
        const productService: UsuarioService = TestBed.inject(UsuarioService);
        expect(productService).toBeTruthy();
      });

      it('deberia crear usuario',()=>{
        const dummyUsuario= new Usuario(null,'Juan','12345',new Date());
        service.crear(dummyUsuario).subscribe(r =>{
            expect(r).toEqual(1);
        });

        const req = httpMock.expectOne(apiEndpointCrearUsuario);
        expect(req.request.method).toBe('POST');
        req.event(new HttpResponse<Number>({body: 1}));
      });

      it('consultarUsuarioPorId',()=>{
        const dummyUsuario= new Usuario(1,'Juan','12345',new Date());
        let idUsuario = 1;
        service.consultarUsuarioPorId(idUsuario).subscribe(r =>{
            expect(r).toBe(dummyUsuario);
        });
        const req = httpMock.expectOne(apiEndpointCrearUsuario.concat(`/${idUsuario}`));
        expect(req.request.method).toBe('GET');
        req.flush(dummyUsuario);
      });

      it('eliminarUsuario',()=>{
        let idUsuario = 1;
        service.eliminarUsuario(idUsuario).subscribe(() =>{
        });
        const req = httpMock.expectOne(apiEndpointCrearUsuario.concat(`/${idUsuario}`));
        expect(req.request.method).toBe('DELETE');
      });

      it('deberia actualizar usuario',()=>{
        const dummyUsuario= new Usuario(1,'Juan','12345',new Date());
        service.actualizarUsuario(dummyUsuario).subscribe(() =>{
        });

        const req = httpMock.expectOne(apiEndpointCrearUsuario.concat(`/${dummyUsuario.id}`));
        expect(req.request.method).toBe('PUT');
      });

});