import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import 'rxjs/add/operator/catch';

const apiHost = 'http://127.0.0.1:8087';

import { RequestService } from './request.service';
// service for fake backend
@Injectable()
export class ProductService   {

  constructor() {
  }

  list() {
    return new Promise(function(succeed, fail) {
      var request = new XMLHttpRequest();
      request.open("GET", apiHost + '/products', true);
      request.addEventListener("load", function() {
        if (request.status < 400)
          succeed(request.response);
        else
          fail(new Error("Request failed: " + request.statusText));
      });
      request.addEventListener("error", function() {
        fail(new Error("Network error"));
      });
      request.send();
    });
  }

  enitity(id: string): Promise<any> {
    return new Promise(function(succeed, fail) {
      var request = new XMLHttpRequest();
      request.open("GET", `${apiHost}/products/${id}`, true);
      request.addEventListener("load", function() {
        if (request.status < 400)
          succeed(request.response);
        else
          fail(new Error("Request failed: " + request.statusText));
      });
      request.addEventListener("error", function() {
        fail(new Error("Network error"));
      });
      request.send();
    });
  }
}
