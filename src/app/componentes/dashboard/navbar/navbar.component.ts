import { Component, NgZone, OnInit } from '@angular/core';
import { AutenticarseSService } from 'src/app/service/autenticarse-s.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public MostrarBarra:Boolean;
  public autenticarse:Boolean;
  public registrarse:Boolean;
  public cerrarsesion:Boolean;
  public user:Boolean;
  public nombre:string;

  constructor(private servicio:AutenticarseSService, private zone: NgZone) { }

  ngOnInit(): void {
    this.servicio.getLoggedInName.subscribe(data =>{
      if(data){
        this.autenticarse=true;
        this.registrarse=true;
        this.cerrarsesion=true;
        this.user=true;
        this.nombre=this.servicio.getUser();
      }
      else{
        this.autenticarse=false;
        this.registrarse=false;
        this.cerrarsesion=false;
        this.user=false;
        this.nombre="";
      }
      this.MostrarBarra=false;
    })
  }

  Ocultarbarra(): void{
    this.MostrarBarra=true;
  }
  CerrarSesion(){
    this.servicio.deleteToken();
    this.zone.runOutsideAngular(() => {
      location.reload();
  });
  }
}
