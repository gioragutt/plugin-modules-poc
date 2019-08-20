import { Directive, ViewContainerRef, ElementRef } from '@angular/core';
import { FloatingFormsService } from './floating-forms.service';

@Directive({
  selector: '[appFloatingFormsBoundry]',
})
export class FloatingFormsBoundryDirective {
  constructor(
    container: ViewContainerRef,
    floatingForms: FloatingFormsService
  ) {
    floatingForms.setBoundingView(container);
  }
}
