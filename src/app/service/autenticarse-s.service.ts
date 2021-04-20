import { Injectable,Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Users } from '../Users';


@Injectable({
  providedIn: 'root'
})
export class AutenticarseSService {

  redirectUrl:string;
  URL='http://localhost/parking-lite/PHP/';
  baseURL:string='http://localhost/parking-lite/PHP/';

  @Output() getLoggedInName: EventEmitter<any>=new EventEmitter();

  constructor(private http: HttpClient,private httpClient: HttpClient) { }

  VerificarDatos(email,password){
    return this.httpClient.post<any>(this.baseURL+'Autenticarse.php',{email,password})
    .pipe(map(Users => {
    this.setToken(Users[0].correo,Users[0].nombre);
      this.getLoggedInName.emit(true);
      return Users;
    }));
  }
  setToken(token:string,user:string){
    localStorage.setItem('token',token);
    localStorage.setItem('user',user);
  }
  getToken(){
    return localStorage.getItem('token');
  }
  getUser(){
    return localStorage.getItem('user');
  }
  deleteToken(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  isLoggedIn(){
    const usertoken=this.getToken();
    if(usertoken!=null){
      return true
    }
    return false;
  }
}
