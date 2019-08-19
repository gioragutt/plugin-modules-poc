import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LazyFeatureModule, LazyFeatures } from 'projects/lazy-feature';
import { FormRepositoryComponentDirective } from './form-repository-component.directive';

export const features: LazyFeatures = [
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

export function returnFalse() {
  return false;
}

@NgModule({
  declarations: [
    AppComponent,
    FormRepositoryComponentDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LazyFeatureModule.forRoot(features),
  ],
  providers: [{
    provide: 'returnFalse',
    useValue: returnFalse,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
