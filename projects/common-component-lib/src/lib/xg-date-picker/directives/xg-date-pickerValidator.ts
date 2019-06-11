import { NgModule, Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';
import { XgDatePickerService } from '../xg-date-picker.service';

@Directive({
    selector: '[xgValidateDate][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: DateValidator, multi: true }
    ]
})
export class DateValidator implements Validator {
    private validator: ValidatorFn;
    @Input('xgMonthLabels') xgMonthLabels: any;
    @Input('xgValidationFormat') xgValidationFormat: any;
    constructor(private xgDatepickerService: XgDatePickerService) {
        this.validator = this.validateDate();
    }
    validateDate(): ValidatorFn {
        return (oControl: AbstractControl) => {
            const value = oControl.value;
            if (!value) {
                return null
            }
            let isValidDate = false;
            isValidDate = this.xgDatepickerService.validateDate(value, this.xgValidationFormat, this.xgMonthLabels);
            return !isValidDate ? { invalid: { value: true } } : null;
        }
    }

    validate(c: FormControl) {
        return this.validator(c);
    }

}