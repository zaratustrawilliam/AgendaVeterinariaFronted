import { CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, waitForAsync, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { MascotasComponent } from "./mascota.component";

describe('MascotaComponent', () => {
    let component: MascotasComponent;
    let fixture: ComponentFixture<MascotasComponent>;
  
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ MascotasComponent ],
        imports: [
          CommonModule,
          HttpClientTestingModule ,
          RouterTestingModule
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
  
  });