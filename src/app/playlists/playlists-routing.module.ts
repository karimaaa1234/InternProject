import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { Shell } from '@app/shell/shell.service';
import { PlaylistsComponent } from '@app/playlists/playlists.component';

const routes: Routes = [Shell.childRoutes([{ path: 'playlists', component: PlaylistsComponent }])];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class PlaylistsRoutingModule {}
