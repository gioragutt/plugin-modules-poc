import { Injectable, Inject } from '@angular/core';
import { LoadedLazyFeature, LazyFeature, LAZY_FEATURES } from './config';
import { Observable, from } from 'rxjs';
import { FeatureModuleLoaderService } from './feature-module-loader.service';
import { FeatureConfigLoaderService } from './feature-config-loader.service';
import { mergeMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BootstrapperService {
  private lazyFeatures: LazyFeature[];

  constructor(
    @Inject(LAZY_FEATURES) lazyFeatures: LazyFeature[],
    private moduleLoader: FeatureModuleLoaderService,
    private configLoader: FeatureConfigLoaderService,
  ) {
    this.lazyFeatures = lazyFeatures;
  }

  boostrap(): Observable<LoadedLazyFeature> {
    return from(this.lazyFeatures).pipe(
      mergeMap(feature => this.moduleLoader.loadModule(feature)),
      tap(loaded => this.configLoader.load(loaded.module, loaded.feature.name)),
      tap(loaded => console.log(`[BootstrapperService] loaded ${loaded.feature.name}`))
    );
  }
}
