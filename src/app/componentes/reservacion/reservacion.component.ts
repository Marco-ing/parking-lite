import { Component, OnInit } from '@angular/core';
import {ReservarService} from '../../service/reservar.service';
import {AutenticarseSService} from '../../service/autenticarse-s.service';
import {ObtenerTarifaHoraService} from '../../service/obtener-tarifa-hora.service';
import { FormsModule, FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.css']
})
export class ReservacionComponent implements OnInit {

  reservar: FormGroup;
  date: Date;
  submitted = false;
  tarifa: number;
  reser = {
    finicio:null,
    hinicio:null,
    hfinal:null,
  }

  constructor(private ReservarService: ReservarService,private servicio: AutenticarseSService,private http: HttpClient,
    private FormBuilder: FormBuilder, private router: Router, private sTarifa: ObtenerTarifaHoraService,
    private titleService: Title) { }

  ngOnInit(): void {
    this.reservar=this.FormBuilder.group({
      finicio:['',Validators.required],
      hinicio:['',Validators.required],
      hfinal:['',Validators.required]
    });
    this.date = new Date;
    this.sTarifa.getTarifa().pipe(first())
    .subscribe(data=>{
      this.tarifa=data[0].TarifaHora;
    });
    this.titleService.setTitle("Reservar");
  }

  get f() { return this.reservar.controls;}

  Valida():void{
    if(this.reservar.invalid){
      return;
    }
    this.Insertar(this.reservar);
  }

  Insertar(reservar):void{
    var a=JSON.parse(this.servicio.getToken());
    var socio = a.idsocio;
    this.ReservarService.InsertarDatos(reservar.value.finicio,reservar.value.hinicio,reservar.value.hfinal,socio,this.tarifa)
    .pipe(first())
    .subscribe(
        data =>{
          if(data == 1){
            Swal.fire({  
              icon: 'success',  
              title: 'Éxito',  
              text: 'La reservación se agendó correctamente',  
              confirmButtonText:'Aceptar'
            })
          }
          if(data == 2){
            alert("La fecha de inicio no puede ser menor al día de hoy");
          }
          if(data == 3){
            Swal.fire({  
              icon: 'error',  
              title: 'Error',  
              text: 'La hora de entrada o salida no coincide con nuestro horario de atención',  
              confirmButtonText:'Aceptar'
            })
          }
          if(data == 4){
            Swal.fire({  
              icon: 'error',  
              title: 'Error',  
              text: 'La hora de salida no puede ser menor que la de entrada',  
              confirmButtonText:'Aceptar'
            })
          }
        }
      );
  }
}
