import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { UsuarioComponent } from './usuario.component';
import { AuthService } from '@core/services/auth.service';
import { HttpService } from '@core/services/http.service';
import { UsuarioService } from '../../shared/service/usuario.service';
import { Usuario } from '../../shared/model/usuario';
import { of } from 'rxjs';
import { LoginComponent } from 'src/app/feature/login/components/login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';

describe('UsuarioComponent', () => {
  let component: UsuarioComponent;
  let fixture: ComponentFixture<UsuarioComponent>;

  let userService : UsuarioService;
  let auth ; AuthService;
  let router = {
    navigate: jasmine.createSpy('navigate'),
    url : 'usuario'
  }


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioComponent ],
      imports: [
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([{path:'login',component:LoginComponent},{
          path:'usuario/crear',
          component:CrearUsuarioComponent
        }])
      ],
      providers:[AuthService,UsuarioService,HttpService,
        {
          provide : Router,
          useValue : router
        }]
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

  it('eliminar',async()=>{
      spyOn(userService,'eliminarUsuario').and.returnValue(of(()=>{}));
      spyOn(auth,'logoutUser');
 
      component.eliminarUsuario();

      expect(auth.logoutUser).toHaveBeenCalled();
      expect(component['router'].navigate).toHaveBeenCalled();
  });

  it('cerrar cesion',()=>{
      spyOn(auth,'logoutUser');
      component.cerrarCesion();
      expect(auth.logoutUser).toHaveBeenCalled();
  });

  it('actualizar Usuario',()=>{
    component.actualizarUsuario();

    expect(component['router'].navigate).toHaveBeenCalledWith(['usuario','crear']);
  });

});