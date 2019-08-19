import { Type } from '@angular/core';

export interface FormEntry<T = any> {
  component: Type<T>;
  category: string;
  name: string;
}

export type FormEntries = FormEntry[];
