import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (typeof localStorage !== 'undefined') {
      const authToken = localStorage.getItem('token');

      if (authToken) {
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${authToken}`
          }
        });
        return next.handle(authReq);
      }
    }

    return next.handle(req);
  }
}
