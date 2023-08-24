import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class ArtistsService {
  private searchUrl: string = '/v1/search';
  private artistUrl: string = '/v1/artists';
  constructor(private http: HttpClient) {}

  searchArtists(value: any) {
    return this.http.get<any>(`${this.searchUrl}`, {
      headers: {
        ['Content-Type']: 'application/json',
      },
      params: {
        q: value,
        type: 'artist',
      },
    });
  }

  getArtist(id: string) {
    return this.http.get<any>(`${this.artistUrl}/${id}`, {
      headers: {
        // Authorization: `Basic ` + btoa(`${environment.client_id}:${environment.client_secret}`),
      },
    });
  }

  getArtistAlbums(id: string) {
    return this.http.get<any>(`${this.artistUrl}/${id}/albums`, {
      headers: {
        // Authorization: `Basic ` + btoa(`${environment.client_id}:${environment.client_secret}`),
      },
    });
  }
}
