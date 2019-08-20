import { Component } from '@angular/core';
import { FormEntry } from 'projects/forms-registry';
import { FloatingFormsService } from 'src/app/floating-forms/floating-forms.service';

@Component({
  selector: 'app-main-app-page',
  templateUrl: './main-app-page.component.html',
  styleUrls: ['./main-app-page.component.scss']
})
export class MainAppPageComponent {
  constructor(private floatingForms: FloatingFormsService) {
  }

  onFormClick(formEntry: FormEntry): void {
    this.floatingForms.open(formEntry);
  }
}
