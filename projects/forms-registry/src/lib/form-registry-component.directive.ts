import { Directive, Input, Type, ViewContainerRef } from '@angular/core';
import { FormsRegistryService } from './forms-registry.service';

@Directive({
  selector: '[libFormRegistryComponent]',
  exportAs: 'libFormRegistryComponent',
})
export class FormRepositoryComponentDirective<T> {
  @Input() set libFormRegistryComponent(c: Type<T>) {
    setTimeout(() => this.createComponent(c), 0);
  }

  get loaded(): boolean {
    return this.container.length > 0;
  }

  constructor(
    private container: ViewContainerRef,
    private formsRegistry: FormsRegistryService
  ) { }

  createComponent(componentType: Type<any>): void {
    this.container.clear();
    if (componentType) {
      const cf = this.formsRegistry.resolveComponentFactory(componentType);
      this.container.createComponent(cf);
    }
  }
}
