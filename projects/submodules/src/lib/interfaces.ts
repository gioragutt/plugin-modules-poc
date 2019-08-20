import { NgModuleRef, Type, InjectionToken } from '@angular/core';
import { LoadChildrenCallback } from '@angular/router';
import { Observable } from 'rxjs';
import { MaybeAsync } from './utils/collections';

export interface LazySubmodule {
  loadChildren: LoadChildrenCallback;
  canLoad?: (Type<any> | InjectionToken<any>)[];
  name: string;
}

export type LazySubmodules = LazySubmodule[];

export interface CanLoad {
  canLoad(): boolean | Promise<boolean> | Observable<boolean>;
}

export interface SubmoduleProcessor {
  process(moduleRef: NgModuleRef<any>): MaybeAsync<void>;
}
