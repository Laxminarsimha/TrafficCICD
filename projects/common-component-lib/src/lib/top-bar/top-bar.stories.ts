import { APP_BASE_HREF } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {
    withKnobs,
    number,
    boolean,
    color,
    object,
} from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { storiesOf, moduleMetadata } from '@storybook/angular';
import { TopBarNavigationComponent } from '../top-bar-navigation/top-bar-navigation.component';
import { LogoComponent} from '../logo/logo.component';
import { NavigationService } from '../services/navigation/navigation.service';
import { NAVIGATIONLIST } from '../services/navigation/navigationList.mock';
import { TopBarComponent} from './top-bar.component';

const logoItems = [
    {
        linkTo: 'https://imaginecommunications.okta.com/app/UserHome',
        logoPath: 'http://imaginecommunications-academy.com/ic-images/ImagineCommunications_whitelogo.png',
        title: 'Domain title',
        target: '_blank',
    },
    {
        linkTo: 'https://imaginecommunications.samanage.com/welcome.portal',
        logoPath: 'https://static1.squarespace.com/static/5923677f725e25e4bf294bf0/594443c1c534a59017b31211/5956cd7286e6c0d71f4c7592/1498860917735/hbo.png',
        title: 'Tenant title',
    },
];

// Setup Routes
const appRoutes: Routes = NAVIGATIONLIST.map(el => {
    return {
        path: el.url,
        component: TopBarComponent,
        data: {
            navigationItemId: el.id
        }
    };
});

appRoutes.push({
    path: '**',
    component: TopBarComponent,
});

storiesOf('Components/Top Bar Component', module)
    .addDecorator(withNotes({ text: 'Some notes' }))
    .addDecorator(
        moduleMetadata({
            declarations: [
                TopBarComponent,
                LogoComponent,
                TopBarNavigationComponent,
            ],
            imports: [RouterModule.forRoot(appRoutes)],
            providers: [
                { provide: APP_BASE_HREF, useValue: '' },
                NavigationService
            ]
        })
    )
    .addDecorator(withKnobs)
    .add('Default Usage', () => ({
        component: TopBarComponent,
        props: {
            styles: object('styles', { background: '#2079ca', height: '45px' }),
            logoItems: logoItems,
        },
        template: `
        <img-lib-top-bar [styles]="styles">
             <img-lib-logo [logo]="logoItems[0]"></img-lib-logo>
             <img-lib-logo [logo]="logoItems[1]"></img-lib-logo>
             <img-lib-top-bar-navigation></img-lib-top-bar-navigation>
        </img-lib-top-bar>
        `,
    }));
