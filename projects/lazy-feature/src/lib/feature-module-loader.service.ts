import { Compiler, Injectable, Injector, NgModuleFactory } from '@angular/core';
import { LoadChildrenCallback } from '@angular/router';
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
    private compiler: Compiler,
    private injector: Injector,
  ) { }

  loadModule(feature: LazyFeature): Observable<LoadedLazyFeature> {
    console.log(`[FeatureModuleLoaderService] loadModule(${feature.name})`);
    return of(feature).pipe(
      checkGuards(this.injector),
      mergeMap(f => this.loadLazyFeature(f)),
    );
  }

  private loadLazyFeature(feature: LazyFeature): Observable<LoadedLazyFeature> {
    return this.loadModuleFactory(feature.module).pipe(map((factory: NgModuleFactory<any>) => {
      const module = factory.create(this.injector);
      return new LoadedLazyFeature(feature, module);
    }));
  }

  private loadModuleFactory(moduleToLoad: LoadChildrenCallback): Observable<NgModuleFactory<any>> {
    return wrapIntoObservable(moduleToLoad()).pipe(
      mergeMap(t => {
        if (t instanceof NgModuleFactory) {
          return of(t);
        }
        return from(this.compiler.compileModuleAsync(t));
      }),
    );
  }
}
