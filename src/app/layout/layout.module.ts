import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import {ProductDashboardComponent} from '../products-dashboard/product-dashboard/product-dashboard.component';
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {UserDashboardComponent} from '../user-dashboard/user-dashboard/user-dashboard.component';
import {OrderDashboardComponent} from '../order-dashboard/order-dashboard/order-dashboard.component';

const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
      {
        path: 'products', component: ProductDashboardComponent
      },
      {
        path: 'users', component: UserDashboardComponent
      },
      {
        path: 'orders', component: OrderDashboardComponent
      }
    ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutModule { }
