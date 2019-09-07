import { Injector } from '@angular/core';
import { concat, MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { concatMap, defaultIfEmpty, filter, first, mapTo, skipWhile } from 'rxjs/operators';
import { LazySubmodule } from './interfaces';
import { wrapIntoObservable } from './utils/collections';
import { isCanLoad, isFunction } from './utils/type_guard';

export function checkGuards(injector: Injector): MonoTypeOperatorFunction<LazySubmodule> {
  return (source: Observable<LazySubmodule>) => {
    return source.pipe(
      concatMap(submodule =>
        runCanActive(injector, submodule).pipe(
          first(),
          filter(result => !!result),
          mapTo(submodule),
        )),
    );
  };
}

function runCanActive(injector: Injector, submodule: LazySubmodule): Observable<boolean> {
  if (!submodule.canLoad) {
    return of(true);
  }
  const canLoadGuards = submodule.canLoad
    .map(token => injector.get(token, null))
    .filter(g => !!g);

  const canLoadObservables = canLoadGuards.map(g => {
    if (isCanLoad(g)) {
      return wrapIntoObservable(g.canLoad(submodule));
    } else if (isFunction<() => boolean>(g)) {
      return wrapIntoObservable(g());
    } else {
      throw new Error(`Invalid CanLoad guard ${typeof g}`);
    }
  });

  return concat(...canLoadObservables).pipe(
    skipWhile(guardResult => !!guardResult),
    defaultIfEmpty(true),
  );
}
