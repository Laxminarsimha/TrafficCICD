import { action } from '@storybook/addon-actions';
import {
    array,
    boolean,
    date,
    number,
    object,
    select,
    text,
    withKnobs,
    withOptions, } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { addDecorator, moduleMetadata,  storiesOf } from '@storybook/angular';
import { TopBarComponent } from '../top-bar/top-bar.component';
import { UserMenuComponent} from './user-menu.component';

storiesOf('Components/User Menu Component', module)
    .addDecorator(withKnobs)
    .addDecorator(
        moduleMetadata({
            declarations: [ TopBarComponent, UserMenuComponent ],
        })
    )
    .add('User Menu', () => ({
        component: UserMenuComponent,

        props: {
            clicked: action('Event: click', 'clicked'),

        },
        template: `
        <img-lib-top-bar>
             <img-lib-user-menu></img-lib-user-menu>
        </img-lib-top-bar>
        `,
    }));

