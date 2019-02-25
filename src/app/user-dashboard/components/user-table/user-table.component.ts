import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DataSource} from '@angular/cdk/table';

@Component({
  selector: 'user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  @Input()
  dataSource: DataSource<any>;
  @Output()
  rowClicked: EventEmitter<any> = new EventEmitter<any>();

  displayedColumns = ['id', 'username', 'name', 'date_created', 'role_name'];

  handleRowClick(product) {
    this.rowClicked.emit(product);
  }
}
