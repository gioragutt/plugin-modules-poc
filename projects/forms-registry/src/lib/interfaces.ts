import { Type, ViewRef } from '@angular/core';

export interface FormEntry<T = any> {
  component: Type<T>;
  category: string;
  name: string;
}

export type FormEntries = FormEntry[];

export interface FormEntryViewRef<T = any> {
  viewRef: ViewRef;
  formEntry: FormEntry<T>;
}
