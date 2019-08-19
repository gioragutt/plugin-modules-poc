import { NgModule, NgModuleRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Feature3PageComponent } from './feature3-page/feature3-page.component';
import { LazyFeatureConfig, LazyFeatureModule, FeatureConfigLoaderService } from 'projects/lazy-feature';

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
export class Feature3Module {
  constructor(
    moduleRef: NgModuleRef<Feature3Module>,
    configLoader: FeatureConfigLoaderService,
  ) {
    configLoader.load(moduleRef, 'feature3');
  }
}
