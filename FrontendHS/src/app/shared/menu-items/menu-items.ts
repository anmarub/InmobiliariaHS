import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'customers', type: 'link', name: 'Clientes', icon: 'crop_7_5' },
  { state: 'orders', type: 'link', name: 'Ordenes', icon: 'view_comfy' },
  { state: 'products', type: 'link', name: 'Productos', icon: 'view_list' },
  { state: 'employee', type: 'link', name: 'Empleados', icon: 'view_headline' } 
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
