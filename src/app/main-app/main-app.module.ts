import { NgModule } from '@angular/core';
import { Feature3Module } from '../feature3/feature3.module';
import { SharedModule } from '../shared/shared.module';
import { MainAppPageComponent } from './main-app-page/main-app-page.component';
import { MainAppRoutingModule } from './main-app-routing.module';
import { ShellComponent } from './shell/shell.component';

@NgModule({
  declarations: [
    MainAppPageComponent,
    ShellComponent,
  ],
  imports: [
    SharedModule,
    MainAppRoutingModule,
    Feature3Module,
  ]
})
export class MainAppModule { }
