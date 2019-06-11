import { action } from '@storybook/addon-actions';
import {
    boolean,
    number,
    text,
    withKnobs,
    object
} from '@storybook/addon-knobs';
import { AlphaNumericValidator } from './directives/xg-input-alphanumericValidator';
import { withNotes } from '@storybook/addon-notes';
import { addDecorator, storiesOf } from '@storybook/angular';

//  Import components needed by component being tested
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordValidator } from './directives/xg-input-passwordValidator';
import { NumberValidator } from './directives/xg-input-numberValidator';
import { MinMaxValidator } from './directives/xg-input-minMaxValidator';
import { PhoneValidator } from './directives/xg-input-phoneValidator';
import { TextMaskModule } from 'angular2-text-mask';
import * as xgNotes from './README.md';

//  Import component being tested
import { XgInputComponent } from './xg-input.component';


addDecorator(withKnobs);

storiesOf('Components/XgInputComponent', module)
    .add(
        'Default Usage',
        () => ({
            component: XgInputComponent,
            moduleMetadata: {
                imports: [InputTextModule, BrowserAnimationsModule, TextMaskModule],
                schemas: [],
                declarations: [PasswordValidator, NumberValidator, PhoneValidator,AlphaNumericValidator,MinMaxValidator],
                providers: []
            },
            props: {
                placeholder: text('Placeholder', 'Placeholder'),
                disabled: boolean('Disabled', false),
                labelName: text("Label", "Label"),
                required: boolean('Required', false),
                type: text('Input Type', 'text'),
                validateOn: text('Validate On', 'change'),
                minlength: number("Minlength", 3),
                alphaNumeric: boolean("Alpha Numeric", false),
                onValueChange: ($event) => { console.log($event) },
                onBlur: ($event) => { console.log($event) },
                onFocus: ($event) => { console.log($event) }

            }
        }),
        {
            notes: { markdown: xgNotes }
        }
    )
    .add(
        'Input Type Email',
        () => ({
            component: XgInputComponent,
            moduleMetadata: {
                imports: [InputTextModule, BrowserAnimationsModule, TextMaskModule],
                schemas: [],
                declarations: [PasswordValidator, NumberValidator, PhoneValidator,AlphaNumericValidator,MinMaxValidator],
                providers: []
            },
            props: {
                placeholder: text('Placeholder', 'Placeholder'),
                disabled: boolean('Disabled', false),
                labelName: text("Label", "Email"),
                required: boolean('Required', false),
                type: text('Input Type', 'email'),
                validateOn: text('Validate On', 'change'),
                onValueChange: ($event) => { console.log($event) },
                onBlur: ($event) => { console.log($event) },
                onFocus: ($event) => { console.log($event) }

            }
        }),
        {
            notes: { markdown: xgNotes }
        }
    )
    .add(
        'Input Type Password',
        () => ({
            component: XgInputComponent,
            moduleMetadata: {
                imports: [InputTextModule, BrowserAnimationsModule, TextMaskModule],
                schemas: [],
                declarations: [PasswordValidator, NumberValidator, PhoneValidator,AlphaNumericValidator,MinMaxValidator],
                providers: []
            },
            props: {
                placeholder: text('Placeholder', 'Placeholder'),
                disabled: boolean('Disabled', false),
                labelName: text("Label", "Password"),
                required: boolean('Required', false),
                type: text('Input Type', 'password'),
                validateOn: text('Validate On', 'change'),
                validatePassword: boolean('Validate Password', false),
                passwordvalidationOptions: object('Password Validation Options', {
                    'checkNumber': true,
                    'checkCapitalLetter': true,
                    'checkSmallLetter': false,
                    'checkMinlength': false,
                    'checkSymbol': false,
                    'minlength': 8
                }),
                onValueChange: ($event) => { console.log($event) },
                onBlur: ($event) => { console.log($event) },
                onFocus: ($event) => { console.log($event) }


            }
        }),
        {
            notes: { markdown: xgNotes }
        }
    )
    .add(
        'Input Type ZipCode',
        () => ({
            component: XgInputComponent,
            moduleMetadata: {
                imports: [InputTextModule, BrowserAnimationsModule, TextMaskModule],
                schemas: [],
                declarations: [PasswordValidator, NumberValidator, PhoneValidator,AlphaNumericValidator,MinMaxValidator],
                providers: []
            },
            props: {
                placeholder: text('Placeholder', '00000'),
                disabled: boolean('Disabled', false),
                labelName: text("Label", "Zip"),
                required: boolean('Required', false),
                type: text('Input Type', 'zip'),
                validateOn: text('Validate On', 'change'),
                onValueChange: ($event) => { console.log($event) },
                onBlur: ($event) => { console.log($event) },
                onFocus: ($event) => { console.log($event) }
            }
        }),
        {
            notes: { markdown: xgNotes }
        }
    )
    .add(
        'Input Type Phone',
        () => ({
            component: XgInputComponent,
            moduleMetadata: {
                imports: [InputTextModule, BrowserAnimationsModule, TextMaskModule],
                schemas: [],
                declarations: [PasswordValidator, NumberValidator, PhoneValidator,AlphaNumericValidator,MinMaxValidator],
                providers: []
            },
            props: {
                placeholder: text('Placeholder', '(000)000-0000'),
                disabled: boolean('Disabled', false),
                labelName: text("Label", "Phone"),
                required: boolean('Required', false),
                type: text('Input Type', 'phone'),
                validateOn: text('Validate On', 'change'),
                onValueChange: ($event) => { console.log($event) },
                onBlur: ($event) => { console.log($event) },
                onFocus: ($event) => { console.log($event) }
            }
        }),
        {
            notes: { markdown: xgNotes }
        }
    )
    .add(
        'Input Type Number',
        () => ({
            component: XgInputComponent,
            moduleMetadata: {
                imports: [InputTextModule, BrowserAnimationsModule, TextMaskModule],
                schemas: [],
                declarations: [PasswordValidator, NumberValidator, PhoneValidator,AlphaNumericValidator,MinMaxValidator],
                providers: []
            },
            props: {
                placeholder: text('Placeholder', '0'),
                disabled: boolean('Disabled', false),
                labelName: text("Label", "Number"),
                required: boolean('Required', false),
                type: text('Input Type', 'number'),
                validateOn: text('Validate On', 'change'),
                minlength: number("Minimum length", 3),
                maxlength: number("Maximum length", 10),
                min: number("Min", 0),
                max: number("Max", 100),
                onValueChange: ($event) => { console.log($event) },
                onBlur: ($event) => { console.log($event) },
                onFocus: ($event) => { console.log($event) }
            }
        }),
        {
            notes: { markdown: xgNotes }
        }
    )
    .add(
        'Input Type Decimal',
        () => ({
            component: XgInputComponent,
            moduleMetadata: {
                imports: [InputTextModule, BrowserAnimationsModule, TextMaskModule],
                schemas: [],
                declarations: [PasswordValidator, NumberValidator, PhoneValidator,AlphaNumericValidator,MinMaxValidator],
                providers: []
            },
            props: {
                placeholder: text('Placeholder', '0'),
                disabled: boolean('Disabled', false),
                labelName: text("Label", "Number"),
                required: boolean('Required', false),
                type: text('Input Type', 'decimal'),
                precision:number("Precision",2),
                validateOn: text('Validate On', 'change'),
                minlength: number("Minimum length", 3),
                maxlength: number("Maximum length", 10),
                min: number("Min", 0),
                max: number("Max", 100),
                onValueChange: ($event) => { console.log($event) },
                onBlur: ($event) => { console.log($event) },
                onFocus: ($event) => { console.log($event) }
            }
        }),
        {
            notes: { markdown: xgNotes }
        }
    )
    
