import { TokenComponent } from '@app/token/token.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@shared';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@app/material.module';
import { TokenRoutingModule } from '@app/token/token-routing.module';
@NgModule({
  imports: [CommonModule, TranslateModule, SharedModule, FlexLayoutModule, MaterialModule, TokenRoutingModule],
  declarations: [TokenComponent],
})
export class TokenModule {}
