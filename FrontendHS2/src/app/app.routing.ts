import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AdminComponentsModule } from './admin-components/admin-components.module';
import { FullHomeComponent } from './layouts/home/full-home.component';
import { LoginComponent } from './session/login/login.component';

export const AppRoutes: Routes = [
  {
    path: 'admin',
    component: FullComponent,
    children: [
      {
        path: 'admin',
        redirectTo: '/admin',
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
        path: 'modules',
        loadChildren: () => import('./admin-components/admin-components.module').then(m => m.AdminComponentsModule)
      }
    ]
  },
  {
    path: '',
    component: FullHomeComponent,
    children: [
      {
        path: '',
        redirectTo: '/home/header',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./home-components/home-components.module').then(m => m.HomeComponentsModule)
      },
      {
        path: 'session',
        loadChildren: () => import('./session/session.module').then(m => m.SessionModule)
      }
    ]
  },
];
