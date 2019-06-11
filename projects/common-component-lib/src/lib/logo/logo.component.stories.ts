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
    withOptions,
} from '@storybook/addon-knobs';
import { linkTo } from '@storybook/addon-links';
import { withNotes } from '@storybook/addon-notes';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { LogoComponent} from './logo.component';
import { RouterTestingModule } from '@angular/router/testing';

const logoItems = [
    {
        linkTo: '/app/UserHome',
        logoPath: 'https://ok1static.oktacdn.com/bc/image/fileStoreRecord?id=fs016c0oh75N3xO2E0h8',
        // title: 'Domain title',
    },
];

storiesOf('Components/Logo Component', module)
    .addDecorator(withKnobs)
    .addDecorator(
        moduleMetadata({
            declarations: [LogoComponent],
            imports: [RouterTestingModule.withRoutes([
                { path: '**', component: LogoComponent },
            ])],
        })
    )
    .add('Logo', () => ({
        component: LogoComponent,
        props: {
            clicked: action('Event: click', 'clicked'),
            logo: object('Logo Item', logoItems[0]),
        }
    }));
