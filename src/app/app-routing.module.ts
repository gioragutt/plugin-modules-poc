import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { environment } from '../environments/environment';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'app',
    loadChildren: () => import('./main-app/main-app.module').then(m => m.MainAppModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '/login',
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.production,
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
