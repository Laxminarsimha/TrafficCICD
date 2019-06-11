import { action } from '@storybook/addon-actions';
import { boolean, date, number, select, text, string, withKnobs, object, array } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { addDecorator, storiesOf } from '@storybook/angular';

import * as knobs from '@storybook/addon-knobs';

//  Import components needed by component being tested
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MatRadioModule, MatRippleModule } from '@angular/material';

//  Import component being tested
import { CommonModule } from '@angular/common';
import { XgRadioComponent } from './xg-radio.component';

addDecorator(withKnobs);
const options = {
    vertical: 'vertical',
    horizontal: 'horizontal'
};
const defaultValue = 'horizontal'
storiesOf('Components/XgRadioComponent', module)
    .add(
        'Default Usage',
        () => ({
            component: XgRadioComponent,
            moduleMetadata: {
                imports: [RadioButtonModule, BrowserAnimationsModule, CommonModule, MatRadioModule, MatRippleModule],
                schemas: [],
                declarations: [],
                providers: []
            },
            props: {
                disabled: boolean('Disabled', false),
                labelLeft: boolean('Label Left', false),
                displayValue: text('DisplayValue', ''),
                keyValue: text('KeyValue', ''),
                radioOptions: object('Options', ['Option1']),
                checkedValue: text('Check Value', ''),
                layout: select('Layout', options, defaultValue),
                onClick: ($event) => { console.log($event) },
                onValueChange: ($event) => { console.log($event) },
            }
        }),
)