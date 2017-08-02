import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { LSelect2Module } from 'ngx-select2';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LSelect2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
