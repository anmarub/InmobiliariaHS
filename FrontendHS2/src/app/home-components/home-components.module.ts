import 'hammerjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { ProductsComponent } from './products/products.component';
import { InformationsComponent } from './informations/informations.component';
import { ProfileComponent } from './profile/profile.component';
import { MaterialModule } from '../material-module';
import { RouterModule } from '@angular/router';
import { HomeRoutes } from './home-components-routing.module';



@NgModule({
  declarations: [
    HeaderComponent,
    ProductsComponent,
    InformationsComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
  ]
})
export class HomeComponentsModule { }
