import { NgModule } from '@angular/core';
import { LazyPluginModules, PluginsModule } from 'projects/plugin-modules';

export const features: LazyPluginModules = [
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
    PluginsModule.forRoot(features, {
      lazyLoadImmediately: false,
    })
  ],
})
export class AppPluginsModule { }
