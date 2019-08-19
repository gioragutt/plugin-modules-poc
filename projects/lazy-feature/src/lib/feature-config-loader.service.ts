import { Injectable, ComponentFactoryResolver, NgModuleRef } from '@angular/core';
import { FormEntry, FEATURE_CONFIG } from './config';
import { FormsRepository } from './forms/forms.repository';

/**
 * This infact really doesn't have anything to do with the actual
 * Module loading, and can be externalized.
 */
@Injectable({
  providedIn: 'root'
})
export class FeatureConfigLoaderService {
  constructor(private formRepository: FormsRepository) { }

  load(module: NgModuleRef<any>, name: string): void {
    console.log(`[FeatureConfigLoaderService] load(${name})`);
    const featureConfig = module.injector.get(FEATURE_CONFIG);
    this.loadFormsInRepository(module.componentFactoryResolver, featureConfig.forms);
  }

  loadFormsInRepository(componentFactoryResolver: ComponentFactoryResolver, forms: FormEntry<any>[]) {
    if (!forms) {
      return;
    }

    forms.forEach(form => {
      const componentFactory = componentFactoryResolver.resolveComponentFactory(form.component);
      this.formRepository.add(form, componentFactory);
    });
  }
}
