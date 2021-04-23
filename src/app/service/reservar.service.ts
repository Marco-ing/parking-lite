import { Injectable,Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservarService {

  redirectUrl:string;
  URL='http://localhost/ParkingWeb/';
  baseURL:string='http://localhost/parking-lie/PHP/';

  constructor(private http: HttpClient,private httpClient: HttpClient) { }

  InsertarDatos(finicio,hinicio,hfinal,socio){
    return this.httpClient.post<any>(this.baseURL+'Reservar.php',{finicio,hinicio,hfinal,socio})
    .pipe(share());
  }

}
