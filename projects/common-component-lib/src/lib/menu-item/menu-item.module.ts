import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuItemComponent } from './menu-item.component';
import { NavigationService } from '../services/navigation/navigation.service';
import { INavigationItem } from '../services/navigation/navigation.interface';

@NgModule({
    imports: [
        CommonModule, FormsModule
    ],
    declarations: [MenuItemComponent],
    exports: [MenuItemComponent],
    providers: [NavigationService]
})
export class MenuItemModule { }
