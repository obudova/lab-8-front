import { Observable ,  BehaviorSubject } from 'rxjs';

import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';


import { AuthService } from './auth.service';

@Injectable()
export class AccessInterceptor implements HttpInterceptor {
  private authService: AuthService;

  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor (private injector: Injector) {
    this.handleSuccessResponse = this.handleSuccessResponse.bind(this);
    this.handleUnauthorizedResponse = this.handleUnauthorizedResponse.bind(this);
  }

  intercept (req: HttpRequest<any>, next: HttpHandler): any {
    console.log('intercept');
    this.authService = this.injector.get(AuthService);
    const jwtToken = this.authService.getAccessToken();

    if (!jwtToken || req.responseType !== 'json') {
      return next.handle(req);
    }

    const authRequest = req.clone({
      headers: this.authService.getAccessHeader()
    });

    return next.handle(this.addToken(req, this.authService.getAccessToken()));
  }

  handleSuccessResponse(event: HttpEvent<any>) {
    if (event instanceof HttpResponse) {
      // Handle success response
    }
  }

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    if (!this.tokenSubject.getValue() && this.isRefreshingToken) {
      return req.clone({ headers: this.authService.getAccessHeader() });
    } else {
      return req.clone({ setHeaders: { 'X-Access-Token': `${this.authService.getAccessToken()}` }});
    }
  }

  handleUnauthorizedResponse(error: any, req: HttpRequest<any>) {
    if (error instanceof HttpErrorResponse) {
      // if (err.status === 401) {
      //   this.authService.logout();
    }
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      this.tokenSubject.next(null);
    }
  }

  handle400Error(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      console.log('400 logout');
      return this.authService.logout();
    }

    return Observable.throw(error);
  }
}
