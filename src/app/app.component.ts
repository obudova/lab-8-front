import { Component, OnInit } from '@angular/core';
import { ProductService } from "./components/services/product.service";
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

  productDataSource: ProductDataSource= null;
  productChanges: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private productService: ProductService) { }

  ngOnInit() {
    // Observable.fromPromise(this.productService.list())
    //   .do(res => console.log(res))
    //   .subscribe(res => console.log(res))
    this.productDataSource = new ProductDataSource(this.productChanges)

    this.productService.list()
      .then((response: any) => JSON.parse(response))
      .then((res: any) => {
      this.productChanges.next(res);
    });
    this.productService.enitity('1').then(res => console.log(res));
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
