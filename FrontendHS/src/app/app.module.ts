import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MaterialModule } from './material-module';
import { SharedModule } from './shared/shared.module';
import { FullComponent } from './layouts/full/full.component';

import { SpinnerComponent } from './shared/spinner.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    SpinnerComponent,
    AppSidebarComponent,
    AppHeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MaterialModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}