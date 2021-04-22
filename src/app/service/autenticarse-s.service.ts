import { Injectable,Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Users } from '../Clases/Users';


@Injectable({
  providedIn: 'root'
})
export class AutenticarseSService {

  redirectUrl:string;
  //Ruteo Marco Antonio
  //URL='http://localhost:81/parking-lite/PHP/';
  //baseURL:string='http://localhost:81/parking-lite/PHP/';
    URL='http://localhost/parking-lite/PHP/';
    baseURL:string='http://localhost/parking-lite/PHP/';

  @Output() getLoggedInName: EventEmitter<any>=new EventEmitter();

  constructor(private http: HttpClient,private httpClient: HttpClient) { }

  VerificarDatos(email,password){
    return this.httpClient.post<any>(this.baseURL+'Autenticarse.php',{email,password})
    .pipe(map(Users => {
      this.setToken(JSON.stringify(Users[0]));
      this.getLoggedInName.emit(true);
      return Users;
    }));
  }
  setToken(token:string){
    localStorage.setItem('token',token);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  deleteToken(){
    localStorage.removeItem('token');
  }
  isLoggedIn(){
    const usertoken=this.getToken();
    if(usertoken!=null){
      return true
    }
    return false;
  }
}
