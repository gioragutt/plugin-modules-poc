import { LogLevel } from './config';

export type LogFunction = (...args: any[]) => void;

export class Logger {
  private readonly byLevel: Record<number, LogFunction>;
  private readonly prefix: string;

  constructor(public readonly name: string, public level: LogLevel) {
    this.byLevel = {
      [LogLevel.Error]: (...args) => this.error(...args),
      [LogLevel.Warn]: (...args) => this.warn(...args),
      [LogLevel.Debug]: (...args) => this.debug(...args),
    };
    this.prefix = `[${this.name}]`;
  }

  warn(...args: any[]): void {
    if (this.canLog(LogLevel.Warn)) {
      console.warn('[WARN]', this.prefix, ...args);
    }
  }

  error(...args: any[]): void {
    if (this.canLog(LogLevel.Error)) {
      console.error('[ERROR]', this.prefix, ...args);
    }
  }

  debug(...args: any[]): void {
    if (this.canLog(LogLevel.Debug)) {
      console.log('[DEBUG]', this.prefix, ...args);
    }
  }

  log(level: LogLevel, ...args: any[]): void {
    const log: LogFunction = this.byLevel[level];
    if (log) {
      log(...args);
    } else {
      this.warn('Tried to log with unknown log level', level);
    }
  }

  private canLog(level: LogLevel): boolean {
    return level <= this.level;
  }
}
