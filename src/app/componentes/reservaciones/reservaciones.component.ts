import { Component, OnInit } from '@angular/core';
import { AutenticarseSService } from '../../service/autenticarse-s.service';
import { ReservacionesService } from '../../service/reservaciones.service';

@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css']
})
export class ReservacionesComponent implements OnInit {

  reservaciones = null;
  constructor(private reservacionesServicio: ReservacionesService, private autenticarse: AutenticarseSService) { }

  ngOnInit(): void {
    this.mostrarTodos();
    // console.log(this.reservaciones);
  }
  mostrarTodos(){
    var a=JSON.parse(this.autenticarse.getToken());
    this.reservacionesServicio.mostrarTodos(a.correo).subscribe( result => {//
    this.reservaciones = result;// puede que falle

    });
  }
  eliminar(id_res,id_esta){
    let r = confirm("¿Seguro que desea eliminar esta reservacion?");
    if (r == true) {
      this.reservacionesServicio.eliminarReservacion(id_res,id_esta).subscribe(result => {
        if(result['response'] == '1'){
          this.mostrarTodos();
          alert('Reservacion cancelada satisfactoriamente');

        }else{
          alert('Ocurrio un error en el servicio');
        }
      });


    }

  }
  obtenerHora(fecha_hora){
    return fecha_hora.substring(10,19);
  }

}
