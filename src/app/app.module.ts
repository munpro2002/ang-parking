import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';

import { FormsModule } from '@angular/forms';
import { FormReactiveComponent } from './form-reactive/form-reactive.component';

@NgModule({
  declarations: [AppComponent, FormComponent, FormReactiveComponent],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
