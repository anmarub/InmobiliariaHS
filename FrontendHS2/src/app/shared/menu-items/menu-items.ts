import { Injectable } from "@angular/core";

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: "admin/dashboard", name: "Dashboard", type: "link", icon: "av_timer" },
  { state: "admin/customers", type: "link", name: "Buttons", icon: "crop_7_5" },
  { state: "admin/employee", type: "link", name: "Grid List", icon: "view_comfy",},
  { state: "admin/orders", type: "link", name: "Lists", icon: "view_list" },
  { state: "admin/products", type: "link", name: "Menu", icon: "view_headline" }
];
@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
