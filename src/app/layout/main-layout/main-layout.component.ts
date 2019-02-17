import { Component } from '@angular/core';

@Component({
  templateUrl: 'main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {
  user = JSON.parse(localStorage.getItem('user')).username;
}
