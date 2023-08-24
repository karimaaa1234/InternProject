import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { I18nModule } from '@app/i18n';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PlaylistsComponent } from '@app/playlists/playlists.component';
import { PlaylistsRoutingModule } from '@app/playlists/playlists-routing.module';
import { NewPlaylistComponent } from '@app/playlists/new-playlist.component';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    PlaylistsRoutingModule,
    I18nModule,
    NgxSkeletonLoaderModule,
    FontAwesomeModule,
    FormsModule,
  ],
  declarations: [PlaylistsComponent, NewPlaylistComponent],
})
export class PlaylistsModule {}
