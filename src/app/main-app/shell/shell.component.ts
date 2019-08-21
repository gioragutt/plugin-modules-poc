import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormEntry, FormsRegistryService } from 'projects/forms-registry';
import { SubmoduleLoaderService } from 'projects/submodules';
import { timer } from 'rxjs';
import { finalize, map, switchMap, tap } from 'rxjs/operators';
import { LoggerSettingsService } from 'src/app/logger/logger-settings.service';

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
  loaded = false;
  loading = false;

  constructor(
    private formsRegistry: FormsRegistryService,
    private loader: SubmoduleLoaderService,
    private loggerSettings: LoggerSettingsService,
  ) { }

  loadLazyModules() {
    this.loaded = false;
    this.loading = true;
    timer(1000).pipe(
      switchMap(() => this.loader.lazyLoadSubmodules()),
      finalize(() => {
        this.loaded = true;
        this.loading = false;
      }),
      tap(module => console.log('Loaded', module.submodule.name)),
    ).subscribe();
  }

  openSettings(): void {
    this.loggerSettings.openSettings();
  }

  onDrop(event: CdkDragDrop<any, any>) {
    console.log(event);
  }
}
