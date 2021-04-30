import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

//Este servicio es exclusivo para modificar tarifa por hora
@Injectable({
  providedIn: 'root'
})
export class TarifaService {
  URL='http://localhost/parking-lite/PHP/';

  constructor(private http: HttpClient,private httpClient: HttpClient) { }

  mostrarTarifa(){
    return this.http.get(this.URL+"mostrarTarifa.php")
    .pipe(map(data=>{
      return data;
    }));
  }
  actualizarTarifa(tarifa){
    return this.httpClient.post<any>(this.URL+'editarTarifa.php',{tarifa})
    .pipe(map(Reser => {
      console.log('Respuesta Servicio '+Reser);
      return Reser;
    }));
  }
}
