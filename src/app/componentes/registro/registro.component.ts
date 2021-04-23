import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrarseService } from 'src/app/service/registrarse.service';
import { HttpClient } from '@angular/common/http';
import { Users } from 'src/app/Clases/Users';

import { stringify } from '@angular/compiler/src/util';
import { Router } from '@angular/router';
import { AutenticarseSService } from 'src/app/service/autenticarse-s.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  //Usuario a capturar
  Usuario:Users;

  constructor(private registroServicio: RegistrarseService ,private fb: FormBuilder, private router: Router, private servicio:AutenticarseSService) { }

  ngOnInit(): void {

  }

  //Formulario registrarse responsivo
  registrarse: FormGroup = this.fb.group({
    nombre          : ['',[Validators.required]],
    apellidoPaterno : ['',Validators.required],
    apellidoMaterno : ['',Validators.required],
    correo          : ['',[Validators.required,Validators.email]],
    password        : ['',[Validators.required]],
    numeroTarjeta   : ['',[Validators.required]],
    titularTarjeta  : ['',[Validators.required]]
  })

  //Funcion para validar campos
  campoEsValido(campo:string){
    return this.registrarse.controls[campo].errors
    && this.registrarse.controls[campo].touched
  }

  //Guardar datos formulario
  guardar(){
    if(this.registrarse.invalid){
      this.registrarse.markAllAsTouched();
      return;
    }

    this.Usuario = new Users(0,
        this.registrarse.value.nombre,
        this.registrarse.value.apellidoPaterno,
        this.registrarse.value.apellidoMaterno,
        this.registrarse.value.correo,
        this.registrarse.value.password,
        this.registrarse.value.numeroTarjeta,
        this.registrarse.value.titularTarjeta
    );

    this.alta();
  }

  alta(){
    this.registroServicio.alta(this.Usuario).subscribe(datos => {
      if(datos['resultado']=='OK'){
        alert(datos['mensaje']);
      }
    });
    const redirect=this.servicio.redirectUrl ? this.servicio.redirectUrl: '/autenticarse';
    this.router.navigate([redirect]); 
  }


}
