import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { LAZY_SUBMODULES } from './config';
import { LazySubmodules } from './interfaces';
import { SubmoduleFeatureModule } from './submodule-feature.module';
import { SubmoduleRootModule, SubmoduleRootModuleConfig, SUBMODULE_ROOT_MODULE_CONFIG } from './submodule-root.module';

@NgModule()
export class SubmodulesModule {
  static forFeature(): Type<any> {
    return SubmoduleFeatureModule;
  }

  static forRoot(
    lazySubmodules: LazySubmodules,
    config?: SubmoduleRootModuleConfig
  ): ModuleWithProviders<SubmoduleRootModule> {
    return {
      ngModule: SubmoduleRootModule,
      providers: [
        { provide: LAZY_SUBMODULES, useValue: lazySubmodules },
        { provide: SUBMODULE_ROOT_MODULE_CONFIG, useValue: config }
      ]
    };
  }
}
