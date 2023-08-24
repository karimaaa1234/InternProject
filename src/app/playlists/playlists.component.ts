import { UntilDestroy } from '@shared';
import { Component, OnInit } from '@angular/core';
import { PlaylistsService } from '@app/playlists/playlists.service';
import { faLock, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { timeout } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NewPlaylistComponent } from '@app/playlists/new-playlist.component';
import { UserService } from '@app/playlists/user.service';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss'],
})
export class PlaylistsComponent implements OnInit {
  results: any;
  username: string = 'User';
  constructor(
    private playlistService: PlaylistsService,
    private userService: UserService,
    private router: Router,
    private dialog: MatDialog
  ) {}
  faLock = faLock;
  faUnlockAlt = faUnlockAlt;
  ngOnInit() {
    this.userService.getUser().subscribe((res) => {
      let userInfo = res;
      console.log(userInfo);
      sessionStorage.setItem('id', userInfo['id']);
      sessionStorage.setItem('display_name', userInfo['display_name']);
      let name = sessionStorage.getItem('display_name');
      if (name) {
        this.username = name;
      }
      let id = sessionStorage.getItem('id');
      if (id) {
        this.playlistService.getUserPlaylists(id).subscribe((res) => {
          this.results = res['items'];
        });
      }
    });
  }
  newPlaylist() {
    let id = sessionStorage.getItem('id');

    this.dialog
      .open(NewPlaylistComponent)
      .afterClosed()
      .subscribe(() => {
        if (id) {
          this.playlistService.getUserPlaylists(id).subscribe((res) => {
            this.results = res['items'];
          });
        }
      });
  }

  async showText() {
    const sleep = (ms: number | undefined) => new Promise((r) => setTimeout(r, ms));
    await sleep(125);
    timeout(10);
    (document.getElementById('addButton') as HTMLElement).textContent = 'Create new Playlist';
  }
  hideText() {
    (document.getElementById('addButton') as HTMLElement).textContent = '';
  }

  viewPlaylist(id: string) {
    this.router.navigate(['/playlist', id]);
  }
}
