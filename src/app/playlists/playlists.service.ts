import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsService {
  constructor(private http: HttpClient) {}

  getUserPlaylists(id: string) {
    return this.http.get<any>(`/v1/users/${id}/playlists`);
  }

  createPlaylist(id: string, name: string, description: string, publicPlaylist: boolean) {
    var body = { name: name, description: description, public: publicPlaylist };
    return this.http.post(`/v1/users/${id}/playlists`, JSON.stringify(body), {
      headers: {
        ['Content-Type']: 'application/json',
      },
    });
  }
}
