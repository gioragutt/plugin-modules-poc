import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Feature2PageComponent } from './feature2-page/feature2-page.component';
import { FormEntries, FormsRegistryModule } from 'projects/forms-registry';
import { SubmodulesModule } from 'projects/submodules';

const forms: FormEntries = [
  {
    category: 'Category 1',
    component: Feature2PageComponent,
    name: 'Feature2PageComponent',
  },
  {
    category: 'Category 2',
    component: Feature2PageComponent,
    name: 'Feature2PageComponent Copy ',
  },
];

@NgModule({
  declarations: [Feature2PageComponent],
  imports: [
    CommonModule,
    FormsRegistryModule.forFeature(forms),
    SubmodulesModule.forFeature(),
  ],
  entryComponents: [Feature2PageComponent],
})
export class Feature2Module { }
