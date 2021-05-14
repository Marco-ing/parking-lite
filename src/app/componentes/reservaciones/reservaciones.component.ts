import { Component, OnInit } from '@angular/core';
import { AutenticarseSService } from '../../service/autenticarse-s.service';
import { ReservacionesService } from '../../service/reservaciones.service';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css']
})
export class ReservacionesComponent implements OnInit {

  reservaciones = null;
  constructor(private reservacionesServicio: ReservacionesService, private autenticarse: AutenticarseSService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.mostrarTodos();
    this.titleService.setTitle("Reservaciones");
  }
  mostrarTodos() {
    var a = JSON.parse(this.autenticarse.getToken());
    this.reservacionesServicio.mostrarTodos(a.correo).subscribe(result => {//
      this.reservaciones = result;// puede que falle

    });
  }
  eliminar(id_res, id_esta) {
    Swal.fire({
      title: "Eliminar reservación",
      text: '¿Seguro que desea eliminar esta reservacion?',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservacionesServicio.eliminarReservacion(id_res, id_esta).subscribe(result => {
          if (result['response'] == '1') {
            this.mostrarTodos();
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: 'Reservacion cancelada satisfactoriamente',
              confirmButtonText: 'Aceptar'
            })

          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error de Servicio',
              text: 'Ocurrió algun error inesperado',
              confirmButtonText: 'Aceptar'
            })
          }
        });
      }
    })
  }
  obtenerHora(fecha_hora) {
    return fecha_hora.substring(10, 19);
  }

}
