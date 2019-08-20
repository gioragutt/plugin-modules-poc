import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainAppPageComponent } from './main-app-page/main-app-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainAppPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainAppRoutingModule { }
