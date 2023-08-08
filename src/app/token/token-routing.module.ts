import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

import { TokenComponent } from '@app/token/token.component';

const routes: Routes = [{ path: 'token', component: TokenComponent, data: { title: marker('token') } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class TokenRoutingModule {}
