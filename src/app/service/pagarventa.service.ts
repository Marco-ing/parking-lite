import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagarventaService {

  URL = 'http://localhost/parking-lite/PHP/';

  constructor(private http: HttpClient) { }

  getVenta(id){
  return this.http.post<any>(this.URL+'getVenta.php',(id));
  }

  pagarVenta(id,ffinal,monto){
    return this.http.post<any>(this.URL+'pagarventa.php',{id,ffinal,monto});
  }
}
