import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MostarEntradasService {
  URL='http://localhost/parking-lite/PHP/';
  baseURL:string='http://localhost/parking-lite/PHP/';
  constructor(private http:HttpClient) { }

  getMembresia(){
    return this.http.get(this.baseURL+"Membresia.php")
    .pipe(map(data=>{
      return data;
    }));
  }

  getReservaciones(){
    return this.http.get(this.baseURL+"Reservacion.php")
    .pipe(map(data=>{
      return data;
    }));
  }
}
