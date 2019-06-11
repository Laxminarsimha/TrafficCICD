import { action } from '@storybook/addon-actions';
import {
    boolean,
    date,
    number,
    select,
    text,
    string,
    withKnobs
} from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { addDecorator, storiesOf } from '@storybook/angular';

//  Import components needed by component being tested
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxModule } from 'primeng/checkbox';

//  Import component being tested
import { XgCheckboxComponent } from './xg-checkbox.component';

addDecorator(withKnobs);

storiesOf('Components/XgCheckboxComponent', module)
    .add(
        'Default Usage',
        () => ({
            component: XgCheckboxComponent,
            props: {
                disabled: boolean('Disabled', false),
                checkboxModelValue: boolean('Checked', false),
                readOnly: boolean('ReadOnly', false),
                labelLeft: boolean('LabelLeft', false),
                required: boolean('Required', false),
                binary: boolean('Binary', false),
                labelName: text("Label", ""),
                // cbStyleClass: text('CheckboxStyleClass', ''),
                // lbStyleClass: text('LabelStyleClass', ''),                
                onValueChange: ($event) => { console.log($event) }
            }
        }),
    )