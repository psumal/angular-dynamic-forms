import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { StartModule } from "./component/start/start.module";
import { TestModule } from "./component/test/test.module";

@NgModule({
  imports:      [ BrowserModule, StartModule, TestModule],
  declarations: [ AppComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule {  }
