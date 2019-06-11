import { NgModule, Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';

@Directive({
    selector: '[xgValidatePhone][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: PhoneValidator, multi: true }
    ]
})
export class PhoneValidator implements Validator {
    private validator: ValidatorFn;
    private mobileRegex: RegExp;

    constructor() {
        this.mobileRegex = /^[\-0-9()]{13}$/;
        this.validator = this.validatePhone();
    }
    validatePhone(): ValidatorFn {
        return (oControl: AbstractControl) => {
            const value = oControl.value;
            let hasError = false;

            hasError = !this.mobileRegex.test(value);

            return (hasError && value) ? { invalid: { value: true } } : null;
        }
    }

    validate(c: FormControl) {
        return this.validator(c);
    }

}
// @NgModule({
//     imports: [],
//     exports: [PhoneValidator],
//     declarations: [PhoneValidator]
// })
// export class PhoneValidatorModule { }