import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CalendarModule } from 'primeng/calendar';
import { BroadcastCalendarComponent } from './broadcast-calendar/broadcast-calendar.component';
import { DateRangeComponent } from './date-range/date-range.component';
import { MatFormFieldModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ButtonModule } from 'primeng/button';
import { PickListModule } from 'primeng/picklist';
import { XgGridModule } from './xg-grid/xg-grid.module';
import * as _moment from 'moment';
// import { XgInputComponent } from './xg-input/xg-input.component';
import { InputTextModule } from 'primeng/inputtext';
import { XgCheckboxComponentModule } from './xg-checkbox/xg-checkbox.component';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { XgTypeaheadComponentModule } from './xg-typeahead/xg-typeahead.component';
import { MultiRequiredValidator } from './xg-typeahead/directives/xg-multi-requireValidator';
import { XgTextareaComponentModule } from './xg-textarea/xg-textarea.component';
import { XgButtonComponentModule } from './xg-button/xg-button.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { XgBreadcrumbComponentModule } from './xg-breadcrumb/xg-breadcrumb.component';
import { XgMultiSelectComponentModule } from './xg-multi-select/xg-multi-select.component';
import { XgRadioComponentModule } from './xg-radio/xg-radio.component';
import { XgTabComponentModule } from './xg-tab/xg-tab.component';
import { XGTabContentTemplate } from './xg-tab/directives/xg-tabcontent';
import { XgInputComponentModule } from './xg-input/xg-input.component';
import { XgInputSwitchComponentModule } from './xg-input-switch/xg-input-switch.component';
import { UserMenuModule } from './user-menu/user-menu.module';
import { TopBarNavigationModule } from './top-bar-navigation/top-bar-navigation.module';
import { TopBarModule } from './top-bar/top-bar.module';
import { MenuItemModule } from './menu-item/menu-item.module'
import { LogoModule } from './logo/logo.module';
import { XgListComponentModule } from './xg-list/xg-list.component';
import { XgStandardListItemComponentModule } from './xg-standard-list-item/xg-standard-list-item.component';
import { XgAdvertiseModule } from './xg-advertise/xg-advertise.component';
import { XgTimePickerModule } from './xg-time-picker/xg-time-picker.component';
import { XgDatePickerComponentModule } from './xg-date-picker/xg-date-picker.component';
import { XgPopupComponentModule } from './xg-popup/xg-popup.component';
import { DialogModule } from 'primeng/dialog';
import { XgDayPickerComponentModule } from './xg-day-picker/xg-day-picker.component';
const moment = _moment;

@NgModule({
    declarations: [
        BroadcastCalendarComponent,
        DateRangeComponent
    ],
    imports: [
        BrowserModule,
        XgTabComponentModule,
        UserMenuModule,
        TopBarModule,
        TopBarNavigationModule,
        DropdownModule,
        CheckboxModule,
        XgBreadcrumbComponentModule,
        InputTextModule,
        XgCheckboxComponentModule,
        CalendarModule,
        MatFormFieldModule,
        FormsModule,
        XgButtonComponentModule,
        XgTypeaheadComponentModule,
        XgTextareaComponentModule,
        ReactiveFormsModule,
        TextMaskModule,
        FontAwesomeModule,
        NgbModule,
        ButtonModule,
        PickListModule,
        XgGridModule,
        InputSwitchModule,
        XgInputComponentModule,
        XgInputSwitchComponentModule,
        XgMultiSelectComponentModule,
        MenuItemModule,
        LogoModule,
        XgStandardListItemComponentModule,
        XgDayPickerComponentModule,
        XgRadioComponentModule, XgListComponentModule, XgAdvertiseModule, HttpClientModule, XgTimePickerModule, XgDatePickerComponentModule,
        XgPopupComponentModule, DialogModule
    ],
    entryComponents: [],
    exports: [
        XgInputComponentModule,
        UserMenuModule,
        XgTabComponentModule,
        TopBarModule,
        TopBarNavigationModule,
        XgGridModule,
        XgRadioComponentModule,
        XgInputSwitchComponentModule,
        XgBreadcrumbComponentModule,
        XgMultiSelectComponentModule,
        XgTypeaheadComponentModule,
        MenuItemModule,
        LogoModule,
        XgTextareaComponentModule,
        XgButtonComponentModule,
        XgStandardListItemComponentModule,
        XgListComponentModule,
        XgCheckboxComponentModule, 
        XgAdvertiseModule, 
        XgTimePickerModule,
        XgDayPickerComponentModule, 
        XgDatePickerComponentModule, 
        XgPopupComponentModule]
})
export class CommonComponentLibModule { }
