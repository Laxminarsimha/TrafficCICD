import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogoComponent } from './logo.component';
@NgModule({
    imports: [
        CommonModule, FormsModule
    ],
    declarations: [LogoComponent],
    exports: [LogoComponent]
})
export class LogoModule { }
