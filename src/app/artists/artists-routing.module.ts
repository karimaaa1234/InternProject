import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { ArtistsComponent } from '@app/artists/artists.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [{ path: 'artist', component: ArtistsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ArtistsRoutingModule {}
