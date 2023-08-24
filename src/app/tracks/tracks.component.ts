import { UntilDestroy } from '@shared';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { TracksService } from '@app/tracks/tracks.service';
import { UserService } from '@app/playlists/user.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.scss'],
})
export class TracksComponent implements OnInit {
  results: any;
  showAll: boolean = false;
  searchValue: string | undefined;
  user: string;
  owner: any;
  id: any;
  total: any;
  searchResults: any;
  private readonly searchSubject = new Subject<string | undefined>();

  constructor(private route: ActivatedRoute, private service: TracksService, private userService: UserService) {
    let name = sessionStorage.getItem('display_name');
    if (name) {
      this.user = name;
    } else {
      this.user = 'User';
    }
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      if (this.id) {
        this.getTracks(this.id);
      }
    });

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
    }
  }
  getTracks(id: any) {
    this.service.getTracks(id).subscribe((res) => {
      this.results = res;
      this.owner = this.results['owner']['display_name'];
      this.total = this.results['tracks']['total'];
    });
  }

  number(num: any) {
    return num.toFixed(2);
  }

  handleResponse(res: Response) {
    console.log(res);
    this.searchResults = res;
  }

  show() {
    return this.showAll;
  }

  changeShow() {
    this.showAll ? (this.showAll = false) : (this.showAll = true);
  }

  public onSearch(event: any): void {
    const searchQuery = event.target.value;
    if (searchQuery && searchQuery?.trim() != '') {
      this.searchSubject.next(searchQuery?.trim());
    }
    this.searchResults = null;
  }

  search(searchValue: any) {
    console.log(searchValue);
    return this.service.searchTracks(searchValue);
  }

  addTrack(uri: any) {
    this.service.addTrack(this.id, uri).subscribe((res) => {
      this.getTracks(this.id);
    });
  }
}
