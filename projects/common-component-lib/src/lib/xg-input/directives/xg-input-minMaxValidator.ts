import { NgModule, Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';

@Directive({
    selector: '[xgValidateMinMax][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: MinMaxValidator, multi: true }
    ]
})
export class MinMaxValidator implements Validator {
    @Input('min') xgMin: number;
    @Input('max') xgMax: number;
    private validator: ValidatorFn;

    constructor() {
        this.validator = this.validateMinMax();
    }
    validateMinMax(): ValidatorFn {
        return (oControl: AbstractControl) => {
            const value = oControl.value;
            if (!value || (!this.xgMin && !this.xgMax)) {
                return null;
            }

            if (this.xgMin && this.xgMax) {
                return (value >= this.xgMin && value <= this.xgMax) ? null : { "minMax": true };

            } else if (this.xgMax && !this.xgMin) {
                return (value > this.xgMax) ? { "max": true } : null;
            }
            else {
                return (value < this.xgMin) ? { "min": true } : null;
            }
        }
    }

    validate(c: FormControl) {
        return this.validator(c);
    }

}
