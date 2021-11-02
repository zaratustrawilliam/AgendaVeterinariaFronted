import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { BaseUsuarioComponent } from './base-usuario.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';




describe('BaseUsuarioComponent', () => {
  let component: BaseUsuarioComponent;
  let fixture: ComponentFixture<BaseUsuarioComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseUsuarioComponent ],
      imports: [
        CommonModule,
        HttpClientTestingModule ,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseUsuarioComponent);
    component = fixture.componentInstance;
    spyOn(component.router, 'navigate').and.returnValue(Promise.resolve(true));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('activo oninit',()=>{
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

});