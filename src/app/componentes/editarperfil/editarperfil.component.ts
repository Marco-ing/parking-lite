import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/Clases/Users';
import { AutenticarseSService } from 'src/app/service/autenticarse-s.service';
import { EditarPerfilService } from 'src/app/service/editar-perfil.service';
import { PerfilService } from 'src/app/service/perfil.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.css']
})

export class EditarperfilComponent implements OnInit {

  //Usuario a capturar
  UsuarioModificado: Users;
  Usuario: Users;
  correo: String;

  constructor(private ServicioPerfil: PerfilService, private ServicioEditarPerfil: EditarPerfilService,
    private servicio: AutenticarseSService, private fb: FormBuilder, private router: Router, private zone: NgZone,
    private titleService: Title) { }

  ngOnInit(): void {
    this.Usuario = JSON.parse(this.servicio.getToken());
    this.perfil.reset({
      nombre: this.Usuario[1],
      apellidoPaterno: this.Usuario[2],
      apellidoMaterno: this.Usuario[3],
      correo: this.Usuario[4],
      password: this.Usuario[5],
      numeroTarjeta: this.Usuario[6],
      titularTarjeta: this.Usuario[7],
    })
    //console.log(this.Usuario);
    this.titleService.setTitle("Editar Perfil");
    

  }

  //Formulario registrarse responsivo
  perfil: FormGroup = this.fb.group({
    nombre: [, [Validators.required]],
    apellidoPaterno: ['', Validators.required],
    apellidoMaterno: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    numeroTarjeta: ['', [Validators.required]],
    titularTarjeta: ['', [Validators.required]]
  })

  //Funcion para validar campos
  campoEsValido(campo: string) {
    return this.perfil.controls[campo].errors
      && this.perfil.controls[campo].touched
  }

  //Guardar datos formulario
  guardar() {
    if (this.perfil.invalid) {
      this.perfil.markAllAsTouched();
      return;
    }

    

    Swal.fire({
      title: "Modificar datos",
      text: '¿Desea modificar los datos de su cuenta?',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if(result.isConfirmed){
        this.UsuarioModificado = new Users(0,
          this.perfil.value.nombre,
          this.perfil.value.apellidoPaterno,
          this.perfil.value.apellidoMaterno,
          this.perfil.value.correo,
          this.perfil.value.password,
          this.perfil.value.numeroTarjeta,
          this.perfil.value.titularTarjeta
        );
        this.ServicioEditarPerfil.actualizar(this.UsuarioModificado).subscribe(datos => {
          if (datos['resultado'] == 'OK') {
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: datos['mensaje'],
              confirmButtonText: 'Aceptar'
            })
          }
        });
        this.ActualizarInformacion();
      }
      this.ActualizarInformacion();
    })

  

    

    /* SE VUELVE A LLAMAR EL MÉTODO DE AUTENTICACION PARA CARGAR LA NUEVA INFORMACION */
  }


  /* ELIMINAR CUENTA */
  eliminarCuenta() {
    //alert(this.Usuario[4]);
    this.correo = this.Usuario[4];
    Swal.fire({
      title: "Eliminar usuario",
      text: '¿Seguro que desea eliminar la cuenta?',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.ServicioEditarPerfil.eliminar(this.correo).subscribe(datos => {
          if (datos['resultado'] == 'OK') {
            Swal.fire({
              icon: 'success',
              title: 'Éxito',
              text: datos['mensaje'],
              confirmButtonText: 'Aceptar'
            }).then(() => {
              const redirect = this.servicio.redirectUrl ? this.servicio.redirectUrl : '/home';
              this.router.navigate([redirect]);
              this.CerrarSesion();
            })
          }
        });
      }
    })

    //location.reload();

  }

  CerrarSesion() {
    this.servicio.deleteToken();
    this.zone.runOutsideAngular(() => {
    });
  }

  ActualizarInformacion() {
    this.servicio.VerificarDatos(this.UsuarioModificado.correo, this.UsuarioModificado.password)
      .subscribe(
        data => {
          const redirect = this.servicio.redirectUrl ? this.servicio.redirectUrl : '/editar-perfil';
          this.router.navigate([redirect]);
        }
      );
  }
  
}
