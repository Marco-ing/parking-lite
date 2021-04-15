import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/dashboard/navbar/navbar.component';
import { HomeComponent } from './componentes/home/home.component';
import { UsoComponent } from './componentes/uso/uso.component';
import { EntradaComponent } from './componentes/entrada/entrada.component';
import { CuentaComponent } from './componentes/cuenta/cuenta.component';
import { FooterComponent } from './componentes/dashboard/footer/footer.component';
import { AutenticarseFormComponent } from './componentes/autenticarse-form/autenticarse-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UsoComponent,
    EntradaComponent,
    CuentaComponent,
    FooterComponent,
    AutenticarseFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
