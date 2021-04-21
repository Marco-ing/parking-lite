import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ReservacionesService {

  URL='http://localhost:81/parking-lite/PHP/';
  //URL='http://localhost/parking-lite/PHP/';
  constructor(private http: HttpClient,private httpClient: HttpClient) { }
  mostrarTodos(correo){
    return this.httpClient.post<any>(this.URL+'mostrarReservaciones.php',{correo})
    .pipe(map(Reser => {
      return Reser;
    }));

  };
  eliminarReservacion(id_reservacion,id_estacionamiento){
    return this.httpClient.post<any>(this.URL+'eliminarReservacion.php',{id_reservacion, id_estacionamiento})
    .pipe(map(Reser => {
      console.log('Respuesta Servicio '+Reser);
      return Reser;
    }));
  }
}
