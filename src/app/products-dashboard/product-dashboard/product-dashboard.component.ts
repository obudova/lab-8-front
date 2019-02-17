import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ProductService} from '../../services/product.service';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';

@Component({
  templateUrl: './product-dashboard.component.html',
  styleUrls: ['product-dashboard.component.scss']
})
export class ProductDashboardComponent implements OnInit {
  title = 'app';
  ordersAmount: number;
  avgSum: string;
  search: string;

  productDataSource: ProductDataSource = null;
  productChanges: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private productService: ProductService) {
  }

  ngOnInit() {
    this.productDataSource = new ProductDataSource(this.productChanges);

    this.loadProducts();
  }

  loadProducts() {
    this.productService.list()
      .subscribe((res) => {
        this.productChanges.next(res);
      });
  }

  handleRowClicked(product) {
    this.productService.entity(product.id)
      .subscribe((res: Array<any>) => {
        if (res) {
          const output = res.map(item => parseInt(item.sum, 10));
          this.avgSum = output.join(', ');
          this.ordersAmount = res.length;
        } else {
          this.ordersAmount = 0;
          this.avgSum = '';
        }
      });
  }

  handleSearchClick() {
    this.productService.search(this.search)
      .subscribe((res: any) => {
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

