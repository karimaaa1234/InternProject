import { Injectable } from '@angular/core';
import * as querystring from 'querystring';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url: string = '/api/token';
  constructor(private http: HttpClient, private router: Router) {}

  logIn() {
    window.location.href =
      'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        redirect_uri: window.location.origin + '/token',
        response_type: 'code',
        client_id: '47edf49c144940739a4f77370816d781',
        scope: 'user-read-private user-read-email playlist-read-private playlist-modify-private playlist-modify-public',
        showDebugInformation: true,
        strictDiscoveryDocumentValidation: false,
        oidc: false,
      });
  }
  signOut() {
    localStorage.clear();
  }

  get token() {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    if (!!this.token) {
      return !!(this.expiryTime && this.expiryTime > Math.floor(Date.now() / 1000) + 120);
    }
    return false;
  }
  get expiryTime() {
    let time = localStorage.getItem('expiry_time');
    return time !== null ? parseInt(time) : null;
  }

  getToken(code: string) {
    localStorage.setItem('code', code);
    const body = new HttpParams()
      .set('code', code)
      .set('redirect_uri', environment.redirect_uri)
      .set('grant_type', 'authorization_code');
    return this.http
      .post<any>(`${this.url}`, body.toString(), {
        headers: {
          Authorization: `Basic ` + btoa(`${environment.client_id}:${environment.client_secret}`),
          ['Content-Type']: 'application/x-www-form-urlencoded',
        },
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response['access_token']);
          localStorage.setItem('refresh_token', response['refresh_token']);
          const timestampSeconds = Math.floor(Date.now() / 1000);
          localStorage.setItem('expiry_time', timestampSeconds + response['expires_in']);
          // this.shouldRefresh();
        })
      );
  }

  refreshToken() {
    const body = new HttpParams()
      .set('grant_type', 'refresh_token')

      .set('redirect_uri', environment.redirect_uri)
      // @ts-ignore
      .set('code', localStorage.getItem('code'))
      // @ts-ignore
      .set('refresh_token', localStorage.getItem('refresh_token'));
    return this.http
      .post<any>(`${this.url}`, body.toString(), {
        headers: {
          Authorization: `Basic ` + btoa(`${environment.client_id}:${environment.client_secret}`),
          ['Content-Type']: 'application/x-www-form-urlencoded',
        },
      })
      .pipe(
        tap((res: Response) => {
          localStorage.setItem('token', res['access_token']);
          localStorage.setItem('expiry_time', Math.floor(Date.now() / 1000) + res['expires_in']);
        })
      );
  }
}
