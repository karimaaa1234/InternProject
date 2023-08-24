import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, pipe, Subscription, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '@app/auth/auth.service';
import { catchError, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private apiUrl = 'https://api.spotify.com';
  private tokenUrl = 'https://accounts.spotify.com';

  constructor(private authService: AuthService) {}
  intercept(req1: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = localStorage.getItem('token');
    let req = req1.clone({
      url: this.buildUrl(req1.url),
    });
    let modifiedReq = req;

    if (!req.url.includes('token')) {
      if (this.authService.isLoggedIn() && this.authService.token) {
        modifiedReq = this.addToken(req, this.authService.token);
      }
    }
    return next.handle(modifiedReq);
  }

  private buildUrl(url: string): string {
    if (url.includes('token') || url.includes('authorize')) {
      console.log(url);
      return this.tokenUrl + url;
    }
    return this.apiUrl + url;
  }

  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    });
  }
}
