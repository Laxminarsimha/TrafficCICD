import { addDecorator, storiesOf } from '@storybook/angular';
import * as knobs from '@storybook/addon-knobs';

//  Import component being tested
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';
import { XgInputComponent } from 'projects/common-component-lib/src/lib/xg-input/xg-input.component';
import { XgInputsModule } from './xg-inputs.module';
import { XgInputsComponent } from './xg-inputs.component';
import { XgDropdownComponentModule } from 'projects/common-component-lib/src/lib/xg-dropdown/xg-dropdown.component';

addDecorator(knobs.withKnobs);
storiesOf('Components/XgInputsComponent', module).add(
    'Default Usage',
    () => ({
        component: XgInputsComponent,
        moduleMetadata: {
            imports: [
                XgInputsModule,
                BrowserAnimationsModule,
                CalendarModule,
                XgDropdownComponentModule
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
