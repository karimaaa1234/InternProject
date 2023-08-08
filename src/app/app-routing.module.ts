import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { LoginComponent } from '@app/auth/login.component';
import { TokenComponent } from '@app/token/token.component';
import { HomeComponent } from '@app/home/home.component';
import { AuthGuard } from '@app/auth/auth.guard';

const routes: Routes = [
  Shell.childRoutes([{ path: 'about', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule) }]),
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'token', component: TokenComponent },
  { path: '**', redirectTo: '', pathMatch: 'full', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
