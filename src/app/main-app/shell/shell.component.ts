import { Component, EventEmitter, Output } from '@angular/core';
import { FormEntry, FormsRegistryService } from 'projects/forms-registry';
import { map } from 'rxjs/operators';

export function groupArrayBy<T, K>(keySelector: (t: T) => K): (values: T[]) => Record<any, T[]> {
  return (values: T[]) => {
    return values.reduce((acc, v) => {
      const key = keySelector(v);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key] = acc[key] ? [...acc[key], v] : [v];
      return acc;
    }, {} as any);
  };
}

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
  formEntries$ = this.formsRegistry.formEntries$().pipe(
    map(groupArrayBy(f => f.category)),
  );

  @Output() formClick = new EventEmitter<FormEntry>();

  constructor(private formsRegistry: FormsRegistryService) { }
}
