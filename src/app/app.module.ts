import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { MatCard, MatCardContent,MatInputModule,MatButtonModule } from '@angular/material';
import  {MatStepperModule  } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material';
import { XgDurationModule } from '@imaginecom/common-component-lib';


exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule ] ;
   
@NgModule({
    declarations: [],
    imports: [BrowserModule, RouterModule.forRoot([]), HttpClientModule,MatFormFieldModule,MatCard,MatCardContent,MatStepperModule,MatInputModule],
    providers: [],
    bootstrap: []
})
export class AppModule { }
