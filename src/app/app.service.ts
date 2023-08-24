import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  theme() {
    let theme = 'light';
    sessionStorage.getItem('data-theme') == 'dark' ? (theme = 'light') : (theme = 'dark');
    document.documentElement.setAttribute('data-theme', theme);
    sessionStorage.setItem('data-theme', theme);
  }
}
