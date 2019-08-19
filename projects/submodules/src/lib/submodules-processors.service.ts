import { Injectable, Inject, NgModuleRef } from '@angular/core';
import { SubmoduleProcessor } from './interfaces';
import { SUBMOUDLE_PROCESSORS } from './config';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { wrapIntoObservable } from './utils/collections';

@Injectable({
  providedIn: 'root'
})
export class SubmodulesProcessorsService {
  submoduleProcessors: SubmoduleProcessor[];

  constructor(@Inject(SUBMOUDLE_PROCESSORS) submoduleProcessors: SubmoduleProcessor[]) {
    this.submoduleProcessors = submoduleProcessors;
  }

  process(moduleRef: NgModuleRef<any>): Observable<void> {
    return from(this.submoduleProcessors).pipe(
      mergeMap(processor => wrapIntoObservable(processor.process(moduleRef))),
    );
  }
}
