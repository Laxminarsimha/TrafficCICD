export class Constants {
    public constants: any;
    constructor() {
        const oTimeValidation = ['change', 'blur', 'submit'];
        
        this.constants = {
            timevalidationOptions: oTimeValidation
        };
        Object.freeze(this.constants);
    }
}