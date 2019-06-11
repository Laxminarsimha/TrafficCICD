import { addDecorator, storiesOf } from '@storybook/angular';
import * as knobs from '@storybook/addon-knobs';
import {XgGridTestComponent} from './xg-grid-test.component'
import {
    XgDropdownComponentModule,
    XgMultiSelectComponentModule,
    XgGridModule,
    XgInputComponentModule,
    XgTextareaComponentModule,
    XgRadioComponentModule,
    XgCheckboxComponentModule,
    XgInputSwitchComponentModule,
    XgButtonComponentModule,
    XgTypeaheadComponentModule, XgTimePickerModule,
    XgDatePickerComponentModule,
    XgDayPickerComponentModule
} from '@imaginecom/common-component-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
addDecorator(knobs.withKnobs);
storiesOf('Components/XgGridTestComponent', module).add(
    'Default Usage',
    () => ({
        component: XgGridTestComponent,
        moduleMetadata: {
            imports: [
                XgGridModule,
                BrowserAnimationsModule
            ],
            schemas: [],
            declarations: [],
            providers: []
        },
        props: {
            // data: knobs.object('data', marketReference)
            loading: false
        }
    })
);
