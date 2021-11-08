import { CommonModule } from "@angular/common";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { AlertaService } from "@core/services/alerta.service";
import { AuthService } from "@core/services/auth.service";
import { HttpService } from "@core/services/http.service";
import { HomeComponent } from "@home/home.component";
import { LoginComponent } from "./login.component";

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let auth: AuthService;
    let alerta : AlertaService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [CommonModule,
                HttpClientTestingModule ,
                RouterTestingModule.withRoutes([{path: 'home',component:HomeComponent}]),
                FormsModule
            ],
            providers:[AuthService,HttpService,AlertaService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        auth = TestBed.inject(AuthService);
        alerta = TestBed.inject(AlertaService);
        component.nombre = 'camilo';
        component.clave = '1345';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it('call login',async()=>{
        spyOn(auth,'login').and.returnValue(Promise.resolve(true));      
        spyOn(component.router,'navigate');
        
        await component.logIn();

        expect(auth.login).toHaveBeenCalled();
        expect(component.router.navigate).toHaveBeenCalled();
    });

    it('Se genera la alerta dado que no se puede loguearse el usuario',async()=>{
        spyOn(auth,'login').and.returnValue(Promise.reject());
        spyOn(alerta,'error').and.callFake(()=>{});

        await component.logIn();

        expect(alerta.error).toHaveBeenCalled();
    });

});
