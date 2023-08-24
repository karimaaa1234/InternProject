import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from '@app/material.module';
import { LoaderComponent } from './loader/loader.component';
import { SkeletonComponent } from '@shared/skeleton/skeleton.component';
import { HeaderComponent } from '@shared/header/header.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { I18nModule } from '@app/i18n';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FlexLayoutModule,
    MaterialModule,
    TranslateModule,
    CommonModule,
    NgxSkeletonLoaderModule,
    FontAwesomeModule,
    I18nModule,
    FormsModule,
  ],
  declarations: [LoaderComponent, SkeletonComponent, HeaderComponent],
  exports: [LoaderComponent, SkeletonComponent, HeaderComponent],
})
export class SharedModule {}
