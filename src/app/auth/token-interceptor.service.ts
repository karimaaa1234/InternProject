import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = localStorage.getItem('token');
    if (!req.url.includes('token')) {
      const modifiedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${userToken}`),
      });
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}
