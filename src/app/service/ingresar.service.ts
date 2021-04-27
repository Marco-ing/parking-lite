import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IngresarService {

  URL = 'http://localhost/parking-lite/PHP/';
  constructor(private http: HttpClient) { }

  IngresarUsuario(idreserv,socio){
    return this.http.post<any>(this.URL+'ingresarUsuario.php',{idreserv,socio});
  }

  IngresarInvitado(){
    return this.http.post<any>(this.URL+'ingresarInvitado.php',{});
  }
}
