import { Routes } from '@angular/router';

import { FullComponent } from './layouts/admin/full.component';
import { FullHomeComponent } from './layouts/home/full-home.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullHomeComponent,
    children: [
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
      }
    ]
  }
];
