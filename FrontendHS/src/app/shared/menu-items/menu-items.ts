import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: '', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: '', type: 'link', name: 'Buttons', icon: 'crop_7_5' },
  { state: '', type: 'link', name: 'Grid List', icon: 'view_comfy' },
  { state: '', type: 'link', name: 'Lists', icon: 'view_list' },
  { state: '', type: 'link', name: 'Menu', icon: 'view_headline' },
  { state: '', type: 'link', name: 'Tabs', icon: 'tab' },
  { state: '', type: 'link', name: 'Stepper', icon: 'web' }
  
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
