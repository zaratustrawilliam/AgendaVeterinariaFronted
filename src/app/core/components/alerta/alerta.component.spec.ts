import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationStart, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Alerta } from '@core/modelo/Alerta';
import { TipoAlerta } from '@core/modelo/TipoAlerta';
import { AlertaService } from '@core/services/alerta.service';
import { of } from 'rxjs';
import { AlertaComponent } from './alerta.component';

describe('AlertaComponent', () => {
  let component: AlertaComponent;
  let fixture: ComponentFixture<AlertaComponent>;
  let alerta = {
    mostrarAlerta : jasmine.createSpy('mostrarAlerta')
}
  let router = {
    events:jasmine.createSpy('events')
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertaComponent ],
      imports: [
        CommonModule,
        HttpClientTestingModule ,
        RouterTestingModule
    ],
      providers :[{
        provide : Router,
        useValue : router
      },{
        provide  :AlertaService,
        useValue : alerta
      }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertaComponent);
    component = fixture.componentInstance;
    router.events.and.returnValue(of(NavigationStart));
    let dummmyAlerta = new Alerta(TipoAlerta.Exito,'exito');
    alerta.mostrarAlerta.and.returnValue(of(dummmyAlerta));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Se instancio adecuadamente',()=>{  
    expect(component['servicioAlerta'].mostrarAlerta).toHaveBeenCalled();
  });
});