import { CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AgendaComponent } from "./agenda.component";

describe('AgendaComponent', () => {
    let component: AgendaComponent;
    let fixture: ComponentFixture<AgendaComponent>;
  
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ AgendaComponent ],
        imports: [
          CommonModule,
          HttpClientTestingModule ,
          RouterTestingModule
        ]
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
  
  });