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
  URL='http://localhost/parking-lite/PHP/';
  baseURL:string='http://localhost/parking-lite/PHP/';

  redirectUrl:string;
  constructor(private http:HttpClient) { }

  getTarifa(){
    return this.http.get(this.baseURL+"Tarifa.php")
    .pipe(map(data=>{
      return data;
    }));
  }

  insertMem(id,fechainicio,fechafinal,monto){
    var dia=fechainicio.day;
    var mes=fechainicio.month;
    var anio=fechainicio.year;
    var diaf=fechafinal.day;
    var mesf=fechafinal.month;
    var aniof=fechafinal.year;
    return this.http.post<any>(this.baseURL+"InsertarMembresia.php",{id,anio,mes,dia,monto,diaf,mesf,aniof})
    .pipe(map(data=>{
      return data;
    }));
  }
}
