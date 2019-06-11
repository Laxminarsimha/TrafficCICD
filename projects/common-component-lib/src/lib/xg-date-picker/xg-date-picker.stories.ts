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
import { withNotes } from '@storybook/addon-notes';
import { addDecorator, storiesOf } from '@storybook/angular';

import * as knobs from '@storybook/addon-knobs';

//  Import components needed by component being tested
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XgDatePickerComponent } from './xg-date-picker.component';
import { XgInputComponentModule } from '../xg-input/xg-input.component';
import { DateValidator } from './directives/xg-date-pickerValidator';

const options = [
    'MM/dd/yy', 'MM/dd/yyyy', 'dd/MM/yyyy', 'yyyy/MM/dd', 'd.M.yyyy', 'dd.MM.yyyy', 'yyyy-M-d', 'yyyy-MM-dd', 'd MMM yyyy', 'dd MMM yyyy'
];

storiesOf('Components/XgDatePicker', module).add(
    'Default Usage',
    () => ({
        component: XgDatePickerComponent,
        moduleMetadata: {
            imports: [BrowserAnimationsModule, XgInputComponentModule],
            schemas: [],
            declarations: [DateValidator],
            providers: []
        },
        props: {
            label: text('Label', 'Date'),
            disabled: boolean('Disabled', false),
            required: boolean('Required', false),
            placeholder: text('Placeholder', 'Select Date Picker'),
            formatter: select('Format', options),
            minDate: text('Minimum Date(yyyy-MM-dd)', ''),
            maxDate: text('Maximum Date(yyyy-MM-dd)', ''),
            boardCastCalenderView: boolean('BoardCast Calender', false),
            validateOn: text('Validate On', 'change'),
            onValueChange: ($event) => { console.log($event) },
            onBlur: ($event) => { console.log($event) },
            onFocus: ($event) => { console.log($event) }
        }

    })
);
