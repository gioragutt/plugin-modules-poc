import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { LoadedLazyFeature, FormEntry, FEATURE_CONFIG } from './config';
import { FormsRepository } from './forms/forms.repository';

@Injectable({
  providedIn: 'root'
})
export class FeatureConfigLoaderService {
  constructor(private formRepository: FormsRepository) { }

  load({ module, feature }: LoadedLazyFeature): void {
    console.log(`[FeatureConfigLoaderService] load(${feature.name})`);
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
