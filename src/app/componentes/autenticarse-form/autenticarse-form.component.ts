import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {AutenticarseSService} from '../../service/autenticarse-s.service';
import { FormsModule, FormGroup, FormBuilder, Validators, NgForm, ReactiveFormsModule} from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

declare var ventana4:any;

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
    private FormBuilder: FormBuilder, private router: Router ) { }

  ngOnInit(): void {
    this.autenticarse=this.FormBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    });
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
    this.ventana4;
  }

  Autenticarse_(autenticarse):void{
    this.AutenticarseSService.VerificarDatos(autenticarse.value.email,autenticarse.value.password)
    .pipe(first())
    .subscribe(
      data =>{
        const redirect=this.AutenticarseSService.redirectUrl ? this.AutenticarseSService.redirectUrl: '/home';
        this.router.navigate([redirect]);
      },
      error => {
        ventana4();
      }
    );
  }
}
