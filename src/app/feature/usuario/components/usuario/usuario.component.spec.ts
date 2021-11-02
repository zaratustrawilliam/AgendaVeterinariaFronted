import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UsuarioComponent } from './usuario.component';
import { AuthService } from '@core/services/auth.service';
import { HttpService } from '@core/services/http.service';
import { UsuarioService } from '../../shared/service/usuario.service';
import { Usuario } from '../../shared/model/usuario';
import { of } from 'rxjs';
import { LoginComponent } from 'src/app/feature/login/components/login.component';

describe('UsuarioComponent', () => {
  let component: UsuarioComponent;
  let fixture: ComponentFixture<UsuarioComponent>;

  let userService : UsuarioService;
  let auth ; AuthService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule.withRoutes([{path:'login',component:LoginComponent}])
      ],
      providers:[AuthService,UsuarioService,HttpService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UsuarioService);
    auth = TestBed.inject(AuthService);
    spyOn(auth,'_getUUIDUsuario').and.returnValue(1);
    const dummyUsuario= new Usuario(1,'Juan','12345',new Date());
    spyOn(userService,'consultarUsuarioPorId').and.callFake(()=>{return of(dummyUsuario)});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('eliminar',()=>{
      const espiarLlamado = spyOn(userService,'eliminarUsuario').and.callThrough();
      fixture.detectChanges();
      component.eliminarUsuario();
      expect(espiarLlamado).toHaveBeenCalled();
  });

  it('cerrar cesion',()=>{
      spyOn(auth,'logoutUser');
      component.cerrarCesion();
      expect(auth.logoutUser).toHaveBeenCalled();
  })

});