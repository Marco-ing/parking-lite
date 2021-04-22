import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/dashboard/navbar/navbar.component';
import { HomeComponent } from './componentes/home/home.component';
import { UsoComponent } from './componentes/uso/uso.component';
import { EntradaComponent } from './componentes/entrada/entrada.component';
import { CuentaComponent } from './componentes/cuenta/cuenta.component';
import { FooterComponent } from './componentes/dashboard/footer/footer.component';
import { AutenticarseFormComponent } from './componentes/autenticarse-form/autenticarse-form.component';

import { AutenticarseSService } from './service/autenticarse-s.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MembresiaComponent } from './componentes/membresia/membresia.component';
import { EditarperfilComponent } from './componentes/editarperfil/editarperfil.component';
//Ver Reservaciones
import { ReservacionesComponent } from './componentes/reservaciones/reservaciones.component';
//Hacer reservación v
import { ReservacionComponent } from './componentes/reservacion/reservacion.component';
import { ReservarService } from './service/reservar.service';
//Registrarse
import { RegistroComponent } from './componentes/registro/registro.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UsoComponent,
    EntradaComponent,
    CuentaComponent,
    FooterComponent,
    AutenticarseFormComponent,
    MembresiaComponent,
    EditarperfilComponent,
    ReservacionesComponent,
    ReservacionComponent,
    RegistroComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    AutenticarseSService,
    ReservarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
