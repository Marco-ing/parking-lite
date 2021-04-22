import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './componentes/home/home.component';
import { UsoComponent } from './componentes/uso/uso.component';
import { CuentaComponent } from './componentes/cuenta/cuenta.component';
import { EntradaComponent } from './componentes/entrada/entrada.component';
import { AutenticarseFormComponent } from './componentes/autenticarse-form/autenticarse-form.component';
import { AuthGuard } from './guard/auth.guard';
import { AutenticarseGuard } from './guard/autenticarse.guard';
import { MembresiaComponent } from './componentes/membresia/membresia.component';
import { EditarperfilComponent } from './componentes/editarperfil/editarperfil.component';
import { ReservacionesComponent } from './componentes/reservaciones/reservaciones.component';
//Hacer Reservacion v
import { ReservacionComponent} from './componentes/reservacion/reservacion.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'uso', component: UsoComponent},
  {path: 'entrada', component: EntradaComponent},
  {path: 'cuenta', component: CuentaComponent},
  {path: 'autenticarse', component: AutenticarseFormComponent, canActivate: [AutenticarseGuard]},
  {path: 'membresia', component: MembresiaComponent},
  {path: 'editar-perfil', component: EditarperfilComponent},
  {path: 'reservaciones', component: ReservacionesComponent},
  {path: 'agendarreservacion', component: ReservacionComponent},
  {path: '**', pathMatch: 'full' ,redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
