import { Injectable, ComponentFactory, Type } from '@angular/core';
import { FormEntry } from '../config';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface RepositoryEntry<T = any> {
  formEntry: FormEntry<T>;
  componentFactory: ComponentFactory<T>;
}

@Injectable({
  providedIn: 'root'
})
export class FormsRepository {
  private repositoryEntries = new BehaviorSubject<RepositoryEntry[]>([]);

  formEntries$(): Observable<FormEntry[]> {
    return this.repositoryEntries.pipe(
      map(entries => entries.map(e => e.formEntry)),
    );
  }

  add<T = any>(formEntry: FormEntry<T>, componentFactory: ComponentFactory<T>) {
    const next = [...this.repositoryEntries.value, { formEntry, componentFactory }];
    this.repositoryEntries.next(next);
  }

  resolveComponentFactory<T>(component: Type<T>): ComponentFactory<T> | null {
    const entry = this.repositoryEntries.value.find(e => e.formEntry.component === component);
    return entry ? entry.componentFactory : null;
  }
}
