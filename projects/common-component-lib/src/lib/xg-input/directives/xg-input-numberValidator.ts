import { NgModule, Directive, HostListener, Input } from '@angular/core';
@Directive({
    selector: '[xgValidateNumber]'
})
export class NumberValidator {
    @Input('xgnumerictype') xgNumerictype: string;
    @Input('precision') xgPrecision: number;
    @Input('inputValue') inputvalue: any;

    @HostListener('keydown', ['$event']) onKeyDown(event) {
        let e = <KeyboardEvent>event;
        if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
            (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
            (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
            (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
            (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
            (e.keyCode === 190 && (!e.shiftKey)) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        if (this.xgNumerictype === 'decimal') {
            let e = <KeyboardEvent>event;
            const periodIndex = event.target.value.indexOf(".");            
            
            if (periodIndex !== -1 && (e.keyCode === 190 && (!e.shiftKey))) {
                e.preventDefault();
            }

            //TODO: Implement Precision
            // if(decimalCount > this.xgPrecision ) {
            //     e.preventDefault();
            // }
            // const decimalCount =event.target.value.substring(event.target.value.lastIndexOf(".")).length                 

            if ([46, 8, 9, 27, 13, 110].indexOf(e.keyCode) !== -1 ||
                (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
                (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
                (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
                (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
                (e.keyCode === 190 && (!e.shiftKey)) ||
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
            }
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        }
    }
}
