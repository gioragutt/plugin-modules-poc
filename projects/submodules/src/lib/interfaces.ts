import { NgModuleRef } from '@angular/core';
import { LoadChildrenCallback } from '@angular/router';
import { Observable } from 'rxjs';
import { MaybeAsync } from './utils/collections';

export interface LazySubmodule {
  loadChildren: LoadChildrenCallback;
  canActivate?: any[];
  name: string;
}

export type LazySubmodules = LazySubmodule[];

export interface CanActivate {
  canActivate(): boolean | Promise<boolean> | Observable<boolean>;
}

export interface SubmoduleProcessor {
  process(moduleRef: NgModuleRef<any>): MaybeAsync<void>;
}
