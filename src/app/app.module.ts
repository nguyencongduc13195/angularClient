import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicModule } from './public/public.module';
import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';

const arrRoutes: Routes = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    PublicModule,
    AdminModule,
    RouterModule.forRoot(arrRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
