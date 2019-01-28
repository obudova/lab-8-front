import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'product-table',
  templateUrl: 'product-table.component.html',
  styleUrls: ['product-table.component.scss']
})
export class ProductTableComponent {
  @Input()
  dataSource: DataSource<any>;
  @Output()
  rowClicked: EventEmitter<any> = new EventEmitter<any>();

  displayedColumns = ['name', 'description', 'price'];

  handleRowClick(product) {
    this.rowClicked.emit(product);
  }
}
