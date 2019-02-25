import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { RequestService } from './request.service';
import {Observable} from 'rxjs/Observable';
import {apiHost} from './product.service';

@Injectable()
export class OrderService {
  constructor(private requestService: RequestService) {}

  list(): Observable<any> {
    return this.requestService.request(`${apiHost}/orders`);
  }

  create(entity): Observable<any> {
    return this.requestService.request(`${apiHost}/orders`, 'POST', {
      data: entity
    });
  }

  update(entity): Observable<any> {
    return this.requestService.request(`${apiHost}/orders/${entity.id}`, 'PUT', {
      data: entity
    });
  }
}
