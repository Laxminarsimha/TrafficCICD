import { NgModule, Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';

@Directive({
    selector: '[xgValidateAlphaNumeric][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: AlphaNumericValidator, multi: true }
    ]
})
export class AlphaNumericValidator implements Validator {
    @Input('xgValidateAlphaNumeric') xgValidateAlphaNumeric: boolean;
    private validator: ValidatorFn;
    private alphaNumericRegex: RegExp;

    constructor() {
        this.alphaNumericRegex = /^[A-Za-z\d\s]*$/;
        this.validator = this.validateAlphaNumeric();
    }
    validateAlphaNumeric(): ValidatorFn {
        return (oControl: AbstractControl) => {
            const value = oControl.value;
            if (!value || !this.xgValidateAlphaNumeric) {
                return null;
            }
            let hasError = false;

            hasError = !this.alphaNumericRegex.test(value);

            return (hasError) ? { invalid: { value: true } } : null;
        }
    }

    validate(c: FormControl) {
        return this.validator(c);
    }

}
