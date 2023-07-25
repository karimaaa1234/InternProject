import { Component, OnInit } from '@angular/core';
import { environment } from '@env/environment';
import { UntilDestroy } from '@ngneat/until-destroy';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

@UntilDestroy()
@Component({
  selector: 'app-spotify-login',
  templateUrl: './spotify.login.component.html',
  styleUrls: ['./spotify.login.component.scss'],
})
export class SpotifyLoginComponent implements OnInit {
  version: string | null = environment.version;
  error: string | undefined;
  isLoading = false;
  faSpotify = faSpotify;

  ngOnInit() {
    this.isLoading = true;
  }
}
