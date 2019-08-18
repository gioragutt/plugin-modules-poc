import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Feature3PageComponent } from './feature3-page/feature3-page.component';
import { LazyFeatureConfig, LazyFeatureModule } from 'projects/lazy-feature';

const featureConfig: LazyFeatureConfig = {
  forms: [
    {
      category: 'Comm',
      component: Feature3PageComponent,
      name: 'Kapara'
    }
  ]
};

@NgModule({
  declarations: [Feature3PageComponent],
  imports: [
    CommonModule,
    LazyFeatureModule.forFeature(featureConfig),
  ],
  entryComponents: [Feature3PageComponent],
})
export class Feature3Module { }
