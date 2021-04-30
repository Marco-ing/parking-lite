import { MostrarEntradasComponent } from './../mostrar-entradas/mostrar-entradas.component';
import { Component, OnInit } from '@angular/core';
import { TarifaService } from '../../service/tarifa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-administrador-tarifa',
  templateUrl: './administrador-tarifa.component.html',
  styleUrls: ['./administrador-tarifa.component.css']
})
export class AdministradorTarifaComponent implements OnInit {

  montoTarifa: number;
  constructor(private service: TarifaService) { }

  ngOnInit(): void {
    this.service.mostrarTarifa()
    .subscribe(data=>{
      this.montoTarifa=data[0].TarifaHora;
    });
  }

  actualizarTarifa(){
    this.service.actualizarTarifa(this.montoTarifa).subscribe(response => {
      if(response['response'] == '1'){
        Swal.fire({
          icon: 'info',
          title: 'Tarifa',
          text: 'La tarifa se actualizo correctamente',
          confirmButtonText:'Aceptar'
        })

      }else{
        alert('Ocurrio un error en el servicio');
      }
    });
  }

}
