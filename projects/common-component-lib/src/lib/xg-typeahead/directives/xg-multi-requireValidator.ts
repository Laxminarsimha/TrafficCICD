import { Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';

@Directive({
    selector: '[xgMultiRequired][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: MultiRequiredValidator, multi: true }
    ]
})
export class MultiRequiredValidator implements Validator {
    @Input('xgMultiRequired') xgMultiRequired: any;
    private validator: ValidatorFn;
    constructor() {
        this.validator = this.validateRequire();
    }
    validateRequire(): ValidatorFn {
        return (oControl: AbstractControl) => {
            const value = oControl.value;
            const hasError = this.xgMultiRequired || false;
            return (hasError && !value) ? { invalid: { value: true } } : null;
        }
    }

    validate(c: FormControl) {
        return this.validator(c);
    }

}