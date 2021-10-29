import { TestBed, inject } from '@angular/core/testing';
import { Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

import { SecurityGuard } from './security.guard';

describe('SecurityGuard', () => {

  const routerService = jasmine.createSpyObj('Router',['navigate']);
  const authService = jasmine.createSpyObj('AuthService',['statusLogged']);
  const routerStateSnapshot = jasmine.createSpyObj('RouterStateSnapshot',['url']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecurityGuard,
      {
        provide: Router,
        useValue: routerService
      },{
        provide: AuthService,
        useValue: authService
      },{
        provide: RouterStateSnapshot,
        useValue: routerStateSnapshot
      }]
    });
  });

  it('should ...', inject([SecurityGuard], (guard: SecurityGuard) => {
    expect(guard).toBeTruthy();
  }));
});
