import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { I18nModule } from '@app/i18n';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { TracksComponent } from '@app/tracks/tracks.component';
import { FormsModule } from '@angular/forms';
import { TracksRoutingModule } from '@app/tracks/tracks-routing.module';
@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    I18nModule,
    TracksRoutingModule,
    NgxSkeletonLoaderModule,
    FontAwesomeModule,
    FormsModule,
  ],
  declarations: [TracksComponent],
})
export class TracksModule {}
