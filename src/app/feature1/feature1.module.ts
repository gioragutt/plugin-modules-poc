import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Feature1FormComponent } from './feature1-form/feature1-form.component';
import { LazyFeatureConfig, LazyFeatureModule } from 'projects/lazy-feature';

const featureModuleConfig: LazyFeatureConfig = {
  forms: [
    {
      category: 'Category 1',
      component: Feature1FormComponent,
      name: 'Feature1FormComponent',
    }
  ],
};

@NgModule({
  declarations: [Feature1FormComponent],
  imports: [
    CommonModule,
    LazyFeatureModule.forFeature(featureModuleConfig)
  ],
  entryComponents: [Feature1FormComponent],
})
export class Feature1Module { }
