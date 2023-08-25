import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { LoginComponent } from '@app/auth/login.component';
import { TokenComponent } from '@app/auth/token.component';
import { HomeComponent } from '@app/home/home.component';
import { AuthGuard } from '@app/auth/auth.guard';
import { LoginAuthGuard } from '@app/auth/login-auth.guard';
import { ArtistsComponent } from '@app/artists/artists.component';
import { PlaylistsComponent } from '@app/playlists/playlists.component';
import { TracksComponent } from '@app/tracks/tracks.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'playlists', component: PlaylistsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [LoginAuthGuard] },
  { path: 'token', component: TokenComponent, canActivate: [LoginAuthGuard] },
  { path: ':id', component: ArtistsComponent, canActivate: [AuthGuard] },
  { path: 'playlist/:id', component: TracksComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '', pathMatch: 'full', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [AuthGuard, LoginAuthGuard],
})
export class AppRoutingModule {}
