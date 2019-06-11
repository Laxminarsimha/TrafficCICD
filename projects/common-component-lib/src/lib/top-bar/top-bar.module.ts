import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopBarComponent } from './top-bar.component';
@NgModule({
    imports: [
        CommonModule, FormsModule
    ],
    declarations: [TopBarComponent],
    exports: [TopBarComponent]
})
export class TopBarModule { }
