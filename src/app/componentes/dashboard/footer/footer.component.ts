import { Component, OnInit } from '@angular/core';
import { AutenticarseSService } from 'src/app/service/autenticarse-s.service';
import { OcultarBarraService } from 'src/app/service/ocultar-barra.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public MostrarFooter:Boolean;
  constructor(private servicio:AutenticarseSService,private ocultar:OcultarBarraService) { }

  ngOnInit(): void {
    this.servicio.getLoggedInName.subscribe(data=>{
        this.MostrarFooter=false;
    });
    this.ocultar.login.subscribe(data=>{
      if(data){
        this.MostrarFooter=true;
      }
    })
  }

}
