import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from './menu.component';
import { MenuItemModule } from '../menu-item/menu-item.module';
@NgModule({
    imports: [
        CommonModule, FormsModule, MenuItemModule
    ],
    declarations: [MenuComponent],
    exports: [MenuComponent]
})
export class MenuModule { }
