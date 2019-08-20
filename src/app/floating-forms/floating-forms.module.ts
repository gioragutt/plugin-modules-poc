import { ModuleWithProviders, NgModule } from '@angular/core';
import { FloatingFormContainerComponent } from './floating-form-container/floating-form-container.component';
import { FloatingFormsService } from './floating-forms.service';
import { FloatingFormsBoundryDirective } from './floating-forms-boundry.directive';
import { MaterialModule } from '../material/material.module';
import { FormsRegistryModule } from 'projects/forms-registry';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FloatingFormContainerComponent, FloatingFormsBoundryDirective],
  imports: [MaterialModule, FormsRegistryModule, CommonModule],
  exports: [FloatingFormsBoundryDirective],
  entryComponents: [FloatingFormContainerComponent],
})
export class FloatingFormsModule {
  static forRoot(): ModuleWithProviders<FloatingFormsModule> {
    return {
      ngModule: FloatingFormsModule,
      providers: [
        FloatingFormsService,
      ],
    };
  }
}
