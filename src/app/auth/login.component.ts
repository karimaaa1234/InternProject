import { AuthService } from './auth.service';
import { Component, OnInit } from '@angular/core';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';

// @UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  faSpotify = faSpotify;
  title = 'spotify-login';

  constructor(private authService: AuthService) {}

  logIn() {
    this.authService.logIn();
  }
}
