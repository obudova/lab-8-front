import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { RequestService } from './request.service';
import {Observable} from 'rxjs/Observable';
import {apiHost} from './product.service';

// service for fake backend
@Injectable()
export class UserService  {
  constructor(private requestService: RequestService) {}

  list(): Observable<any> {
    return this.requestService.request(`${apiHost}/users`);
  }
}
