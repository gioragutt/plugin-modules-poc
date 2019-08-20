import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsRegistryModule } from 'projects/forms-registry';
import { FloatingFormsModule } from '../floating-forms/floating-forms.module';

@NgModule({
  exports: [
    CommonModule,
    MaterialModule,
    FormsRegistryModule,
    FloatingFormsModule,
  ]
})
export class SharedModule { }
