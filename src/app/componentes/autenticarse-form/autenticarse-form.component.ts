import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {AutenticarseSService} from '../../service/autenticarse-s.service';
import { FormsModule, FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule} from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-autenticarse-form',
  templateUrl: './autenticarse-form.component.html',
  styleUrls: ['./autenticarse-form.component.css']
})
export class AutenticarseFormComponent implements OnInit {

  autenticarse: FormGroup;
  submitted = false;
  login={
    idusuario:null,
    email:null,
    password:null
  }
  constructor(private AutenticarseSService: AutenticarseSService,private http: HttpClient,
    private FormBuilder: FormBuilder, private router: Router,
    private titleService: Title) { }

  ngOnInit(): void {
    this.autenticarse=this.FormBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    });
    this.titleService.setTitle("Iniciar Sesión");
  }

  get f() { return this.autenticarse.controls;}

  Autenticarse():void{
    this.submitted=true;
    if(this.autenticarse.invalid){
      return;
    }
    this.Autenticarse_(this.autenticarse);
  }

  ventana4(){
    
  }

  Autenticarse_(autenticarse):void{
    this.AutenticarseSService.VerificarDatos(autenticarse.value.email,autenticarse.value.password)
    .pipe(first())
    .subscribe(
      data =>{
        if(data[0].contrasenia==""){
          Swal.fire({  
            icon: 'error',  
            title: 'Contraseña incorrecta',  
            text: 'La contraseña que se introdujo es incorrecta.',  
            confirmButtonText:'Aceptar'  
          })  
        }
        else{
          if(data[0].tipo=="Usuario"){
            const redirect=this.AutenticarseSService.redirectUrl ? this.AutenticarseSService.redirectUrl: '/home';
            this.router.navigate([redirect]);
          }
          else if(data[0].tipo=="Administrador"){
            const redirect=this.AutenticarseSService.redirectUrl ? this.AutenticarseSService.redirectUrl: '/administrador';
            this.router.navigate([redirect]);
          }
          
        }
      },
      error => {
        Swal.fire({  
          icon: 'error',  
          title: 'Usuario no registrado',  
          text: 'EL correo electronico no esta registrado en Parking Lite.',  
          confirmButtonText:'Aceptar'  
        })  
      }
    );
  }
}
