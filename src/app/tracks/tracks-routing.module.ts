import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Shell } from '@app/shell/shell.service';
import { TracksComponent } from '@app/tracks/tracks.component';

const routes: Routes = [Shell.childRoutes([{ path: 'playlist/:id', component: TracksComponent }])];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TracksRoutingModule {}
