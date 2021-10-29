import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree,RouterStateSnapshot } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityGuard implements CanActivate {

  constructor(private router:Router,private authService:AuthService){
  }
  canActivate(_next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(state.url.indexOf('usuario/crear') !== -1){
        return true;
    }
    if(!this.authService.statusLogged()){
      this.router.navigate(['login'],{});
      return false;
    }
    return true;
  }

}
