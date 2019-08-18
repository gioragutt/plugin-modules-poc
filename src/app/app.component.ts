import { Component, TemplateRef, Type } from '@angular/core';
import { BootstrapperService, FormsRepository } from 'projects/lazy-feature';
import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

function groupBy<T, K>(keySelector: (t: T) => K): OperatorFunction<T[], Record<any, T[]>> {
  return (source: Observable<T[]>) => source.pipe(
    map((values: T[]) => {
      return values.reduce((acc, v) => {
        const key = keySelector(v);
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key] = acc[key] ? [...acc[key], v] : [v];
        return acc;
      }, {} as any);
    }));
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'lazy-loading-modules';
  formEntries$ = this.formsRepo.formEntries$().pipe(
    groupBy(f => f.category),
  );

  pickedComponent: Type<any>;

  constructor(boostrapperService: BootstrapperService, private formsRepo: FormsRepository) {
    boostrapperService.boostrap().subscribe(feature => {
      console.log(`Feature ${feature.feature.name} loaded`);
    });
  }
}
