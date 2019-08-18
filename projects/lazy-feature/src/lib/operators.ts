import { Injector } from '@angular/core';
import { MonoTypeOperatorFunction, Observable, concat, of } from 'rxjs';
import { filter, skipWhile, defaultIfEmpty, mapTo, concatMap, first } from 'rxjs/operators';
import { LazyFeature } from './config';
import { isCanActivate, isFunction } from './utils/type_guard';
import { wrapIntoObservable } from './utils/collections';

export function checkGuards(injector: Injector): MonoTypeOperatorFunction<LazyFeature> {
  return (source: Observable<LazyFeature>) => {
    return source.pipe(
      concatMap(feature =>
        runCanActive(injector, feature).pipe(
          first(),
          filter(result => !!result),
          mapTo(feature),
        )),
    );
  };
}

function runCanActive(injector: Injector, feature: LazyFeature): Observable<boolean> {
  if (!feature.canActivate) {
    return of(true);
  }
  const canActivateGuards = feature.canActivate
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
