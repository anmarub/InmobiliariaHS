import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { InformationsComponent } from './informations/informations.component';
import { ProductsComponent } from '../admin-components/products/products.component';

export const HomeRoutes: Routes = [
  {
    path: '',
    component: HeaderComponent,
  },
  {
    path: 'information',
    component: InformationsComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  }
];