import { Component, Input } from '@angular/core';
import { LogLevel } from '../config';
import { Logger } from '../logger';

@Component({
  selector: 'app-logger-level-button',
  templateUrl: './logger-level-button.component.html',
  styleUrls: ['./logger-level-button.component.scss']
})
export class LoggerLevelButtonComponent {
  @Input() logger: Logger;
  @Input() level: LogLevel;
  @Input() color: string;
  @Input() icon: string;

  get sameLevel(): boolean {
    return this.logger.level === this.level;
  }

  onClick() {
    this.logger.level = this.level;
  }
}
