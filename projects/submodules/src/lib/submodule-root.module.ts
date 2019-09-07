import { NgModule, NgModuleRef, Inject, Optional, InjectionToken } from '@angular/core';
import { SubmoduleBootstrapperService } from './submodule-bootstrapper.service';
import { SubmoduleLoaderService } from './submodule-loader.service';
import { SubmoduleRootModuleConfig } from './interfaces';

export const SUBMODULE_ROOT_MODULE_CONFIG =
  new InjectionToken<SubmoduleRootModuleConfig>('SUBMODULE_ROOT_MODULE_CONFIG');

const DEFAULT_CONFIG: SubmoduleRootModuleConfig = {
  boostrapImmediately: true,
  lazyLoadImmediately: true,
};

@NgModule()
export class SubmoduleRootModule {
  config: SubmoduleRootModuleConfig;

  constructor(
    @Optional() @Inject(SUBMODULE_ROOT_MODULE_CONFIG) config: SubmoduleRootModuleConfig,
    private boostrapper: SubmoduleBootstrapperService,
    private loader: SubmoduleLoaderService,
  ) {
    config = config || {};
    this.config = { ...DEFAULT_CONFIG, ...config };

    this.lazyLoadIfNeeded();
  }

  private lazyLoadIfNeeded() {
    if (this.config.lazyLoadImmediately) {
      this.loader.lazyLoadSubmodules().subscribe();
    }
  }

  registerFeature(moduleRef: NgModuleRef<any>) {
    if (this.config.boostrapImmediately) {
      this.boostrapper.bootstrap(moduleRef).subscribe();
    } else {
      this.boostrapper.save(moduleRef);
    }
  }
}
