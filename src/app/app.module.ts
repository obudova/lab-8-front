import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { ProductService } from "./components/services/product.service";
import { RequestService } from "./components/services/request.service";

import { AppComponent } from './app.component';
import { ProductTableComponent } from "./components/product-table.component";

@NgModule({
  declarations: [
    AppComponent,
    ProductTableComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    CdkTableModule,
    MatTableModule,
    HttpClientModule
  ],
  providers: [
    ProductService,
    RequestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
