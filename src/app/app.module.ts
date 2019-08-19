import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LazySubmodules, SubmodulesModule } from 'projects/submodules';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Feature3Module } from './feature3/feature3.module';
import { FormRepositoryComponentDirective } from './form-repository-component.directive';
import { FormsRegistryModule } from 'projects/forms-registry';
import { AppSubmodulesModule } from './app-submodules.module';

@NgModule({
  declarations: [
    AppComponent,
    FormRepositoryComponentDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppSubmodulesModule,
    FormsRegistryModule.forRoot(),
    Feature3Module,
  ],
  providers: [{
    provide: 'returnFalse',
    useValue: () => false,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
