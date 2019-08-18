import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-feature2-page',
  templateUrl: './feature2-page.component.html',
  styleUrls: ['./feature2-page.component.scss']
})
export class Feature2PageComponent {

  data$ = this.dataService.data$;

  constructor(private dataService: DataService) { }
}
