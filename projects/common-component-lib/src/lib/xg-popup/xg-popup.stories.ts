import { action } from '@storybook/addon-actions';
import { boolean, date, number, select, text, string, withKnobs, object, array, int } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { addDecorator, storiesOf } from '@storybook/angular';

import * as knobs from '@storybook/addon-knobs';

//  Import components needed by component being tested
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RadioButtonModule } from 'primeng/radiobutton';

//  Import component being tested
import { CommonModule } from '@angular/common';
import { XgPopupComponent } from './xg-popup.component';
import { XgButtonComponentModule } from '../xg-button/xg-button.component';
import { DialogModule } from 'primeng/dialog';

addDecorator(withKnobs);
const options = {
    vertical: 'vertical',
    horizontal: 'horizontal'
};
const defaultValue = 'horizontal'
storiesOf('Components/XgPopupComponent', module)
    .add(
        'Default Usage',
        () => ({
            component: XgPopupComponent,
            moduleMetadata: {
                imports: [BrowserAnimationsModule, CommonModule, XgButtonComponentModule, DialogModule],
                schemas: [],
                declarations: [],
                providers: []
            },
            props: {
                header: text('Header', ''),
                draggable: boolean('Draggable', true),
                resizable: boolean('Resizable', true),
                visible: boolean('Visible', false),
                modal: boolean('Model', false),
                blockScroll: boolean('BlockScroll', false),
                dismissableMask: boolean('DismissableMask', false),
                closable: boolean('Closable', true),
                maximizable: boolean('Maximizable', false),
                responsive: boolean('Responsive', true),
                minX: number('Min X', 70),
                minY: number('Min Y', 70),
                content: text('PopupContent', ''),
                showHeader: boolean('ShowHeader', true),
                autoZIndex: boolean('AutoZ Index', true),
                style: object("Style", { width: '300px', height: '200px' }),
                onShow: ($event) => { console.log($event) },
                onHide: ($event) => { console.log($event) },
            }
        }),
    )