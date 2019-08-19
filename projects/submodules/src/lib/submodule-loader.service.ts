import { Compiler, Injectable, Injector, NgModuleFactory } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { LoadedLazySubmodule } from './config';
import { LazySubmodule } from './interfaces';
import { checkGuards } from './operators';
import { wrapIntoObservable } from './utils/collections';

@Injectable({
  providedIn: 'root'
})
export class SubmoduleLoaderService {
  constructor(private injector: Injector, private compiler: Compiler) { }

  loadModule(submodule: LazySubmodule): Observable<LoadedLazySubmodule> {
    return of(submodule).pipe(
      checkGuards(this.injector),
      mergeMap(f => this.loadLazySubmodule(f)),
    );
  }

  private loadLazySubmodule(submodule: LazySubmodule): Observable<LoadedLazySubmodule> {
    return this.loadModuleFactory(submodule).pipe(map((factory: NgModuleFactory<any>) => {
      const module = factory.create(this.injector);
      return new LoadedLazySubmodule(submodule, module);
    }));
  }

  private loadModuleFactory({ loadChildren: module, name }: LazySubmodule): Observable<NgModuleFactory<any>> {
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
