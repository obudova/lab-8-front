import { Component, OnInit } from '@angular/core';
import { ProductService } from "./services/product.service";
import { DataSource } from '@angular/cdk/table';
import { Observable } from "rxjs/Observable";
import 'rxjs';
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  ordersAmount: number;
  avgSum: string;
  search: string;

  productDataSource: ProductDataSource= null;
  productChanges: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productDataSource = new ProductDataSource(this.productChanges);

    this.loadProducts();
  }

  loadProducts() {
    this.productService.list()
      .then((response: any) => JSON.parse(response))
      .then((res: any) => {
        this.productChanges.next(res);
      });
  }

  handleRowClicked(product) {
    this.productService.enitity(product.id)
      .then((response: any) => JSON.parse(response))
      .then((res: Array<any>) => {
      if (res) {
        const output = res.map(item => parseInt(item.sum, 10));
        this.avgSum = output.join(', ');
        this.ordersAmount = res.length;
      }
      else {
        this.ordersAmount = 0;
        this.avgSum = '';
      }
    });
  }

  handleSearchClick() {
    this.productService.search(this.search)
      .then((response: any) => JSON.parse(response))
      .then((res: any) => {
        this.productChanges.next(res);
      });
  }

  resetSettings() {
    this.search = '';
    this.loadProducts();
  }
}


class ProductDataSource extends DataSource<any> {
  constructor (private productChanges: Observable<any[]>) {
    super();
  }

  connect(): Observable<any[]> {
    return this.productChanges;
  }

  disconnect() {}
}
