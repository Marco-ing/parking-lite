import { Component, OnInit } from '@angular/core';
import {ReservarService} from '../../service/reservar.service';
import {AutenticarseSService} from '../../service/autenticarse-s.service';
import { FormsModule, FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.css']
})
export class ReservacionComponent implements OnInit {

  reservar: FormGroup;
  submitted = false;
  reser = {
    finicio:null,
    ffinal:null,
    hinicio:null,
    hfinal:null,
  }

  constructor(private ReservarService: ReservarService,private servicio: AutenticarseSService,private http: HttpClient,
    private FormBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.reservar=this.FormBuilder.group({
      finicio:['',Validators.required],
      ffinal:['',Validators.required],
      hinicio:['',Validators.required],
      hfinal:['',Validators.required]
    });
  }

  get f() { return this.reservar.controls;}

  Valida():void{
    if(this.reservar.invalid){
      return;
    }
    this.Insertar(this.reservar);
  }

  Insertar(reservar):void{
    var socio = this.servicio.getSocio();
    this.ReservarService.InsertarDatos(reservar.value.finicio,reservar.value.hinicio,reservar.value.ffinal,reservar.value.hfinal,socio)
    .pipe(first())
    .subscribe(
        data =>{
          if(data){
            alert("inserción correcta");
          }
        }
      );
  }
}
