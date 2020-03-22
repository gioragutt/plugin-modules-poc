import { NgModule, ModuleWithProviders } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { LoggerSettingsComponent } from './logger-settings/logger-settings.component';
import { LoggerService } from './logger.service';
import { LoggerLevelButtonComponent } from './logger-level-button/logger-level-button.component';
import { LoggerSettingsService } from './logger-settings.service';

@NgModule({
  declarations: [LoggerSettingsComponent, LoggerLevelButtonComponent],
  imports: [MaterialModule],
  exports: [LoggerSettingsComponent],
})
export class LoggerModule {
  static forRoot(): ModuleWithProviders<LoggerModule> {
    return {
      ngModule: LoggerModule,
      providers: [
        LoggerService,
        LoggerSettingsService,
      ]
    };
  }
}
