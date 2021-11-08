import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseUsuarioComponent } from './base-usuario.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UsuarioComponent } from '../usuario/usuario.component';
import { Router } from '@angular/router';




describe('BaseUsuarioComponent', () => {
  let component: BaseUsuarioComponent;
  let fixture: ComponentFixture<BaseUsuarioComponent>;
  let router = {
    navigate: jasmine.createSpy('navigate'),
    url : 'usuario'
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseUsuarioComponent ],
      imports: [
        CommonModule,
        HttpClientTestingModule ,
        RouterTestingModule.withRoutes([{path:'usuario/perfil',component:UsuarioComponent}])
      ],providers:[
        {
          provide : Router,
          useValue : router
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('activo oninit',()=>{
    component.ngOnInit();

    expect(component.router.navigate).toHaveBeenCalled();
  });

});