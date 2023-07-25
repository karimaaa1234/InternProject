import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { SpotifyRoutingModule } from './spotify-routing.module';
import { SpotifyLoginComponent } from './spotify.login.component';
import { I18nModule } from '@app/i18n';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { faSpotify } from '@fortawesome/free-brands-svg-icons';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    I18nModule,
    FontAwesomeModule,
    SpotifyRoutingModule,
  ],
  declarations: [SpotifyLoginComponent],
})
export class SpotifyLoginModule {
  // constructor(library: FaIconLibrary) {
  //   library.addIconPacks(fab);
  //   library.addIcons(faSpotify);
  // }
}
