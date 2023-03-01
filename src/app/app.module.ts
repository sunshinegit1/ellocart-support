import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClientModule } from '@angular/common/http'
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';

@NgModule({
  declarations: [AppComponent,DashboardComponent,OrdersComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,IonicModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },HTTP],
  bootstrap: [AppComponent],
})
export class AppModule {}
