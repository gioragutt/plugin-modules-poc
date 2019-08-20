import { Component, Type } from '@angular/core';
import { FormEntry } from 'projects/forms-registry';
import { SubmoduleLoaderService } from 'projects/submodules';

@Component({
  selector: 'app-main-app-page',
  templateUrl: './main-app-page.component.html',
  styleUrls: ['./main-app-page.component.scss']
})
export class MainAppPageComponent {
  selectedForm: Type<any>;

  onFormClick(event: FormEntry): void {
    this.selectedForm = event.component;
  }
}
