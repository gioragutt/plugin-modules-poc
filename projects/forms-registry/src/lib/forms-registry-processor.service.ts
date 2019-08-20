import { ComponentFactoryResolver, Injectable, NgModuleRef } from '@angular/core';
import { SubmoduleProcessor } from 'projects/submodules';
import { MaybeAsync } from 'projects/submodules/src/lib/utils/collections';
import { FORM_ENTRIES } from './config';
import { FormsRegistryService } from './forms-registry.service';
import { FormEntries } from './interfaces';

function flatten<T>(arr: T[][]): T[] {
  return Array.prototype.concat.apply([], arr);
}

@Injectable({
  providedIn: 'root'
})
export class FormsRegistryProcessorService implements SubmoduleProcessor {
  constructor(private formsRegistry: FormsRegistryService) { }

  process(moduleRef: NgModuleRef<any>): MaybeAsync<void> {
    const formEntries = moduleRef.injector.get(FORM_ENTRIES);
    this.loadFormsIntoRegistry(moduleRef.componentFactoryResolver, formEntries);
  }

  loadFormsIntoRegistry(componentFactoryResolver: ComponentFactoryResolver, forms: FormEntries[]) {
    if (!forms) {
      return;
    }

    flatten(forms).forEach(form => {
      const componentFactory = componentFactoryResolver.resolveComponentFactory(form.component);
      this.formsRegistry.add(form, componentFactory);
    });
  }
}
