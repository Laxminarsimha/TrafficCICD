import { xgGridModel } from '../../domain/grid-columns';
import { Validators } from '@angular/forms';

export class xgRegEx {
    regEx?: RegExp;
    mask?: string = '';
    validators: xgGridModel.Validator[];
    minLength?: number = 0;
    maxLength?: number = 100000;
}

export class xgControlPattern {
    // Use to enforce entry in a control
    static Required: xgRegEx = {
        validators: [
            {
                name: "required",
                validator: Validators.required,
                message: 'This field is required'
            }
        ]
    }
    //  Input minlength
    static MinLength(minLength: number): xgRegEx {
        return {
            validators: [
                {
                    name: 'minlength',
                    validator: Validators.minLength(minLength),
                    message: 'This field must be at least ' + minLength + ' characters in length.'
                }
            ],
            minLength: minLength
        };
    }
    // Input maxlength
    static MaxLength(maxLength: number): xgRegEx {
        return {
            validators: [
                {
                    name: 'maxlength',
                    validator: Validators.maxLength(maxLength),
                    message: 'This field cannot be longer than ' + maxLength + ' characters in length.'
                }
            ],
            maxLength: maxLength
        };
    }

    //  Email address
    static EmailAddress: xgRegEx = {
        regEx: new RegExp('^([a-zA-Z0-9._%+-])+@([a-zA-Z0-9._+-]{2,})+.([A-Za-z]{2,5})$'),
        validators: [
            {
                name: 'pattern',
                validator: Validators.pattern('^([a-zA-Z0-9._%+-])+@([a-zA-Z0-9._+-]{2,})+.([A-Za-z]{2,5})$'),
                message: 'Invalid Email Address!'
            }
        ]
    }
    // Telephonic number
    static PhoneNumber: xgRegEx = {
        regEx: new RegExp('^[\\(]{0,1}([0-9]){3}[\\)]{0,1}[ ]?([^0-1]){1}([0-9]){2}[ ]?[-]?[ ]?([0-9]){4}[ ]*((x){0,1}([0-9]){1,5}){0,1}$'),
        mask: '(000) 000-0000',
        validators: [
            {
                name: 'pattern',
                validator: Validators.pattern('^[\\(]{0,1}([0-9]){3}[\\)]{0,1}[ ]?([^0-1]){1}([0-9]){2}[ ]?[-]?[ ]?([0-9]){4}[ ]*((x){0,1}([0-9]){1,5}){0,1}$'),
                message: 'Invalid Telecom Number!'
            }
        ]
    }
}

