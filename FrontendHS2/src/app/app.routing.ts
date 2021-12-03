import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AdminComponentsModule } from './admin-components/admin-components.module';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
      },
      {
        path: 'example',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin-components/admin-components.module').then(m => m.AdminComponentsModule)
      }
    ]
  }
];
