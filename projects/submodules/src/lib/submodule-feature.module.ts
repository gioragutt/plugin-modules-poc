import { NgModule, NgModuleRef } from '@angular/core';
import { SubmoduleRootModule } from './submodule-root.module';

@NgModule()
export class SubmoduleFeatureModule {
  constructor(
    moduleRef: NgModuleRef<any>,
    root: SubmoduleRootModule) {
    root.registerFeature(moduleRef);
  }
}
