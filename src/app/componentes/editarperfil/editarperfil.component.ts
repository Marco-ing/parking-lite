import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/Clases/Users';
import { AutenticarseSService } from 'src/app/service/autenticarse-s.service';
import { EditarPerfilService } from 'src/app/service/editar-perfil.service';
import { PerfilService } from 'src/app/service/perfil.service';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.css']
})

export class EditarperfilComponent implements OnInit {

    //Usuario a capturar
    UsuarioModificado:Users;
    Usuario:Users;

    constructor(private ServicioPerfil: PerfilService ,private ServicioEditarPerfil: EditarPerfilService, private servicio:AutenticarseSService, 
      private fb: FormBuilder) { }
  
    ngOnInit(): void {
      this.Usuario = JSON.parse(this.servicio.getToken());
      this.perfil.reset({
        nombre          : this.Usuario[1],
        apellidoPaterno : this.Usuario[2],
        apellidoMaterno : this.Usuario[3],
        correo          : this.Usuario[4],
        password        : this.Usuario[5],
        numeroTarjeta   : this.Usuario[6],
        titularTarjeta  : this.Usuario[7],
      })
      //console.log(this.Usuario);
    }
    
    //Formulario registrarse responsivo
    perfil: FormGroup = this.fb.group({
      nombre          : [,[Validators.required]],
      apellidoPaterno : ['',Validators.required],
      apellidoMaterno : ['',Validators.required],
      correo          : ['',[Validators.required,Validators.email]],
      password        : ['',[Validators.required]],
      numeroTarjeta   : ['',[Validators.required]],
      titularTarjeta  : ['',[Validators.required]]
    })
  
    //Funcion para validar campos
    campoEsValido(campo:string){
      return this.perfil.controls[campo].errors 
      && this.perfil.controls[campo].touched
    }
  
    //Guardar datos formulario
    guardar(){
      if(this.perfil.invalid){
        this.perfil.markAllAsTouched();
        return;
      }
  
      this.UsuarioModificado = new Users(0,
          this.perfil.value.nombre,
          this.perfil.value.apellidoPaterno,
          this.perfil.value.apellidoMaterno,
          this.perfil.value.correo,
          this.perfil.value.password,
          this.perfil.value.numeroTarjeta,
          this.perfil.value.titularTarjeta
      );
      //alert(this.UsuarioModificado);
      this.ServicioEditarPerfil.actualizar(this.UsuarioModificado).subscribe(datos => {
        if(datos['resultado']=='OK'){
          alert(datos['mensaje']);
        }
      }); 
      
    } 
}
