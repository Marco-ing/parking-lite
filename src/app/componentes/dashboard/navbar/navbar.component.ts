import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticarseSService } from 'src/app/service/autenticarse-s.service';
import { OcultarBarraService } from 'src/app/service/ocultar-barra.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public MostrarBarra: Boolean;
  public autenticarse: Boolean;
  public registrarse: Boolean;
  public cerrarsesion: Boolean;
  public user: Boolean;
  public modouso: Boolean;
  public registrarentrada: Boolean;
  public regisentradas: Boolean;
  public tarifas: Boolean;
  public pagarcuenta: Boolean;
  public iniciarsesion: Boolean;
  public nombre: string;

  constructor(private servicio: AutenticarseSService, private zone: NgZone, private ocultar: OcultarBarraService,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.router.url);
    this.servicio.getLoggedInName.subscribe(data => {
      if (data) {
        var a = JSON.parse(this.servicio.getToken());
        console.log(a.tipo);
        if (a.tipo == "Usuario") {
          this.autenticarse = true;
          this.registrarse = true;
          this.cerrarsesion = true;
          this.user = true;
          this.nombre = a.nombre;
          this.regisentradas = false;
          this.tarifas = false;
          this.iniciarsesion = false;
          this.pagarcuenta = true;
          console.log("weferf");
        } else if (a.tipo == "Administrador") {
          this.autenticarse = false;
          this.registrarse = true;
          this.cerrarsesion = true;
          this.user = true;
          this.nombre = a.nombre;
          this.regisentradas = true;
          this.tarifas = true;
          this.registrarentrada = true;
          this.modouso = true;
          this.iniciarsesion = false;
          this.pagarcuenta = false;
        }
      }
      else {
        this.registrarentrada = false;
        this.modouso = false;
        this.autenticarse = false;
        this.registrarse = false;
        this.cerrarsesion = false;
        this.user = false;
        this.nombre = "";
        this.regisentradas = false;
        this.tarifas = false;
        this.iniciarsesion = true;
        this.pagarcuenta = true;
      }
      this.MostrarBarra = false;
    })
    this.ocultar.login.subscribe(data => {
      if (data) {
        this.MostrarBarra = true;
      }
    });
  }

  CerrarSesion() {
    this.servicio.deleteToken();
    if(this.router.url == '/home'){
      location.reload();
    }
    else{
      if (!this.autenticarse) {
        this.router.navigate(['/home']);
      }
      if (this.tarifas) {
        this.router.navigate(['/home']);
      }
    }
    
  }
}
