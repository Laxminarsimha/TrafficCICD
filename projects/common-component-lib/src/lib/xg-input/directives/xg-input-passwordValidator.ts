import { NgModule, Directive, forwardRef, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, ValidatorFn, Validator, FormControl } from '@angular/forms';

@Directive({
    selector: '[xgValidatePassword][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: PasswordValidator, multi: true }
    ]
})
export class PasswordValidator implements Validator {
    private validator: ValidatorFn;
    @Input('xgValidatePassword') xgValidatePassword: any;
    @Input('xgValidationOptions') xgValidationOptions: any;

    constructor() {
        this.validator = this.validatePassword();
    }
    validatePassword(): ValidatorFn {
        return (oControl: AbstractControl) => {
            if (!this.xgValidatePassword) {
                return null;
            }
            else {
                const value = oControl.value;
                let hasNumber = false || !(this.xgValidationOptions.checkNumber);
                let hasCapital = false || !(this.xgValidationOptions.checkCapitalLetter);
                let hasSmall = false || !(this.xgValidationOptions.checkSmallLetter);
                let hasMinLength = false || !(this.xgValidationOptions.checkMinlength);
                let hasSymbol = false || !(this.xgValidationOptions.checkSymbol);

                const hasNumberRegEx = /\d/g;
                const hasSmallLetterRegEx = /[a-z]/g;
                const hasCapitalLetterRegEx = /[A-Z]/g;
                const hasSymbolRegEx = /[!@#${^}%&*)([\-\]~+/.,*$]/g;

                if (value) {
                    // Has atleast one number
                    if (hasNumberRegEx.test(value)) {
                        hasNumber = true;
                    }
                    // Has atleast one small Letter
                    if (hasSmallLetterRegEx.test(value)) {
                        hasSmall = true;
                    }
                    // Has atleast one Capital Letter
                    if (hasCapitalLetterRegEx.test(value)) {
                        hasCapital = true;
                    }

                    // Has atleast one Small Letter
                    if (value.length >= (this.xgValidationOptions.minlength || 8)) {
                        hasMinLength = true;
                    }

                    if (hasSymbolRegEx.test(value)) {
                        hasSymbol = true;
                    }
                    const splCharString = value.replace(hasSymbolRegEx, '').replace(hasNumberRegEx, '')
                        .replace(hasCapitalLetterRegEx, '').replace(hasSmallLetterRegEx, '');
                    if (splCharString !== '' && !hasSymbolRegEx.test(splCharString)) {
                        hasSymbol = false;
                    }
                }
                if (hasNumber && hasCapital && hasSmall && hasMinLength && hasSymbol) {
                    return null;
                }


                // Has atleast one special Character
                return { 'hasNumber': hasNumber, 'hasCapital': hasCapital, 'hasSmall': hasSmall, 'hasMinLength': hasMinLength, 'hasSymbol': hasSymbol };
            }
        }
    }

    validate(c: FormControl) {
        return this.validator(c);
    }

}
// @NgModule({
//     imports: [],
//     exports: [PasswordValidator],
//     declarations: [PasswordValidator]
// })
// export class PasswordValidatorModule { }