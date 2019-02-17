import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { apiHost } from './product.service';
import {HttpHeaders} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  constructor(
    private requestService: RequestService,
    private router: Router
  ) {}

  login(data) {
    return this.requestService.request(`${apiHost}/users/login`, 'POST', {
      data
    });
  }

  getAccessHeader(): HttpHeaders {
    return new HttpHeaders({ 'Authorization': `${this.getAccessToken()}` });
  }

  getAccessToken(): string {
    return localStorage.getItem('token');
  }

  logout() {
    this.router.navigate([ '/']);
  }
}
