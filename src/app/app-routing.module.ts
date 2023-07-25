import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Shell } from '@app/shell/shell.service';
import { AuthGuard } from './auth.guard';
import { SecureComponent } from '@app/secure/secure.component';
import { LoginComponent } from '@app/auth/login.component';
import { RegisterComponent } from '@app/register/register.component';
import { NotFoundComponent } from '@app/not-found/not-found.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'about', loadChildren: () => import('./about/about.module').then((m) => m.AboutModule) }]),
  // Fallback when no prior route is matched
  { path: 'secure', canActivate: [AuthGuard], component: SecureComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
