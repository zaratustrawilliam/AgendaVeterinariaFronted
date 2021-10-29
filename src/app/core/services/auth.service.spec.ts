import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { DtoUsuario } from "@core/modelo/Dtousuario";
import { environment } from "src/environments/environment";
import { AuthService } from "./auth.service";
import { HttpService } from "./http.service";

describe('AuthService', () => {

    let httpMock: HttpTestingController;
    let service: AuthService;
    const apiEndPointLoginConsulta = `${environment.endpoint}/usuarios`;

    beforeEach(() => {
        const injector = TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AuthService, HttpService]
        });
        httpMock = injector.inject(HttpTestingController);
        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        const authService: AuthService = TestBed.inject(AuthService);
        expect(authService).toBeTruthy();
    });

    it('Se loguea el usuario en el aplicativo', () => {
        const dummyUsuarios = [new DtoUsuario(1, 'Juan@prueba', '12365', new Date())];
        service.login('Juan@prueba', '12365').then(isLog => {
            expect(isLog).toBeTrue();
        })

        const req = httpMock.expectOne(apiEndPointLoginConsulta);
        expect(req.request.method).toBe('GET');
        req.flush(dummyUsuarios);
    });

    it('se valida el valor inicial del componente', () => {
        expect(service.statusLogged()).toEqual(false);
    });

    it('se valida que el logout genera un false', () => {
        service = new AuthService(null);
        service.logoutUser();
        expect(service.statusLogged()).toBeFalse();
        expect(service._getUUIDUsuario()).toBeNull();
        expect(service._getUserName()).toBeNull();
    });

    it('se valida que se registre un usuario', () => {

        service.registrarUsuario('user@pruebas', 1);
        expect(service._getUserName()).toBe('user@pruebas');
        expect(service._getUUIDUsuario()).toBe(1);
        expect(service.statusLogged()).toBeTrue();
    });
});