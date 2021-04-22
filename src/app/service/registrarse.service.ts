import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Users } from '../Users';


@Injectable({
  providedIn: 'root'
})

export class RegistrarseService {
  
  url = 'http://localhost/parking-lite/PHP/';  //Direccion servidor PHP

  constructor(private http: HttpClient) { }

  //Solicitud GET donde se envía el correo por medio de la URL
  verificarCorreo(correo:string){
    return this.http.get('${this.url}verificarCorreo.php?correo=${correo}');
  }

  //Se envia solicitud post para registrar un nuevo usuario, se envia al usuario 
  registrarse(usuario:Users){
    return this.http.post('${this.url}registrar.php',JSON.stringify(usuario));
  }

}
