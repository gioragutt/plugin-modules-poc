import { Type, NgModuleRef, InjectionToken } from '@angular/core';
import { LoadChildrenCallback } from '@angular/router';

export interface FormEntry<T = any> {
  component: Type<T>;
  category: string;
  name: string;
}

export interface LazyFeatureConfig {
  forms?: FormEntry[];
}

export interface LazyFeature {
  module: LoadChildrenCallback;
  canActivate?: any[];
  name: string;
}

export type LazyFeatures = LazyFeature[];

export class LoadedLazyFeature {
  constructor(
    public feature: LazyFeature,
    public module: NgModuleRef<any>
  ) { }
}

export const FEATURE_CONFIG = new InjectionToken<LazyFeatureConfig>('FEATURE_CONFIG');
export const LAZY_FEATURES = new InjectionToken<LazyFeature[]>('LAZY_FEATURES');
