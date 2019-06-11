import { action } from '@storybook/addon-actions';
import { boolean, date, number, select, text, string, withKnobs, object, array } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { addDecorator, storiesOf } from '@storybook/angular';
import { RouterModule } from "@angular/router";
import { APP_BASE_HREF } from '@angular/common';

import * as knobs from '@storybook/addon-knobs';

//  Import components needed by component being tested
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputSwitchModule } from 'primeng/inputswitch';

//  Import component being tested
import { XgBreadcrumbComponent } from './xg-breadcrumb.component';

addDecorator(withKnobs);

storiesOf('Components/XgBreadcrumbs', module)
    .add(
        'Default Usage',
        () => ({
            component: XgBreadcrumbComponent,
            moduleMetadata: {
                imports: [RouterModule.forRoot([{
                    component: XgBreadcrumbComponent,
                    path: 'iframe.html',
                }])],
                schemas: [],
                declarations: [],
                providers: [{ provide: APP_BASE_HREF, useValue: '' }]
            },
            props: {
                breadCrumbs: object("Breadcrumbs", [{ "label": "campaigns", "url": "", "disabled": false }, { "label": "proposals", url: "www.google.com" }, { "label": "proposal Detail", url: "www.google.com" }]),
                navigate: boolean("Navigate", true),
                onClick: ($event) => { console.log($event) }

            }
        }),
)