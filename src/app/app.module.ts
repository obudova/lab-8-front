import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule, MatDialogModule, MatRadioModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';


import { LayoutModule } from './layout/layout.module';
import { ProductService } from "./services/product.service";
import { RequestService } from "./services/request.service";

import { AppComponent } from './app.component';
import { ProductTableComponent } from "./components/product-table.component";
import { LoginComponent } from './components/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { RouterModule, Routes} from '@angular/router';
import { AuthService } from './services/auth.service';
import { AccessInterceptor } from './services/access.interceptor';
import {ProductDashboardComponent} from './products-dashboard/product-dashboard/product-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard/user-dashboard.component';
import {UserService} from './services/user.service';
import {UserTableComponent} from './user-dashboard/components/user-table/user-table.component';
import {CreateUserComponent} from './user-dashboard/components/create-user/create-user.component';
import {EditUserComponent} from './user-dashboard/components/edit-user/edit-user.component';
import {UserFormComponent} from './user-dashboard/components/user-form/user-form.component';
import {RoleService} from './services/role.service';
import {OrderTableComponent} from './order-dashboard/components/order-table/order-table.component';
import {OrderDashboardComponent} from './order-dashboard/order-dashboard/order-dashboard.component';
import {OrderService} from './services/order.service';

const routes: Routes = [
  { path: '', component: MainLayoutComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    ProductTableComponent,
    LoginComponent,
    ProductDashboardComponent,
    UserDashboardComponent,
    UserTableComponent,
    CreateUserComponent,
    EditUserComponent,
    UserFormComponent,
    OrderTableComponent,
    OrderDashboardComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    LayoutModule,
    BrowserModule,
    CommonModule,
    CdkTableModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatRadioModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AccessInterceptor, multi: true },
    ProductService,
    RequestService,
    AuthService,
    UserService,
    RoleService,
    OrderService
  ],
  entryComponents: [
    CreateUserComponent,
    EditUserComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
