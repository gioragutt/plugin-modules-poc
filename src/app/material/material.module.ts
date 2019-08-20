import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule,
  MatInputModule,
  MatSelectModule,
  MatRadioModule,
  MatCardModule,
  MatMenuModule,
  MatTabsModule,
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  exports: [
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    MatMenuModule,
    MatTabsModule,
    ReactiveFormsModule,
    DragDropModule,
  ]
})
export class MaterialModule { }
