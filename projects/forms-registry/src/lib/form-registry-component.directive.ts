import { Directive, Input, ViewContainerRef } from '@angular/core';
import { FormsRegistryService } from './forms-registry.service';
import { FormEntry, FormEntryViewRef } from './interfaces';

@Directive({
  selector: '[libFormRegistryComponent]',
  exportAs: 'libFormRegistryComponent',
})
export class FormRegistryComponentDirective {
  @Input() set libFormRegistryComponent(formEntryViewRef: FormEntryViewRef) {
    setTimeout(() => {
      if (formEntryViewRef.viewRef) {
        this.attachViewRef(formEntryViewRef);
      } else {
        this.createComponent(formEntryViewRef);
      }
    }, 0);
  }

  private currentEntry: FormEntry = null;

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

  detach(): FormEntryViewRef {
    const viewRef = this.container.detach(0);
    const formEntry = this.currentEntry;
    this.currentEntry = null;
    return { viewRef, formEntry };
  }

  attachViewRef({ formEntry, viewRef }: FormEntryViewRef): void {
    this.container.clear();
    this.container.insert(viewRef);
    this.currentEntry = formEntry;
  }

  createComponent(formEntryViewRef: FormEntryViewRef): void {
    this.container.clear();
    this.currentEntry = null;
    if (formEntryViewRef.formEntry.component) {
      const { componentFactory, formEntry } = this.formsRegistry.getEntry(formEntryViewRef.formEntry.component);
      formEntryViewRef.viewRef = this.container.createComponent(componentFactory).hostView;
      this.currentEntry = formEntry;
    }
  }
}
