import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormEntries, FormsRegistryModule } from 'projects/forms-registry';
import { SubmodulesModule } from 'projects/submodules';
import { Feature1FormComponent } from './feature1-form/feature1-form.component';

const forms: FormEntries = [
  {
    category: 'Category 1',
    component: Feature1FormComponent,
    name: 'Feature1FormComponent',
  }
];

@NgModule({
  declarations: [Feature1FormComponent],
  imports: [
    CommonModule,
    FormsRegistryModule.forFeature(forms),
    SubmodulesModule.forFeature(),
  ],
  entryComponents: [Feature1FormComponent],
})
export class Feature1Module { }
