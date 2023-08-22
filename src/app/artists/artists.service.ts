import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class SongsService {
  private url: string = '/v1/search';
  constructor(private http: HttpClient) {}

  getArtists(value: any) {
    // const body = new HttpParams()
    // .set('q', value)
    //
    // .set('type', 'track')
    // if (value.target.value !== null or white space) {
    this.http
      .get<any>(`${this.url}`, {
        headers: {
          // Authorization: `Basic ` + btoa(`${environment.client_id}:${environment.client_secret}`),
          ['Content-Type']: 'application/json',
        },
        params: {
          q: value.target.value,
          type: 'artist',
        },
      })
      .subscribe((res: Response) => {
        console.log(res);
      });
  }
}
