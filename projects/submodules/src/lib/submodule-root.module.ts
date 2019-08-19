import { NgModule, NgModuleRef, Inject, Optional } from '@angular/core';
import { SUBMODULE_ROOT_MODULE_CONFIG, SubmoduleRootModuleConfig } from './config';
import { SubmoduleBootstrapperService } from './submodule-bootstrapper.service';

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
