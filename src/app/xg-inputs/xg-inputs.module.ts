import { NgModule } from '@angular/core';
import { CommonComponentLibModule } from "projects/common-component-lib/src/lib/common-component-lib.module";
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonComponentLibModule,
    BrowserAnimationsModule
  ],
  declarations: [],
  entryComponents: [],
  exports: [BrowserModule, BrowserAnimationsModule, CommonComponentLibModule]
})
export class XgInputsModule { }
