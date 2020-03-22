import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoggerSettingsComponent } from './logger-settings/logger-settings.component';

@Injectable({
  providedIn: 'root'
})
export class LoggerSettingsService {
  constructor(private dialog: MatDialog) {
  }

  openSettings(): void {
    this.dialog.open(LoggerSettingsComponent);
  }
}
