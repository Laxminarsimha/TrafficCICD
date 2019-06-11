import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { commonDirectiveModule } from './xgDirectives';
@NgModule({
    imports: [CommonModule, InputTextModule, TextMaskModule, FormsModule, ReactiveFormsModule, commonDirectiveModule],
    exports: [CommonModule, InputTextModule, TextMaskModule, FormsModule, ReactiveFormsModule, commonDirectiveModule],
    declarations: []
})
export class SharedModule { }