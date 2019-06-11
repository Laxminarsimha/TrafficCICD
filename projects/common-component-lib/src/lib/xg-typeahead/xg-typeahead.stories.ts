import { action } from '@storybook/addon-actions';
import { from, Observable } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';
import {
    boolean,
    number,
    text,
    withKnobs,
    object
} from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { addDecorator, storiesOf } from '@storybook/angular';

//  Import components needed by component being tested
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { TextMaskModule } from 'angular2-text-mask';
import * as xgNotes from './README.md';
import { MultiRequiredValidator } from './directives/xg-multi-requireValidator';

//  Import component being tested
import { XgTypeaheadComponent } from './xg-typeahead.component';
import { XgObjectUtils } from '../shared/utilities';
const aArray = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
    'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
    'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
    'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
    'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']

addDecorator(withKnobs);

storiesOf('Components/XgTypeaheadComponent', module)
    .add(
        'Default Usage',
        () => ({
            component: XgTypeaheadComponent,
            moduleMetadata: {
                imports: [],
                schemas: [],
                declarations: [MultiRequiredValidator],
                providers: []
            },
            props: {
                placeholder: text('Placeholder', 'states'),
                disabled: boolean('Disabled', false),
                labelName: text("Label", "typeahead"),
                required: boolean('Required', false),
                onValueChange: ($event) => { console.log($event) },
                onBlur: ($event) => { console.log($event) },
                onFocus: ($event) => { console.log($event) },
                debounceTime: number("Debounce Time", 3000),
                suggestions: object("Suggestions", aArray),
                // onSearch: (val) => {
                //     return new Observable(observer => {
                //         const aFilteredArray = aArray.filter(v => v.toLowerCase().indexOf(val.toLowerCase()) > -1)
                //         observer.next(aFilteredArray)
                //     })
                // }

            }
        }),
    // {
    //     notes: { markdown: xgNotes }
    // }
)
    .add(
        'Multi select',
        () => ({
            component: XgTypeaheadComponent,
            moduleMetadata: {
                imports: [],
                schemas: [],
                declarations: [MultiRequiredValidator],
                providers: []
            },
            props: {
                placeholder: text('Placeholder', 'States'),
                disabled: boolean('Disabled', false),
                labelName: text("Label", "typeahead"),
                multiple: boolean("Multiple", true),
                required: boolean('Required', false),
                onValueChange: ($event) => { console.log($event) },
                onBlur: ($event) => { console.log($event) },
                onFocus: ($event) => { console.log($event) },
                suggestions: object("Suggestions", aArray)
                // onSearch: (val) => {
                //     return new Observable(observer => {
                //         const aFilteredArray = aArray.filter(v => v.toLowerCase().indexOf(val.toLowerCase()) > -1).slice(0, 10)
                //         observer.next(aFilteredArray)
                //     })
                // }

            }
        }),
    // {
    //     notes: { markdown: xgNotes }
    // }
)