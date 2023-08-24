import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { ArtistsComponent } from '@app/artists/artists.component';
import { ArtistsRoutingModule } from '@app/artists/artists-routing.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  imports: [
    CommonModule,
    ArtistsRoutingModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    NgxSkeletonLoaderModule,
  ],
  declarations: [ArtistsComponent],
})
export class ArtistsModule {}
