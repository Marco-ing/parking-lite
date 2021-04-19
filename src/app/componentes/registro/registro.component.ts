import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }
  

  //Formulario registrarse responsivo
  registrarse: FormGroup = this.fb.group({
    nombre          : ['',[Validators.required]],
    apellidoPaterno : ['',Validators.required],
    apellidoMaterno : ['',Validators.required],
    correo          : ['',[Validators.required,Validators.email]],
    password          : ['',[Validators.required]],
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
    console.log(this.registrarse.value);
    
  }
}
