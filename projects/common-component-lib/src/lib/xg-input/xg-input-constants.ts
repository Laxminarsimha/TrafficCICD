export class Constants {
    public constants: any;
    constructor() {
        const aValidationUpdateValues = ['change', 'blur', 'submit'];
        const oMasks = {
            phoneMask: ['(', /[0-9]/, /[0-9]/, /[0-9]/, ')', /[0-9]/, /[0-9]/, /[0-9]/, '-', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/],
            zipMask: [/[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]
        };
        const oPasswordValidationOptions = {
            'checkNumber': false,
            'checkCapitalLetter': false,
            'checkSmallLetter': false,
            'checkMinlength': false,
            'checkSymbol': false,
            'minlength': 8
        }
        this.constants = {
            formValidationValues: aValidationUpdateValues,
            inputMasks: oMasks,
            passwordValidationOptions: oPasswordValidationOptions
        };
        Object.freeze(this.constants);
    }
}