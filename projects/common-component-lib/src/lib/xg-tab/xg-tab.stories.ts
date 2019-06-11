import { action } from '@storybook/addon-actions';
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
import { XgTabComponent } from './xg-tab.component';
import { XGTabContentTemplate } from './directives/xg-tabcontent';
//  Import component being tested

addDecorator(withKnobs);

storiesOf('Components/XgTabComponent', module)
    .add(
        'Default Usage',
        () => ({
            component: XgTabComponent,
            moduleMetadata: {
                imports: [],
                schemas: [],
                declarations: [XGTabContentTemplate],
                providers: []
            },
            props: {
                tabs: object("Tabs", [{ "label": 'Tab1', "disable": false, "key": "tab1", "content": "Tab1" }, { "label": 'Tab2', "disable": false, "key": "tab2", "content": "Tab2" }]),
                onTabChange: ($event) => { console.log($event) },
                activeTab: text("Active tab", "tab1")

            }
        })
    )
