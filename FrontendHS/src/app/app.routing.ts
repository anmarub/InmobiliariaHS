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
      },
      {
        path: '',
        loadChildren: 
          () => import('./home-components/home-components.module').then(m => m.HomeComponentsModule)
      },
    ]
  }
  //{ path: '', redirectTo: 'home', pathMatch: 'full' },
  //{ path: 'home', component: FullHomeComponent },
  //{ path: 'admin', component: FullComponent },
  
];
