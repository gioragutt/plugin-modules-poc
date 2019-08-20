import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { FormsRegistryModule } from 'projects/forms-registry';
import { AppSubmodulesModule } from './app-submodules.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AppSubmodulesModule,
    FormsRegistryModule.forRoot(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
