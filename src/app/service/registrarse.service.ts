import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Users } from '../Clases/Users';


@Injectable({
  providedIn: 'root'
})

export class RegistrarseService {
  
  URL = 'http://localhost/parking-lite/PHP/';  //Direccion servidor PHP

  constructor(private http: HttpClient) { }

  //Solicitud GET donde se envía el correo por medio de la URL
  verificarCorreo(correo:string){
    return this.http.get('${this.URL}Registrarse.php?correo=${correo}');
  }

  //Se envia solicitud post para registrar un nuevo usuario, se envia al usuario 
  alta(usuario:Users){
    return this.http.post<any>(this.URL+'Registrarse.php',(usuario));
  }


}
