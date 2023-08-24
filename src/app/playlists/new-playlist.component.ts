import { UntilDestroy } from '@shared';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PlaylistsService } from '@app/playlists/playlists.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@UntilDestroy()
@Component({
  selector: 'app-playlists',
  templateUrl: './new-playlist.component.html',
  styleUrls: ['./new-playlist.component.scss'],
})
export class NewPlaylistComponent {
  constructor(private dialog: MatDialog, private playlistService: PlaylistsService, private snackBar: MatSnackBar) {}
  close() {
    this.dialog.closeAll();
  }
  playlistName: string | undefined;
  private: boolean = false;
  description: string | undefined;

  createPlaylist() {
    let publicPlaylist = !this.private;
    console.log(publicPlaylist);
    let id = sessionStorage.getItem('id');
    if (id) {
      if (this.playlistName) {
        if (this.description) {
          this.playlistService
            .createPlaylist(id, this.playlistName, this.description, publicPlaylist)
            .subscribe((res) => this.close());
        } else {
          this.playlistService
            .createPlaylist(id, this.playlistName, '', publicPlaylist)
            .subscribe((res) => this.close());
        }
      } else {
        this.snackBar.open('Error: Name field cannot be empty', 'close', {
          duration: 3000,
          panelClass: 'errorSnack',
        });
      }
    }
  }
}
