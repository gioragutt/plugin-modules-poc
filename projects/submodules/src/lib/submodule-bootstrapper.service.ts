import { Injectable, NgModuleRef } from '@angular/core';
import { SubmodulesProcessorsService } from './submodules-processors.service';
import { Observable, from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubmoduleBootstrapperService {
  private modulesToLoad: NgModuleRef<any>[] = [];

  constructor(private processors: SubmodulesProcessorsService) {
  }

  bootstrapSaved(): Observable<void> {
    return from(this.modulesToLoad).pipe(
      mergeMap((module: NgModuleRef<any>) => this.bootstrap(module)),
    );
  }

  bootstrap(module: NgModuleRef<any>): Observable<void> {
    return this.processors.process(module);
  }

  save(module: NgModuleRef<any>): void {
    this.modulesToLoad.push(module);
  }
}
