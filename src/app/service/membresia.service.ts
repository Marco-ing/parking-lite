import { HttpClient } from '@angular/common/http';
import { Injectable,Output,EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MembresiaService {
  //Ruteo de servidor Marco
  //baseURL:string='http://localhost:81/parking-lite/PHP/';
  //baseURL:string='http://localhost/parking-lite/PHP/';

  //URL Daniel
  URL='http://localhost/ParkingWeb/';
  baseURL:string='http://localhost/ParkingWeb/';

  constructor(private http:HttpClient) { }

  getTarifa(){
    return this.http.get(this.baseURL+"Tarifa.php")
    .pipe(map(data=>{
      return data;
    }));
  }

  insertMem(id,fechainicio,monto){
    return this.http.post<any>(this.baseURL+"InsertarMembresia.php",{id,fechainicio,monto})
    .pipe(map(data=>{
      return data;
    }));
  }
}
