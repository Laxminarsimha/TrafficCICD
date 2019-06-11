import { action } from '@storybook/addon-actions';
import { boolean, date, number, select, text, string, withKnobs, object, array } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { addDecorator, storiesOf } from '@storybook/angular';

import * as knobs from '@storybook/addon-knobs';

//  Import components needed by component being tested
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MultiSelectModule } from 'primeng/multiselect';

//  Import component being tested
import { XgMultiSelectComponent } from './xg-multi-select.component';
import { CommonModule } from '@angular/common';

addDecorator(withKnobs);

storiesOf('Components/XgMultiSelectComponent', module)
    .add(
        'Default Usage',
        () => ({
            component: XgMultiSelectComponent,
            moduleMetadata: {
                imports: [MultiSelectModule, BrowserAnimationsModule, CommonModule],
                schemas: [],
                declarations: [],
                providers: []
            },
            props: {
                label: text('Label', ''),
                disabled: boolean('Disabled', false),
                readonly: boolean('ReadOnly', false),
                required: boolean('Required', false),
                displayValue: text('DisplayValue', ''),
                keyValue: text('KeyValue', ''),
                options: object('Options', []),
                showHeader: boolean('Show Header', false),
                filter: boolean('Filter', false),
                selectionLimit: number('Selection Limit', ''),
                maxSelectedLabels: number('Selected Lables', 3),
                filterPlaceHolder: text('Filter Placeholder', ''),
                placeholder: text('Placeholder', 'Choose'),
                onValueChange: ($event) => { console.log($event) },
                onClick: ($event) => { console.log($event) },
                onFocus: ($event) => { console.log($event) },
                onBlur: ($event) => { console.log($event) },
            }
        }),
    )