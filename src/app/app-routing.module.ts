import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './componentes/home/home.component';
import { UsoComponent } from './componentes/uso/uso.component';
import { CuentaComponent } from './componentes/cuenta/cuenta.component';
import { EntradaComponent } from './componentes/entrada/entrada.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'uso', component: UsoComponent},
  {path: 'entrada', component: EntradaComponent},
  {path: 'cuenta', component: CuentaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
