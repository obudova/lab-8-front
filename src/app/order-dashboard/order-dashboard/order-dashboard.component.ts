import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order.service';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  templateUrl: "./order-dashboard.component.html",
  styleUrls: ["./order-dashboard.component.scss"]
})
export class OrderDashboardComponent implements OnInit {
  orderDataSource: OrderDataSource = null;
  orderChanges: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  constructor(private orderService: OrderService) {
    this.orderDataSource = new OrderDataSource(this.orderChanges);
  }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.list()
      .subscribe((res) => {
        this.orderChanges.next(res);
      })
  }
}

class OrderDataSource extends DataSource<any> {
  constructor (private orderChanges: Observable<any[]>) {
    super();
  }

  connect(): Observable<any[]> {
    return this.orderChanges;
  }

  disconnect() {}
}

