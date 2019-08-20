import { NgModule } from '@angular/core';
import { LazySubmodules, SubmodulesModule } from 'projects/submodules';

export const features: LazySubmodules = [
  {
    loadChildren: () => import('./feature1/feature1.module').then(m => m.Feature1Module),
    name: 'feature1',
  },
  {
    loadChildren: () => import('./feature2/feature2.module').then(m => m.Feature2Module),
    name: 'feature2',
  }
];

@NgModule({
  imports: [
    SubmodulesModule.forRoot(features, {
      lazyLoadImmediately: false,
    })
  ],
})
export class AppSubmodulesModule { }
