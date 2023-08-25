import { Component, OnInit } from '@angular/core';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '@app/auth/auth.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AppService } from '@app/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class HeaderComponent implements OnInit {
  loggedIn: boolean = false;
  currentUrl: any;
  isLight: boolean = false;
  skipLinkPath: string | undefined;
  constructor(private auth: AuthService, private router: Router, private app: AppService) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        if (e.url != '') {
          this.currentUrl = e.url;
        } else {
          this.currentUrl = '';
        }
      }
    });
  }
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
    this.skipLinkPath = `${this.router.url}#main-content`;
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

  skipToMain() {
    let element = document.getElementById('main');
    if (element) {
      element.setAttribute('tabindex', '-1');
      element.focus();
    }
  }
}
