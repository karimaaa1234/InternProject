import { SongsComponent } from '@app/songs/songs.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';

@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, FlexLayoutModule, MaterialModule],
  declarations: [SongsComponent],
})
export class TokenModule {}
