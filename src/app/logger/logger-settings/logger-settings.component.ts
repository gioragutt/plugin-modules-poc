import { Component } from '@angular/core';
import { LoggerService } from '../logger.service';
import { LogLevel } from '../config';

@Component({
  selector: 'app-logger-settings',
  templateUrl: './logger-settings.component.html',
  styleUrls: ['./logger-settings.component.scss']
})
export class LoggerSettingsComponent {
  loggers$ = this.loggerService.loggers$();
  LogLevel = LogLevel;

  constructor(private loggerService: LoggerService) { }
}
