import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LogLevel } from './config';
import { Logger } from './logger';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  private loggers: Record<string, Logger> = {};
  private loggersStream = new BehaviorSubject<Logger[]>([]);

  loggers$(): Observable<Logger[]> {
    return this.loggersStream.asObservable();
  }

  get(name: string): Logger {
    return this.loggers[name] || this.addLogger(name);
  }

  private addLogger(name: string) {
    const newLogger = new Logger(name, LogLevel.Error);
    this.loggers[name] = newLogger;
    this.setLoggersList([...this.loggersStream.value, newLogger]);
    return newLogger;
  }

  private setLoggersList(newLoggersList: Logger[]): void {
    this.loggersStream.next(newLoggersList.sort((a, b) => a.name.localeCompare(b.name)));
  }
}
