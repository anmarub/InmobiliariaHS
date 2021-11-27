import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { InformationsComponent } from './informations/informations.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from '../material-module';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home-components-routing.module';


@NgModule({
  declarations: [
    HeaderComponent,
    ProductsComponent,
    InformationsComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent
  ],
  imports: [
    RouterModule.forChild(HomeRoutes),
    CommonModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ]
})
export class HomeComponentsModule { }
