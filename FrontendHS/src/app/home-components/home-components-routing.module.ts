import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';

export const HomeRoutes: Routes = [
  {
    path: '',
    component: HeaderComponent,
  }
];