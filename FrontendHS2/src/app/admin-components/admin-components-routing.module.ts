import { Routes } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { EmployeeComponent } from './employee/employee.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { ProductCreateComponent } from './product-create/product-create.component';

export const AdminRoutes: Routes = [
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
  },
  {
    path: 'product-edit/:id',
    component: ProductEditComponent
  },
  {
    path: 'product-delete/:id',
    component: ProductDeleteComponent
  },
  {
    path: 'product-new',
    component: ProductCreateComponent
  }
];
