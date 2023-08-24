import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TracksService {
  private searchUrl: string = '/v1/search';
  constructor(private http: HttpClient) {}
  getTracks(id: string) {
    return this.http.get<any>(`/v1/playlists/${id}`);
  }

  searchTracks(value: any) {
    return this.http.get<any>(`${this.searchUrl}`, {
      headers: {
        ['Content-Type']: 'application/json',
      },
      params: {
        q: value,
        type: 'track',
      },
    });
  }

  addTrack(id: string, uris: string) {
    var body = { uris: [uris], position: 0 };
    return this.http.post<any>(`/v1/playlists/${id}/tracks`, JSON.stringify(body), {
      headers: {
        ['Content-Type']: 'application/json',
      },
    });
  }
}
