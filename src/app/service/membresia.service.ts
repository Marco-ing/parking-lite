import { HttpClient } from '@angular/common/http';
import { Injectable,Output,EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MembresiaService {

  baseURL:string='http://localhost/parking-lite/PHP/';

  constructor(private http:HttpClient) { }

  getTarifa(){
    return this.http.get(this.baseURL+"Tarifa.php")
    .pipe(map(data=>{
      return data;
    }));
  }
}
