import { Directive, Input, Type, ViewContainerRef } from '@angular/core';
import { FormsRegistryService } from 'projects/forms-registry';

@Directive({
  selector: '[appFormRepsitoryComponent]',
  exportAs: 'appFormRepsitoryComponent',
})
export class FormRepositoryComponentDirective<T> {
  @Input() set appFormRepsitoryComponent(c: Type<T>) {
    this.createComponent(c);
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
