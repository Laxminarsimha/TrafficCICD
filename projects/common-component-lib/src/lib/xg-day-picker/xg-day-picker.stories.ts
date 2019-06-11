import { action } from '@storybook/addon-actions';
import {
    boolean,
    date,
    number,
    select,
    text,
    string,
    withKnobs,
    object,
    array
} from '@storybook/addon-knobs';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { withNotes } from '@storybook/addon-notes';
import { addDecorator, storiesOf } from '@storybook/angular';

import * as knobs from '@storybook/addon-knobs';

//  Import components needed by component being tested
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XgDayPickerComponentModule } from './xg-day-picker.component';
import { XgCheckboxComponentModule } from '../xg-checkbox/xg-checkbox.component';

@Component({
    selector: 'days-picker',
    template: `
  <xg-day-picker [required]="required" [(ngModel)]="dayCode"></xg-day-picker>
    `
})
export class XgDayPickeromponentTest implements OnInit {
    @Input() dayCode: number;
    @Input() required: boolean;
    ngOnInit() {

    }
}
storiesOf('Components/XgDayPicker', module).add(
    'Default Usage',
    () => ({
        component: XgDayPickeromponentTest,
        moduleMetadata: {
            imports: [BrowserAnimationsModule, XgDayPickerComponentModule],
            schemas: [],
            declarations: [],
            providers: []
        },
        props: {
            dayCode: number('DayCode', 96),
            required: boolean('Required', false)

        }

    })
);
