import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class RegistrarseService {
  
  url = 'http://localhost/parking-lite/PHP/';  //Direccion servidor PHP

  constructor(private http: HttpClient) { }

  
}
