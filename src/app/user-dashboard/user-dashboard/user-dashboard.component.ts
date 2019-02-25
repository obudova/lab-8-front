import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {MatDialog} from '@angular/material';
import {CreateUserComponent} from '../components/create-user/create-user.component';
import {RoleService} from '../../services/role.service';
import {EditUserComponent} from '../components/edit-user/edit-user.component';

@Component({
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  userDataSource: UserDataSource = null;
  userChanges: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  roles;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.userDataSource = new UserDataSource(this.userChanges);

    this.loadUsers();
    this.loadRoles();
  }

  loadUsers() {
    this.userService.list().subscribe((res) => {
      this.userChanges.next(res);
    });
  }

  loadRoles() {
    this.roleService.list().subscribe((res) => {
      this.roles = res;
    });
  }

  openCreateUser() {
    this.dialog.open(CreateUserComponent, {
      width: '300px',
      data: {
        roles: this.roles,
        onAdd: (user) => {
          this.createUser(user);
        }
      }
    });
  }

  createUser(user) {
    this.userService.create(user).subscribe((res) => {
      this.dialog.closeAll();
      this.loadUsers();
    });
  }

  handleUserClick(user) {
    this.dialog.open(EditUserComponent, {
      width: '300px',
      data: {
        roles: this.roles,
        user,
        onEdit: (user) => {
          this.updateUser(user);
        }
      }
    })
  }

  updateUser(user) {
    this.userService.update(user).subscribe((res) => {
      this.dialog.closeAll();
      this.loadUsers();
    });
  }
}

class UserDataSource extends DataSource<any> {
  constructor (private userChanges: Observable<any[]>) {
    super();
  }

  connect(): Observable<any[]> {
    return this.userChanges;
  }

  disconnect() {}
}


