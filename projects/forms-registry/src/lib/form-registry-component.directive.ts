import { Directive, Input, Type, ViewContainerRef, ViewRef } from '@angular/core';
import { FormsRegistryService } from './forms-registry.service';
import { FormEntry, FormFromView } from './interfaces';

@Directive({
  selector: '[libFormRegistryComponent]',
  exportAs: 'libFormRegistryComponent',
})
export class FormRegistryComponentDirective<T> {
  @Input() set fromComponent(c: Type<T>) {
    setTimeout(() => this.createComponent(c), 0);
  }

  @Input() set fromExisting(existing: FormFromView) {
    setTimeout(() => this.attachViewRef(existing), 0);
  }

  currentEntry: FormEntry = null;

  get entry(): FormEntry {
    return this.currentEntry;
  }

  get loaded(): boolean {
    return this.container.length > 0;
  }

  constructor(
    private container: ViewContainerRef,
    private formsRegistry: FormsRegistryService
  ) { }

  detach(): ViewRef {
    const viewRef = this.container.detach(0);
    this.currentEntry = null;
    return viewRef;
  }

  attachViewRef({ formEntry, viewRef }: FormFromView): void {
    this.container.clear();
    this.container.insert(viewRef);
    this.currentEntry = formEntry;
  }

  createComponent(componentType: Type<any>): void {
    this.container.clear();
    this.currentEntry = null;
    if (componentType) {
      const { componentFactory, formEntry } = this.formsRegistry.getEntry(componentType);
      this.container.createComponent(componentFactory);
      this.currentEntry = formEntry;
    }
  }
}
