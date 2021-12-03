import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { FullComponent } from "./layouts/admin/full.component";
import { FullHomeComponent } from "./layouts/home/full-home.component";
import { LoginComponent } from './session/login/login.component';

const routes: Routes = [
  {
    path: "inicio",
    component: FullComponent,
  },
  {
    path:"", //redireccionar la ruta principal
    pathMatch: 'full',  //coincidencia exacta o completa
    redirectTo: '/inicio' // nos redireccion a esta ruta especiica
  },
  {
    path: 'seguridad',
    loadChildren: () => import("./session/session.module").then(x => x.SessionModule)
  },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }