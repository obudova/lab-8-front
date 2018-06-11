import { Component, Input, Output } from '@angular/core';
import { DataSource } from '@angular/cdk/table';
@Component({
  selector: 'product-table',
  templateUrl: 'product-table.component.html',
  styleUrls: ['product-table.component.scss']
})
export class ProductTableComponent {
  @Input()
  dataSource: DataSource<any>;

  displayedColumns = ['name', 'description', 'price'];
}
