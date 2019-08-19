import { NgModule, NgModuleRef, Inject, Optional, InjectionToken } from '@angular/core';
import { SubmoduleBootstrapperService } from './submodule-bootstrapper.service';

export interface SubmoduleRootModuleConfig {
  boostrapImmediately?: boolean;
}
export const SUBMODULE_ROOT_MODULE_CONFIG =
  new InjectionToken<SubmoduleRootModuleConfig>('SUBMODULE_ROOT_MODULE_CONFIG');

const DEFAULT_CONFIG: SubmoduleRootModuleConfig = {
  boostrapImmediately: true,
};

@NgModule()
export class SubmoduleRootModule {
  config: SubmoduleRootModuleConfig;

  constructor(
    @Optional() @Inject(SUBMODULE_ROOT_MODULE_CONFIG) config: SubmoduleRootModuleConfig,
    private boostrapper: SubmoduleBootstrapperService,
  ) {
    config = config || {};
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  registerFeature(moduleRef: NgModuleRef<any>) {
    if (this.config.boostrapImmediately) {
      this.boostrapper.bootstrap(moduleRef);
    } else {
      this.boostrapper.save(moduleRef);
    }
  }
}
