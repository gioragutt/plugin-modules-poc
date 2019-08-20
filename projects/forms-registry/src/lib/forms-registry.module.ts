import { ModuleWithProviders, NgModule } from '@angular/core';
import { provideSubmoduleProcessor } from 'projects/submodules';
import { FORM_ENTRIES } from './config';
import { FormsRegistryProcessorService } from './forms-registry-processor.service';
import { FormEntries } from './interfaces';
import { FormRepositoryComponentDirective } from './form-registry-component.directive';

@NgModule({
  declarations: [FormRepositoryComponentDirective],
  exports: [FormRepositoryComponentDirective],
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
        provideSubmoduleProcessor(FormsRegistryProcessorService),
      ],
    };
  }
}
