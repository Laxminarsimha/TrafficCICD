// import { action } from '@storybook/addon-actions';
// import {
//     boolean,
//     date,
//     number,
//     select,
//     withKnobs
// } from '@storybook/addon-knobs';
// import { withNotes } from '@storybook/addon-notes';
// import { addDecorator, storiesOf } from '@storybook/angular';

// //  Import components needed by component being tested
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CalendarModule } from 'primeng/calendar';

// //  Import component being tested
// import { BroadcastCalendarComponent } from './broadcast-calendar.component';

// //  Import the readme markdown content for the story
// import * as readme1 from './README.md';
// import * as readme2 from './README2.md';

// function dateKnob(name, defaultValue) {
//     const stringTimestamp = date(name, defaultValue);
//     return new Date(stringTimestamp);
// }

// // //  Create default min and maximum dates that are 5 days before and after today
// const defaultMinDate = new Date();
// defaultMinDate.setDate(defaultMinDate.getDate() - 5);
// const defaultMaxDate = new Date();
// defaultMaxDate.setDate(defaultMaxDate.getDate() + 5);

// addDecorator(withKnobs);
// addDecorator(withNotes);

// storiesOf('Components/BroadcastCalendarComponent', module)
//     // .add(
//     //     'Default Usage',
//     //     () => ({
//     //         component: BroadcastCalendarComponent,
//     //         moduleMetadata: {
//     //             imports: [CalendarModule, BrowserAnimationsModule],
//     //             schemas: [],
//     //             declarations: [],
//     //             providers: []
//     //         },
//     //         props: {
//     //             width: number('Width (pixels)', 200),
//     //             locale: select('Locale', {
//     //                 'English (en)': 'en',
//     //                 'Spanish (es)': 'es'
//     //             }),
//     //             minDate: boolean('Enable Min Date', false)
//     //                 ? dateKnob('Minimum Date', defaultMinDate)
//     //                 : '',
//     //             maxDate: boolean('Enable Max Date', false)
//     //                 ? dateKnob('Maximum Date', defaultMaxDate)
//     //                 : ''
//     //         }
//     //     }),
//     //     {
//     //         notes: { markdown: readme1 }
//     //     }
//     // )
//     // .add(
//     //     'Another Usage',
//     //     () => ({
//     //         component: BroadcastCalendarComponent,
//     //         moduleMetadata: {
//     //             imports: [CalendarModule, BrowserAnimationsModule],
//     //             schemas: [],
//     //             declarations: [],
//     //             providers: []
//     //         },
//     //         props: {
//     //             width: number('Width (pixels)', 200),
//     //             locale: select('Locale', {
//     //                 'English (en)': 'en',
//     //                 'Spanish (es)': 'es'
//     //             }),
//     //             minDate: boolean('Enable Min Date', false)
//     //                 ? dateKnob('Minimum Date', defaultMinDate)
//     //                 : '',
//     //             maxDate: boolean('Enable Max Date', false)
//     //                 ? dateKnob('Maximum Date', defaultMaxDate)
//     //                 : ''
//     //         }
//     //     }),
//     //     {
//     //         notes: { markdown: readme2 }
//     //     }
//     // );
