import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    OrdersComponent,
    OrderDetailsComponent,
    LoginComponent,
    RestaurantsComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule { }
