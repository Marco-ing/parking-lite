import { Injectable,Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import {Reservacion} from '../Clases/Reservacion';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservarService {

  redirectUrl:string;
  URL='http://localhost/ParkingWeb/';
  baseURL:string='http://localhost/ParkingWeb/';

  constructor(private http: HttpClient,private httpClient: HttpClient) { }

  InsertarDatos(finicio,hinicio,ffinal,hfinal,socio){
    return this.httpClient.post<any>(this.baseURL+'Reservar.php',{finicio,hinicio,ffinal,hfinal,socio})
    .pipe(share());
  }

}
