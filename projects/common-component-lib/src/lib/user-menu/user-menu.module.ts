import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserMenuComponent } from './user-menu.component';
@NgModule({
    imports: [
        CommonModule, FormsModule
    ],
    declarations: [UserMenuComponent],
    exports: [UserMenuComponent]
})
export class UserMenuModule { }
