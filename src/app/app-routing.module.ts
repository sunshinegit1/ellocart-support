import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersComponent } from './orders/orders.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { CategoriesComponent } from './categories/categories.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {
    matcher: url => {
      const user_type = localStorage.getItem('user');
      if (user_type) {
        return url.length ? { consumed: [] } : { consumed: url };
      }
      return null;
    },
    component:DashboardComponent
  },
  {path: 'dashboard', component:DashboardComponent},
  {path: 'restaurants', component:RestaurantsComponent},
  {path: 'categories', component:CategoriesComponent},
  {path: 'orders/:status', component:OrdersComponent},
  {path: 'order-details/:oid', component:OrderDetailsComponent},
  {path: 'order-details/:status/:oid', component:OrderDetailsComponent},
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
