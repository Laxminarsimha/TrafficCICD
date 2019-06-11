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
import { XgTextareaComponent } from './xg-textarea.component';

//  Import component being tested

addDecorator(withKnobs);
const defaultValue = [{
    "errorRequired": {
        "type": "danger",
        "msg": "",
        "style":
            { "font-style": "italic" }
    },
    "errorMinlength": {
        "type": "danger",
        "msg": "",
        "style":
            { "font-style": "italic" }
    }
}]


storiesOf('Components/XgTextareaComponent', module).add(
    'Default Usage',
    () => ({
        component: XgTextareaComponent,
        moduleMetadata: {
            imports: [BrowserAnimationsModule],
            schemas: [],
            declarations: [],
            providers: []
        },
        props: {
            placeholder: text('Placeholder', 'Placeholder'),
            disabled: boolean('Disabled', false),
            labelName: text('Label', 'Label'),
            required: boolean('Required', false),
            validateOn: text('Validate On', 'change'),
            minlength: number('Minlength', 0),
            maxlength: number('Maximum length', 10),
            rows: number('Rows', 2),
            cols: number('Columns', 0),
            onValueChange: $event => {
                console.log($event);
            },
            onBlur: $event => {
                console.log($event);
            },
            onFocus: $event => {
                console.log($event);
            }
        }
    })
);
