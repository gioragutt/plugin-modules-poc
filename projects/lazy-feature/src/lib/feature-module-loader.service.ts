import { Injectable, Injector, NgModuleFactory, Compiler } from '@angular/core';
import { Observable, of, from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { LoadedLazyFeature, LazyFeature } from './config';
import { wrapIntoObservable } from './utils/collections';
import { checkGuards } from './operators';

@Injectable({
  providedIn: 'root'
})
export class FeatureModuleLoaderService {
  constructor(
    private injector: Injector,
    private compiler: Compiler,
  ) { }

  loadModule(feature: LazyFeature): Observable<LoadedLazyFeature> {
    console.log(`[FeatureModuleLoaderService] loadModule(${feature.name})`);
    return of(feature).pipe(
      checkGuards(this.injector),
      mergeMap(f => this.loadLazyFeature(f)),
    );
  }

  private loadLazyFeature(feature: LazyFeature): Observable<LoadedLazyFeature> {
    return this.loadModuleFactory(feature).pipe(map((factory: NgModuleFactory<any>) => {
      const module = factory.create(this.injector);
      return new LoadedLazyFeature(feature, module);
    }));
  }

  private loadModuleFactory({ loadChildren: module, name }: LazyFeature): Observable<NgModuleFactory<any>> {
    return wrapIntoObservable(module()).pipe(
      mergeMap(t => {
        if (t instanceof NgModuleFactory) {
          // AOT
          return of(t);
        }

        try {
          // JIT
          return from(this.compiler.compileModuleAsync(t));
        } catch (e) {
          throw new Error(`Module ${name} exported incorrectly. An NgModule or NgModuleFactory should be exported`);
        }
      }),
    );
  }
}
