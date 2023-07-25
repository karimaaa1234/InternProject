import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { SpotifyLoginComponent } from './spotify.login.component';

const routes: Routes = [{ path: 'spotify', component: SpotifyLoginComponent, data: { title: marker('spotify') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class SpotifyRoutingModule {}
