import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Users } from '../Clases/Users';


@Injectable({
  providedIn: 'root'
})

export class RegistrarseService {
  //Cambie el puerto de ejecucion
  URL = 'http://localhost/parking-lite/PHP/';  //Direccion servidor PHP

  constructor(private http: HttpClient) { }

  //Se envia solicitud post para registrar un nuevo usuario, se envia al usuario
  alta(usuario:Users){
    return this.http.post<any>(this.URL+'Registrarse.php',(usuario));
  }
}
