import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticarseSService } from './service/autenticarse-s.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private autenticarsesservice: AutenticarseSService,private rotue:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const routeurl:string=state.url;
      return this.isLogin(routeurl);
  }
  isLogin(routeurl){
    if(this.autenticarsesservice.isLoggedIn()){
      return true;
    }
    this.autenticarsesservice.redirectUrl=routeurl;
    this.rotue.navigate(['/autenticarse'],{queryParams: {returnUrl:routeurl}});
  }
}
