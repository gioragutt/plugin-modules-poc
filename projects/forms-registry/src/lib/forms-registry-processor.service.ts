import { ComponentFactoryResolver, Injectable, NgModuleRef } from '@angular/core';
import { PluginProcessor } from 'projects/plugin-modules';
import { MaybeAsync } from 'projects/plugin-modules/src/lib/utils/collections';
import { FORM_ENTRIES } from './config';
import { FormsRegistryService } from './forms-registry.service';
import { FormEntries } from './interfaces';

function flatten<T>(arr: T[][]): T[] {
  return Array.prototype.concat.apply([], arr);
}

@Injectable({
  providedIn: 'root'
})
export class FormsRegistryProcessorService implements PluginProcessor {
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
