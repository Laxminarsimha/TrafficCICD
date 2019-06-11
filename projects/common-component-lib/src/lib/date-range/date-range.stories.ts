// import { storiesOf, moduleMetadata } from '@storybook/angular';
// import { withNotes } from '@storybook/addon-notes';
// import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';
// import {
//     boolean,
//     number,
//     date,
//     select,
//     text,
//     withKnobs,
//     withOptions
// } from '@storybook/addon-knobs';
// import * as marked from 'marked';
// import * as _moment from "moment";
// const moment = _moment;

// //  Import components needed by component being tested 
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { CalendarModule } from 'primeng/calendar';

// //  Import component being tested
// import { DateRangeComponent } from './date-range.component';
// import { MatFormFieldModule } from "@angular/material";
// import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { TextMaskModule } from "angular2-text-mask";
// import { NgModule } from "@angular/core";
// import { CommonModule } from "@angular/common";
// import { MatInputModule } from "@angular/material";
// import { ClickOutsideModule } from "ng4-click-outside";
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
// import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { PickListModule } from 'primeng/picklist';

// //  Import the readme markdown content for the story
// import * as readme from './README.md';

// function dateKnob(name, defaultValue) {
//     const stringTimestamp = date(name, defaultValue);
//     return new Date(stringTimestamp);
// }

// //  Create default min and maximum dates that are 5 days before and after today
// const defaultMinDate = new Date();
// defaultMinDate.setDate(defaultMinDate.getDate() - 5);
// const defaultMaxDate = new Date();
// defaultMaxDate.setDate(defaultMaxDate.getDate() + 5);

// storiesOf('Components/DateRangeComponent', module)
//     // .addDecorator(withKnobs)
//     // .addDecorator(withNotes({ text: marked(readme) }))
//     // .add('Default Usage', () => ({
//     //     component: DateRangeComponent,
//     //     moduleMetadata: {
//     //         imports: [ CalendarModule, BrowserAnimationsModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, TextMaskModule, FontAwesomeModule, NgbModule, PickListModule ],
//     //         schemas: [],
//     //         declarations: [],
//     //         providers: []
//     //     },
//     //     props: {
//     //         width: number('Width (pixels)', 530),
//     //         calendarOnTop: boolean('CalendarOnTop? [Opens Top?]', false)
//     //         ? true
//     //         : '',
//     //         showSwapCalendar: boolean('ShowSwapCalendar', false)
//     //             ? true
//     //             : '',
//     //         minDate: boolean('Enable Min Date', false)
//     //             ? _moment().format('L')
//     //             : '',
//     //         maxDate: boolean('Enable Max Date', false)
//     //             ? dateKnob('Maximum Date', defaultMaxDate)
//     //             : ''
//     //     }
//     // }));
