import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TopBarNavigationComponent } from './top-bar-navigation.component';
@NgModule({
    imports: [
        CommonModule, FormsModule
    ],
    declarations: [TopBarNavigationComponent],
    exports: [TopBarNavigationComponent]
})
export class TopBarNavigationModule { }
