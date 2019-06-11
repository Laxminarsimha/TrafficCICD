import { NgModule, Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';

@Directive({
    selector: '[xgValidateTime][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: TimeValidator, multi: true }
    ]
})
export class TimeValidator implements Validator {
    private validator: ValidatorFn;
    public fulldayFormat: RegExp;
    public halfDayFormat: RegExp;
    @Input('xgValidationOptions') xgValidationOptions: any;

    constructor() {
        this.validator = this.validateTimeFormat();
        this.fulldayFormat = /^([0-1][0-9]|[2][0-3]):([0-5][0-9])$/;
        this.halfDayFormat = /(^([0-1][0-9]|[0-1][0-9]|[2][0-3]):([0-5][0-9])(\s{0,1})(AM|PM|am|pm|aM|Am|pM|Pm{2,2})$)|(^([0-9]|[1][0-9]|[2][0-3])(\s{0,1})(AM|PM|am|pm|aM|Am|pM|Pm{2,2})$)/;
    }
    validateTimeFormat(): ValidatorFn {
        return (oControl: AbstractControl) => {
            let value = oControl.value;
            let hasError: boolean = false;

            if (this.xgValidationOptions === true) {
                hasError = !this.fulldayFormat.test(value);
            } else {
                hasError = !this.halfDayFormat.test(value);
            }
            return (hasError && value) ? { invalid: { value: true } } : null;
        }
    }
    validate(c: FormControl) {
        return this.validator(c);
    }
}