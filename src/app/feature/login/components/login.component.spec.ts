import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { RouterTestingModule } from "@angular/router/testing";
import { AuthService } from "@core/services/auth.service";
import { HttpService } from "@core/services/http.service";
import { HomeComponent } from "@home/home.component";
import { LoginComponent } from "./login.component";

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let auth: AuthService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [CommonModule,
                HttpClientModule,
                RouterTestingModule.withRoutes([{path: 'home',component:HomeComponent}]),
                FormsModule
            ],
            providers:[AuthService,HttpService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        auth = TestBed.inject(AuthService);

        component.nombre = 'camilo';
        component.clave = '1345';
        spyOn(auth,'login').and.returnValue(Promise.resolve(true));
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it('call login',()=>{
        component.logIn();
        expect(auth.login).toHaveBeenCalled();
    });
    

});