import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../Clases/Users';

@Injectable({
  providedIn: 'root'
})
export class EditarPerfilService {
  URL = 'http://localhost/parking-lite/PHP/';  //Direccion servidor PHP

  constructor(private http: HttpClient) { }

  //Solicitud update de usuario
  actualizar(usuario:Users){
    return this.http.post<any>(this.URL+'EditarPerfil.php',(usuario));
  }
}
