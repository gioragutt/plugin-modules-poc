import { Directive, Input, Type, ViewContainerRef } from '@angular/core';
import { FormsRepository } from 'projects/lazy-feature';

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
    private formsRepository: FormsRepository
  ) { }

  createComponent(componentType: Type<any>): void {
    this.container.clear();
    if (componentType) {
      const cf = this.formsRepository.resolveComponentFactory(componentType);
      this.container.createComponent(cf);
    }
  }
}
