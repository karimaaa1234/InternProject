import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { environment } from '@env/environment';
import { RouteReusableStrategy, ApiPrefixInterceptor, ErrorHandlerInterceptor, SharedModule } from '@shared';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from '@app/auth/auth.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { TokenInterceptor } from '@app/auth/token-interceptor.service';
import { AuthGuard } from '@app/auth/auth.guard';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ArtistsModule } from '@app/artists/artists.module';
import { PlaylistsModule } from '@app/playlists/playlists.module';
import { PlaylistsRoutingModule } from '@app/playlists/playlists-routing.module';

import { MatDialogModule } from '@angular/material/dialog';
import { TracksRoutingModule } from '@app/tracks/tracks-routing.module';
import { TracksModule } from '@app/tracks/tracks.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    LoginModule,
    NgxSkeletonLoaderModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    RouterModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    TracksRoutingModule,
    TracksModule,
    MaterialModule,
    SharedModule,
    ShellModule,
    PlaylistsModule,
    PlaylistsRoutingModule,
    ArtistsModule,
    HomeModule,
    OAuthModule.forRoot(),
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
