import { action } from '@storybook/addon-actions';
import { boolean, date, number, select, text, string, withKnobs, object, array } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { addDecorator, storiesOf } from '@storybook/angular';

import * as knobs from '@storybook/addon-knobs';

//  Import components needed by component being tested
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';

//  Import component being tested
import { XgTimePickerComponent } from './xg-time-picker.component';
import { XgInputComponentModule } from '../xg-input/xg-input.component';
import { TimeValidator } from './directives/xg-time-formatValidator';

addDecorator(withKnobs);

storiesOf('Components/XgTimePickerComponent', module)
    .add(
        'Default Usage',
        () => ({
            component: XgTimePickerComponent,
            moduleMetadata: {
                imports: [CalendarModule, BrowserAnimationsModule, XgInputComponentModule],
                schemas: [],
                declarations: [TimeValidator],
                providers: []
            },
            props: {
                label: text('Label', 'Timepicker'),
                placeholder: text('Placeholder', 'Select Time Picker'),
                disabled: boolean('Disabled', false),
                required: boolean('Required', false),
                hourFormat: boolean('24HourFormat', false),
                validateOn: text('Validate On', 'change'),
                onValueChange: ($event) => { console.log($event) },
                onFocus: ($event) => { console.log($event) },
                onBlur: ($event) => { console.log($event) },
                onSelect: ($event) => { console.log($event) }
            }
        }),
    )