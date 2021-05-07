import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OcultarBarraService } from '../service/ocultar-barra.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticarseGuard implements CanActivate {
  constructor(private ocultar:OcultarBarraService,private rotue:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      const routeurl:string=state.url;
      return this.isLogin(routeurl);
  }
  
  isLogin(routerurl){
    if(!localStorage.getItem("token")){
      this.ocultar.login.emit(true);
      return true;
    }
    this.ocultar.redirectUrl=routerurl;
    this.rotue.navigate(['/home'],{queryParams: {returnUrl:routerurl}});
  }
}
