import { Injector } from '@angular/core';
import { concat, MonoTypeOperatorFunction, Observable, of } from 'rxjs';
import { concatMap, defaultIfEmpty, filter, first, mapTo, skipWhile } from 'rxjs/operators';
import { LazySubmodule } from './interfaces';
import { wrapIntoObservable } from './utils/collections';
import { isCanActivate, isFunction } from './utils/type_guard';

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
  if (!submodule.canActivate) {
    return of(true);
  }
  const canActivateGuards = submodule.canActivate
    .map(token => injector.get(token, null))
    .filter(g => !!g);

  const canActivateObservables = canActivateGuards.map(g => {
    if (isCanActivate(g)) {
      return wrapIntoObservable(g.canActivate());
    } else if (isFunction<() => boolean>(g)) {
      return wrapIntoObservable(g());
    } else {
      throw new Error(`Invalid CanActivate guard ${typeof g}`);
    }
  });

  return concat(...canActivateObservables).pipe(
    skipWhile(guardResult => !!guardResult),
    defaultIfEmpty(true),
  );
}
