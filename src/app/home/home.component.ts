import { Component, OnInit } from '@angular/core';
import { ArtistsService } from '@app/artists/artists.service';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from '@app/auth/auth.service';
import { debounce, debounceTime, distinctUntilChanged, Observable, Subject, timer } from 'rxjs';
import { catchError, filter, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { List } from 'postcss/lib/list';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading: boolean = false;
  results: any;
  numbers: any;
  private readonly searchSubject = new Subject<string | undefined>();

  // debouncedSearch: ReturnType<any>;
  constructor(private authService: AuthService, private artists: ArtistsService, private router: Router) {
    this.numbers = Array(21)
      .fill(1)
      .map((x, i) => i);
  }
  protected readonly faSpotify = faSpotify;

  searchValue: any;
  ngOnInit() {
    console.log('token is: ' + localStorage.getItem('token'));
    if (
      this.searchSubject.pipe(
        filter(
          (searchQuery) =>
            searchQuery !== undefined && searchQuery !== null && searchQuery !== ' ' && searchQuery !== ''
        )
      )
    ) {
      this.searchSubject
        .pipe(
          debounceTime(800),
          distinctUntilChanged(),
          switchMap((searchQuery) => this.search(searchQuery))
        )
        .subscribe((res) => this.handleResponse(res));

      this.isLoading = false;
    }

    this.isLoading = false;
    this.reset();
  }

  reset() {
    this.isLoading = false;
    this.results = null;
  }

  public onSearch(event: any): void {
    const searchQuery = event.target.value;
    this.isLoading = true;
    if (searchQuery && searchQuery?.trim() != '') {
      this.searchSubject.next(searchQuery?.trim());
    }
    this.results = null;
  }

  handleResponse(res: Response) {
    this.isLoading = false;
    this.results = res['artists']['items'];
    console.log(this.results);
  }

  signOut() {
    this.authService.signOut();
    this.router.navigate(['/login']);
  }

  search(searchValue: any) {
    console.log(searchValue);
    return this.artists.searchArtists(searchValue);
  }

  viewArtist(id: string) {
    console.log(id);
    this.router.navigate([id]);
  }
}
