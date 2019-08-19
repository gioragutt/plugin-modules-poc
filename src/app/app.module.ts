import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LazySubmodules, SubmodulesModule } from 'projects/submodules';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Feature3Module } from './feature3/feature3.module';
import { FormRepositoryComponentDirective } from './form-repository-component.directive';

export const features: LazySubmodules = [
  {
    loadChildren: () => import('./feature1/feature1.module').then(m => m.Feature1Module),
    name: 'feature1',
    // canActivate: ['returnFalse'],
  },
  {
    loadChildren: () => import('./feature2/feature2.module').then(m => m.Feature2Module),
    name: 'feature2',
  }
];

@NgModule({
  declarations: [
    AppComponent,
    FormRepositoryComponentDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SubmodulesModule.forRoot(features),
    Feature3Module,
  ],
  providers: [{
    provide: 'returnFalse',
    useValue: () => false,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
