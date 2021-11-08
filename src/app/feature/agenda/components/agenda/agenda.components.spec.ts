import { CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ConsultarAgendaComponent } from "../consultar-agenda/consultar-agenda.component";
import { AgendaComponent } from "./agenda.component";

describe('AgendaComponent', () => {
    let component: AgendaComponent;
    let fixture: ComponentFixture<AgendaComponent>;
    let route = {
      navigate : jasmine.createSpy('navigate'),
      url : 'agenda'
    }
  
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ AgendaComponent ],
        imports: [
          CommonModule,
          HttpClientTestingModule ,
          RouterTestingModule.withRoutes([{
            path : 'agenda/listar',
            component : ConsultarAgendaComponent
          }])
        ],providers : [{
          provide : Router,
          useValue : route
        }]
      })
      .compileComponents();
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(AgendaComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('activo oninit',()=>{
      component.ngOnInit();

      expect(component['router'].navigate).toHaveBeenCalledWith(['agenda','listar']);
    });
  
  });