import { ModuleWithProviders, NgModule } from '@angular/core';
import { providePluginProcessor } from 'projects/plugin-modules';
import { FORM_ENTRIES } from './config';
import { FormsRegistryProcessorService } from './forms-registry-processor.service';
import { FormEntries } from './interfaces';
import { FormRegistryComponentDirective } from './form-registry-component.directive';

@NgModule({
  declarations: [FormRegistryComponentDirective],
  exports: [FormRegistryComponentDirective],
})
export class FormsRegistryModule {
  static forFeature(formEntries: FormEntries): ModuleWithProviders<FormsRegistryModule> {
    return {
      ngModule: FormsRegistryModule,
      providers: [
        {
          provide: FORM_ENTRIES,
          useValue: formEntries,
          multi: true
        },
      ],
    };
  }

  static forRoot(): ModuleWithProviders<FormsRegistryModule> {
    return {
      ngModule: FormsRegistryModule,
      providers: [
        providePluginProcessor(FormsRegistryProcessorService),
      ],
    };
  }
}
