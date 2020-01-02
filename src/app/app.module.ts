import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormsRegistryModule } from 'projects/forms-registry';
import { AppPluginsModule } from './app-plugins.module';
import { FloatingFormsModule } from './floating-forms/floating-forms.module';
import { LoggerModule } from './logger/logger.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AppPluginsModule,
    FormsRegistryModule.forRoot(),
    FloatingFormsModule.forRoot(),
    LoggerModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
