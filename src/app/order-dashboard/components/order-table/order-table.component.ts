import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DataSource} from '@angular/cdk/table';

@Component({
  selector: 'order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss']
})

export class OrderTableComponent {
  @Input()
  dataSource: DataSource<any>;
  @Output()
  rowClicked: EventEmitter<any> = new EventEmitter<any>();

  displayedColumns = ['id', 'client_name', 'due_date', 'date_created', 'commitment_date'];

  handleRowClick(product) {
    this.rowClicked.emit(product);
  }
}
