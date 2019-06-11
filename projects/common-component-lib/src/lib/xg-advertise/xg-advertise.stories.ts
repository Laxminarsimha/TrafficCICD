import { action } from '@storybook/addon-actions';
import {
    boolean,
    date,
    number,
    select,
    text,
    string,
    withKnobs,
    object
} from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { addDecorator, storiesOf } from '@storybook/angular';

//  Import components needed by component being tested
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { XgAdvertiseComponent } from './xg-advertise.component';
import { XgTypeaheadComponentModule } from '../xg-typeahead/xg-typeahead.component';
import { XgColumnListItemComponent } from '../xg-column-list-item/xg-column-list-item.component';
import { HttpClientModule } from '@angular/common/http';

//  Import component being tested
const columns = [
    { field: 'AdvName', label: 'Advertiser Name', key: true, searchOn: true },
    { field: 'AdvId', label: 'Advertiser ID', key: true, searchOn: true }
];
const aArray = [
    {
        AdvName: 'EBFF Sales Promotion',
        AdvId: '25475'
    },
    {
        AdvName: 'SWEEPS EXTRA PROMOTIONS',
        AdvId: '39328'
    },
    {
        AdvName: 'EBUI Sales Promotions',
        AdvId: '80542'
    },
    {
        AdvName: 'ERGB Sales Promotion',
        AdvId: '68789'
    }
];

addDecorator(withKnobs);
storiesOf('Components/XgAdvertiseComponent', module)
    .add(
        'Default Usage',
        () => ({
            component: XgAdvertiseComponent,
            moduleMetadata: {
                imports: [BrowserAnimationsModule, XgTypeaheadComponentModule, HttpClientModule],
                schemas: [],
                declarations: [XgColumnListItemComponent],
                providers: []
            },
            props: {
                placeholder: text('Placeholder', ''),
                disabled: boolean('Disabled', false),
                label: text('Label', 'Label'),
                columns: object('TableMeta', columns),
                dataSource: object("TableData", aArray),
                required: boolean('Required', false),
                onValueChange: ($event) => { console.log($event) },
            }
        }),
    )