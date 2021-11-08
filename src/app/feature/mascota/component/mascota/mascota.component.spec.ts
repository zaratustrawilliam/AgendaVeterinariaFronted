import { CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, waitForAsync, TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { MascotasComponent } from "./mascota.component";

describe('MascotaComponent', () => {
    let component: MascotasComponent;
    let fixture: ComponentFixture<MascotasComponent>;
    let router =  {
      url : 'mascota',
      navigate: jasmine.createSpy('navigate')
    }
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ MascotasComponent ],
        imports: [
          CommonModule,
          HttpClientTestingModule ,
          RouterTestingModule.withRoutes([{path:'mascota/listar',component:MascotasComponent}])
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
      fixture = TestBed.createComponent(MascotasComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('Validamos que se redirecciones a la ruta de listar',()=>{
      expect(component['router'].navigate).toHaveBeenCalledWith(['mascota','listar']);
    });
  
  });