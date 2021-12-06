import { Injectable } from "@angular/core";

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: "modules/dashboard", type: "link", name: "Dashboard", icon: "av_timer" },
  { state: "modules/customers", type: "link", name: "Clientes", icon: "account_circle" },
  { state: "modules/employee", type: "link", name: "Empleados", icon: "person",},
  { state: "modules/orders", type: "link", name: "Ordenes", icon: "view_list" },
  { state: "modules/products", type: "link", name: "Productos", icon: "maps_home_work" }
];
@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
