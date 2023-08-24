import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { ArtistsService } from '@app/artists/artists.service';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss'],
})
export class ArtistsComponent implements OnInit {
  artist: any;
  albums: any;
  numbers: any;
  isLoading: boolean = false;
  isLoadingArtist: boolean = false;
  constructor(private route: ActivatedRoute, private artistsService: ArtistsService) {
    this.numbers = Array(21)
      .fill(1)
      .map((x, i) => i);
  }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.search(id);
    }
  }

  search(id: string) {
    this.isLoading = true;
    this.isLoadingArtist = true;
    this.artistsService
      .getArtist(id)
      .pipe()
      .subscribe((res) => {
        console.log(res);
        this.artist = res;
        this.isLoadingArtist = false;
      });
    this.artistsService
      .getArtistAlbums(id)
      .pipe()
      .subscribe((res) => {
        console.log(res);
        this.albums = res['items'];
        this.isLoading = false;
      });
  }
  goToLink(url: string) {
    window.open(url, '_blank');
  }
}
