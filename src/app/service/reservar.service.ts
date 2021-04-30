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
  baseURL:string='http://localhost/parking-lite/PHP/';

  constructor(private http: HttpClient,private httpClient: HttpClient) { }

  InsertarDatos(finicio,hinicio,hfinal,socio,tarifa){
    return this.httpClient.post<any>(this.baseURL+'Reservar.php',{finicio,hinicio,hfinal,socio,tarifa})
    .pipe(share());
  }

}
