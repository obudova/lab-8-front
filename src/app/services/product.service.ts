import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import { RequestService } from './request.service';
import {Observable} from 'rxjs/Observable';

export const apiHost = 'http://127.0.0.1:8087';

// service for fake backend
@Injectable()
export class ProductService  {
  constructor(private requestService: RequestService) {}

  list(): Observable<any> {
   return this.requestService.request(`${apiHost}/products`);
  }

  entity(id: string): Observable<any> {
    return this.requestService.request(`${apiHost}/products/${id}`);
  }

  search(value: string): Observable<any> {
    return this.requestService.request(`${apiHost}/products/search/${value}`);
  }
}
