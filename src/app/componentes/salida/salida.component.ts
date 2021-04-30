import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AutenticarseSService } from 'src/app/service/autenticarse-s.service';
import { IngresarService } from 'src/app/service/ingresar.service';
import { RelojService, valorReloj } from 'src/app/service/reloj.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { first } from 'rxjs/operators';
import { SalidaService } from 'src/app/service/salida.service';

@Component({
  selector: 'app-salida',
  templateUrl: './salida.component.html',
  styleUrls: ['./salida.component.css']
})
export class SalidaComponent implements OnInit {
  //Formulario registrar salida
  registrarSalida: FormGroup = this.FormBuilder.group({
    idReserva : ['',[Validators.required,Validators.min(1)]],
  })
 

  constructor(private autenticarse: AutenticarseSService,private http: HttpClient,
    private FormBuilder: FormBuilder, private ingresar: SalidaService, private segundo: RelojService) { }

    datos$: Observable<valorReloj>;
    hora: number;
    minutos: string;
    dia: string;
    fecha: string;
    ampm: string;
    segundos: string;



  ngOnInit(): void {
    this.datos$=this.segundo.getInfoReloj();
    this.datos$.subscribe(x => {
      this.hora = x.hora;
      this.minutos = x.minutos;
      this.dia = x.diadesemana.toUpperCase();
      this.fecha = x.diaymes.toUpperCase();
      this.segundos = x.segundo
    });
  }
  //Funcion para validar campos
  campoEsValido(campo:string){
    return this.registrarSalida.controls[campo].errors
    && this.registrarSalida.controls[campo].touched
  }

  RegistrarSalida():void{
    this.ingresar.RegistrarSalida(this.registrarSalida.value.idReserva,).pipe(first())
    .subscribe(
      data=>{
        
        if(data == 1){
          Swal.fire({  
            icon: 'success',  
            title: '¡Salida marcada con exito!',  
            text: 'Gracias por usar nuestro servicio',  
            confirmButtonText:'Aceptar'
          }) 
        }
        if(data == 0){
          Swal.fire({  
            icon: 'error',  
            title: 'Error',  
            text: 'Algo salio mal, intenta mas tarde',  
            confirmButtonText:'Aceptar'
          }) 
        }
        if(data == 2){
          Swal.fire({  
            icon: 'error',  
            title: 'Error de id',  
            text: 'No hay una reserva en curso para este id '+this.registrarSalida.value.idReserva+'',  
            confirmButtonText:'Aceptar'
          }) 
        }
      }
    ); 
  } 
}
