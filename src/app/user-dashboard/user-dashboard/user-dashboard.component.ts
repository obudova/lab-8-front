import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.list().subscribe((res) => {
      console.log(res);
    });
  }
}
