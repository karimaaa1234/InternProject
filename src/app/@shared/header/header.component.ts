import { Component, OnInit } from '@angular/core';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@app/auth/auth.service';
import { Router } from '@angular/router';
import { AppService } from '@app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  isLight: boolean = false;
  constructor(private auth: AuthService, private router: Router, private app: AppService) {}
  faSpotify = faSpotify;
  faSun = faSun;
  faMoon = faMoon;

  signOut() {
    this.auth.signOut();
    this.router.navigate(['/login']);
  }

  home() {
    this.router.navigate(['/home']);
  }

  playlists() {
    this.router.navigate(['/playlists']);
  }

  theme() {
    this.app.theme();
    this.isLight = document.documentElement.getAttribute('data-theme') == 'dark';
    console.log(this.isLight);
  }

  ngOnInit(): void {
    this.loggedIn = this.auth.isLoggedIn();

    if (!sessionStorage.getItem('data-theme')) {
      sessionStorage.setItem('data-theme', 'light');
    } else {
      this.isLight = sessionStorage.getItem('data-theme') === 'light';
    }
    if (!document.documentElement.getAttribute('data-theme')) {
      this.isLight
        ? document.documentElement.setAttribute('data-theme', 'light')
        : document.documentElement.setAttribute('data-theme', 'dark');
    }
  }
}
