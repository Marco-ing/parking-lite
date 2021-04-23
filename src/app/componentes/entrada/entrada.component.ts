import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule} from '@angular/forms';
import { AutenticarseSService } from 'src/app/service/autenticarse-s.service';
import { IngresarService } from 'src/app/service/ingresar.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {

  entrar:FormGroup;
  params = {
    id:null
  }
  
  public user:boolean;

  constructor(private autenticarse: AutenticarseSService,private http: HttpClient,
    private FormBuilder: FormBuilder, private ingresar: IngresarService) { }

  ngOnInit(): void {
    this.entrar=this.FormBuilder.group({
      id:['',Validators.required]
    });
    var a=JSON.parse(this.autenticarse.getToken());
        if(a.idsocio!=""){
          this.user = true;
        }
        else{
          this.user = false;
        }
  }

  Valida():void{
    if(this.entrar.invalid){
      return;
    }
    this.IngresaUsuario(this.entrar);
  }

  IngresaInvitado():void{
    this.ingresar.IngresarInvitado().pipe(first())
    .subscribe(
      data=>{
        if(data.resultado != 0){
          alert("¡Bienvenido! Su lugar asignado es el: "+data.lugar+". Su id para pagar es: "+data.resultado);
        }
      }
    );
  }

  IngresaUsuario(entrar):void{
    var a=JSON.parse(this.autenticarse.getToken());
    var socio = a.idsocio;
    this.ingresar.IngresarUsuario(entrar.value.id,socio).pipe(first())
    .subscribe(
      data=>{
        if(data == 0){
          (<HTMLInputElement>document.getElementById("respuesta")).innerHTML = "Tu reservación no es para este día";
        }
        else{
          alert("¡Bienvenido! Gracias por usar el servicio");
        }
      }
    );
  }
}
