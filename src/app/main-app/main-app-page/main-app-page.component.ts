import { Component, Type } from '@angular/core';
import { FormEntry } from 'projects/forms-registry';
import { SubmoduleLoaderService } from 'projects/submodules';

@Component({
  selector: 'app-main-app-page',
  templateUrl: './main-app-page.component.html',
  styleUrls: ['./main-app-page.component.scss']
})
export class MainAppPageComponent {
  constructor(private loader: SubmoduleLoaderService) {
  }

  selectedForm: Type<any>;

  load() {
    this.loader.lazyLoadSubmodules().subscribe(
      module => console.log('loaded', module.submodule.name));
  }

  onFormClick(event: FormEntry): void {
    this.selectedForm = event.component;
  }
}
