import { Routes } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { InformationsComponent } from './informations/informations.component';
import { ProductsComponent } from './products/products.component';


export const HomeRoutes: Routes = [
  {
    path: 'header',
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
