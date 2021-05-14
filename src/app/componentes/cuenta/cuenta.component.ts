import { Component, OnInit } from '@angular/core';
import { RelojService, valorReloj } from '../../service/reloj.service';
import { ObtenerTarifaHoraService } from '../../service/obtener-tarifa-hora.service';
import { FormsModule, FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule} from '@angular/forms';
import { Observable } from 'rxjs';
import {PagarventaService} from '../../service/pagarventa.service';
import Swal from 'sweetalert2';
import { first } from 'rxjs/operators';
import { formatDate } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  constructor(private segundo: RelojService, private venta: PagarventaService, private sTarifa:ObtenerTarifaHoraService,
    private FormBuilder: FormBuilder,private titleService: Title) { }

  datos$: Observable<valorReloj>;
  hora: number;
  minutos: string;
  dia: string;
  fecha: string;
  segundos: string;
  tarifa: number;
  auxHora: string;
  auxMin: string;
  auxSeg: string;

  date: string;
  dataventa: FormGroup;
  submitted = false;
  varaux:string;
  horas:number;

  ngOnInit(): void {
    this.dataventa=this.FormBuilder.group({
      id:['',Validators.required]
    })
    this.datos$=this.segundo.getInfoReloj();
    this.datos$.subscribe(x => {
      this.hora = x.hora;
      this.minutos = x.minutos;
      this.dia = x.diadesemana.toUpperCase();;
      this.fecha = x.diaymes.toUpperCase();;
      this.segundos = x.segundo
    });

    this.date = formatDate(new Date(), 'yyyy-MM-dd', 'en');

    this.sTarifa.getTarifa().pipe(first())
    .subscribe(data=>{
      this.tarifa=data[0].TarifaHora;
    });
    this.titleService.setTitle("Pagar Cuenta");
  }

  Salir():void{
    if(this.dataventa.invalid){
      return;
    }
    this.MarcarSalida(this.dataventa);
  }

  Pagar():void{
    if(this.submitted){
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'PAGO',
        text: "Cantidad a pagar: $"+this.horas*this.tarifa,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.venta.pagarVenta(this.dataventa.value.id,this.date+" "+this.auxHora+":"+this.auxMin+":"+this.auxSeg,this.horas*this.tarifa)
          .pipe(first())
          .subscribe(
            data=>{
              if(data==1){
                swalWithBootstrapButtons.fire(
                  '¡Gracias por su pago!',
                  'Le agradecemos usar nuestro servicio',
                  'success'
                )
                this.submitted = false;
                this.dataventa.reset();
                (<HTMLInputElement>document.getElementById("entrada")).innerHTML = "Hora de entrada: ";
                (<HTMLInputElement>document.getElementById("salida")).innerHTML = "Hora de salida: ";
                (<HTMLInputElement>document.getElementById("horas")).innerHTML = "Número de horas: ";
                (<HTMLInputElement>document.getElementById("monto")).innerHTML = "Monto: $";
              }
            }
          );
          
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          this.submitted = false;
          this.dataventa.reset();
          (<HTMLInputElement>document.getElementById("entrada")).innerHTML = "Hora de entrada: ";
          (<HTMLInputElement>document.getElementById("salida")).innerHTML = "Hora de salida: ";
          (<HTMLInputElement>document.getElementById("horas")).innerHTML = "Número de horas: ";
          (<HTMLInputElement>document.getElementById("monto")).innerHTML = "Monto: $";
        }
      })
    }
    else{
      Swal.fire({  
        icon: 'error',  
        text: 'Debes ingresar un ID válido',  
        confirmButtonText:'Aceptar'  
      }) 
    }
  }

  MarcarSalida(dataventa):void{
    this.venta.getVenta(dataventa.value.id)
    .pipe(first())
    .subscribe(
      data=>{
        if(data==0){
          Swal.fire({  
            icon: 'error',  
            title: 'Error de ID',  
            text: 'El ID proporcionado no es correcto',  
            confirmButtonText:'Aceptar'  
          })  
        }
        else{
          if(!this.submitted){
            this.varaux = data;
            if(this.hora<10){
              this.auxHora = "0"+this.hora.toString();
            }
            else{
              this.auxHora = this.hora.toString();
            }
            this.auxMin = this.minutos;
            this.auxSeg = this.segundos;
            (<HTMLInputElement>document.getElementById("entrada")).innerHTML += data;
            (<HTMLInputElement>document.getElementById("salida")).innerHTML += this.auxHora+":"+this.auxMin+":"+this.auxSeg;
            this.horas = Number(this.auxHora)-Number(this.varaux.substring(0,2));
            if(Number(this.auxMin)>Number(this.varaux.substring(3,5))){
              this.horas++;
            }
            (<HTMLInputElement>document.getElementById("horas")).innerHTML += this.horas;
            (<HTMLInputElement>document.getElementById("monto")).innerHTML += this.horas*this.tarifa;
          }
          this.submitted=true;
        }
      }
    );
  }

}
