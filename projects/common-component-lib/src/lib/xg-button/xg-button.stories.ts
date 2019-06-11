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
import { XgButtonComponent } from './xg-button.component';

addDecorator(withKnobs);
const options = {
    Button: 'button',
    Submit: 'submit',
    Reset: 'reset',
    Save: 'save',
    Clear: 'clear'
};
const buttonOptions = [
    { "optionIcon": "", "optionDisable": "", "optionClick": checkFun, "optionId": "", "optionValue": "Button1" }
]
function checkFun(event: Event) {
    console.log(event);
}
const defaultValue = 'button';
storiesOf('Components/XgButtonComponent', module).add(
    'Default Usage',
    () => ({
        component: XgButtonComponent,
        moduleMetadata: {
            imports: [BrowserAnimationsModule],
            schemas: [],
            declarations: [],
            providers: []
        },
        props: {
            type: select("Type", options, defaultValue),
            disabled: boolean('Disabled', false),
            label: text('Label', ''),
            icon: text('Icon', ''),
            iconPos: text('IconPosition', ''),
            xgButtonDropdown: boolean('Dropdown', false),
            xgButtonClass: text('ButtonClass', ''),
            optionsButtons: object("Options", buttonOptions),
            onClick: ($event) => { console.log($event); }
        }

    })
);
