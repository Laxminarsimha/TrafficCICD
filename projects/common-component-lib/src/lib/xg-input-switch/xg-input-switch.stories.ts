import { action } from '@storybook/addon-actions';
import { boolean, date, number, select, text, string, withKnobs, object, array } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { addDecorator, storiesOf } from '@storybook/angular';

import * as knobs from '@storybook/addon-knobs';

//  Import components needed by component being tested
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputSwitchModule } from 'primeng/inputswitch';

//  Import component being tested
import { XgInputSwitchComponent } from './xg-input-switch.component';

addDecorator(withKnobs);

storiesOf('Components/XgInputSwitchComponent', module)
    .add(
        'Default Usage',
        () => ({
            component: XgInputSwitchComponent,
            moduleMetadata: {
                imports: [InputSwitchModule, BrowserAnimationsModule],
                schemas: [],
                declarations: [],
                providers: []
            },
            props: {
                label: text('Label', ''),
                disabled: boolean('Disabled', false),
                checked: boolean('Checked', false),
                onValueChange: ($event) => { console.log($event) },
            }
        }),
    )