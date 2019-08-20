import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsRegistryModule } from 'projects/forms-registry';

@NgModule({
  exports: [
    CommonModule,
    MaterialModule,
    FormsRegistryModule,
  ]
})
export class SharedModule { }
