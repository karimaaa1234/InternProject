import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { I18nModule } from '@app/i18n';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    HttpClientModule,
    BrowserModule,
    SharedModule,
    FlexLayoutModule,
    FontAwesomeModule,
    MaterialModule,
    I18nModule,
    AuthRoutingModule,
    FontAwesomeModule,
  ],
  bootstrap: [LoginComponent],
})
export class LoginModule {}
