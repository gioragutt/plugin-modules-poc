import { InjectionToken, NgModuleRef, Type, Provider } from '@angular/core';
import { LazySubmodule, SubmoduleProcessor } from './interfaces';

export class LoadedLazySubmodule {
  constructor(
    public submodule: LazySubmodule,
    public moduleRef: NgModuleRef<any>
  ) { }
}

export interface SubmoduleRootModuleConfig {
  boostrapImmediately?: boolean;
}
export const SUBMODULE_ROOT_MODULE_CONFIG =
  new InjectionToken<SubmoduleRootModuleConfig>('SUBMODULE_ROOT_MODULE_CONFIG');

export const LAZY_SUBMODULES = new InjectionToken<LazySubmodule[]>('LAZY_SUBMODULES');
export const SUBMOUDLE_PROCESSORS = new InjectionToken<SubmoduleProcessor[]>('SUBMOUDLE_PROCESSORS');

export function provideSubmoduleProcessor<P extends SubmoduleProcessor>(t: Type<P>): Provider {
  return {
    provide: SUBMOUDLE_PROCESSORS,
    useClass: t,
    multi: true,
  };
}
