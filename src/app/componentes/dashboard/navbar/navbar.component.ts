import { Component, NgZone, OnInit } from '@angular/core';
import { AutenticarseSService } from 'src/app/service/autenticarse-s.service';
import { OcultarBarraService } from 'src/app/service/ocultar-barra.service';
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
  public socio:string;

  constructor(private servicio:AutenticarseSService, private zone: NgZone, private ocultar:OcultarBarraService) { }

  ngOnInit(): void {
    this.servicio.getLoggedInName.subscribe(data =>{
      if(data){
        this.autenticarse=true;
        this.registrarse=true;
        this.cerrarsesion=true;
        this.user=true;
        this.nombre=this.servicio.getUser();
        this.socio=this.servicio.getSocio();
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
    this.ocultar.login.subscribe(data=>{
      if(data){
        this.MostrarBarra=true;
      }
    });
  }

  CerrarSesion(){
    this.servicio.deleteToken();
    this.zone.runOutsideAngular(() => {
      location.reload();
  });
  }
}
