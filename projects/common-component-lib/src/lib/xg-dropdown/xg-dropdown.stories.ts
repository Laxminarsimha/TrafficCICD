import { action } from '@storybook/addon-actions';
import {boolean, date, number, select, text, string, withKnobs, object, array} from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { addDecorator, storiesOf } from '@storybook/angular';

import * as knobs from '@storybook/addon-knobs';

//  Import components needed by component being tested
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';

//  Import component being tested
import { XgDropdownComponent } from './xg-dropdown.component';

addDecorator(withKnobs);

storiesOf('Components/XgDropdownComponent', module)
    .add(
        'Default Usage',
        () => ({
            component: XgDropdownComponent,
            moduleMetadata: {
                imports: [DropdownModule, BrowserAnimationsModule],
                schemas: [],
                declarations: [],
                providers: []
            },
            props: {
                disabled: boolean('Disabled', false),
                readOnly: boolean('ReadOnly', false),
                required: boolean('Required', false),
                filter: boolean('Filter', false), 
                // filterBy: text('FilterBy', ''),
                label: text('Label', ''),
                displayValue: text('DisplayValue', ''),
                keyValue: text('KeyValue', ''),
                options: object('Options', []),
                // selected: text('Selected', ''),
                placeholder: text('Placeholder', ''),                
                name: text('Name', ''),
                scrollHeight: text('ScrollHeight', ''),
                style: text('Style', ''),
                filterPlaceholder: text('FilterPlaceholder', ''),
                autoWidth: boolean('autoWidth', false),
                autofocus: boolean('Autofocus', true),
                resetFilterOnHide: boolean('ResetFilterOnHide', true),
                emptyFilterMessage: text('emptyFilterMessage', 'No results found'),
                showClear: boolean('ShowClear', false),
                showTransitionOptions: text('ShowTransitionOptions', '225ms ease-out'),
                hideTransitionOptions: text('HideTransitionOptions', '195ms ease-in'),
                onClick: ($event)=>{console.log($event)},
                onFocus: ($event)=>{console.log($event)},
                onBlur: ($event)=>{console.log($event)},
                onShow: ($event)=>{console.log($event)},
                onHide: ($event)=>{console.log($event)}
            }
        }),
    )