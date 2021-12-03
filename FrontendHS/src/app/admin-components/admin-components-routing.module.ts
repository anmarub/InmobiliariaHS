import { RouterModule, Routes } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { EmployeeComponent } from './employee/employee.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'customers',
    component: CustomersComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
