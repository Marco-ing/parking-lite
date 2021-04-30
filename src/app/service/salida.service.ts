import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SalidaService {
  
  URL = 'http://localhost/parking-lite/PHP/';
  constructor(private http: HttpClient) { }

  RegistrarSalida(idReserva){
    return this.http.post<any>(this.URL+'registrarSalida.php',{idReserva});
  }
}
