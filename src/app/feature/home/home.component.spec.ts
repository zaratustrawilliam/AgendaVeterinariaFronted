import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthService } from '@core/services/auth.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const authService = jasmine.createSpyObj('AuthService',['statusLogged','_getUserName']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent],
        providers:[
          {
            provide: AuthService,
            useValue: authService
          }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    authService.statusLogged.and.returnValue(true);
    authService._getUserName.and.returnValue('usuario@pruebas');
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const VALOR_VARIABLE = '!Bienvenido usuario@pruebas a la veterinaria los GALGOS, Agende su cita pro favor!';

  it('El usuario se encuentra logeado',()=>{
    expect(component.nombreUsuario).toEqual(VALOR_VARIABLE);
  });
  
});
