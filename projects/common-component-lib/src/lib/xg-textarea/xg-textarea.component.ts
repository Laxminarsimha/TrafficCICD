import {
    Component,
    OnInit,
    Input,
    forwardRef,
    Output,
    EventEmitter,
    NgModule,
    ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { XgObjectUtils } from '../shared/utilities';
// import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    FormControl,
    FormBuilder,
    FormGroup,
    Validators,
    ControlValueAccessor,
    NG_VALUE_ACCESSOR,
    NG_VALIDATORS
} from '@angular/forms';
@Component({
    selector: 'xg-textarea',
    templateUrl: './xg-textarea.component.html',
    styleUrls: ['./xg-textarea.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => XgTextareaComponent),
            multi: true
        }
    ]
})
export class XgTextareaComponent implements OnInit, ControlValueAccessor {
    private bDisabled: boolean;
    private sInputValue: string;
    private bRequired: boolean;
    private sPlaceholder: string;
    private sLabelName: string;
    private sValidateOn: string;
    private sMinimumLength: number;
    private sMaximumLength: number;

    private rowsLength: number;
    private colsLength: number;
    public fullWidth: boolean;
    private customMessage: any[];
    private onChangeInput: (_: any) => void = () => { };
    private onTouchedInput: () => void = () => { };
    private aValidationUpdateValues = ['change', 'blur', 'submit'];

    @Output('onValueChange') onValueChange = new EventEmitter<any>();
    @Output('onBlur') onBlur = new EventEmitter<any>();
    @Output('onFocus') onFocus = new EventEmitter<any>();
    actualData: any;
    constructor() {
        this.bDisabled = false;
        this.sInputValue = '';
        this.bRequired = false;
        this.sPlaceholder = '';
        this.sValidateOn = 'change';
        this.sMinimumLength = 0;
        this.sMaximumLength = 0;
        this.colsLength = 0;
        this.rowsLength = 0;
        this.fullWidth = true;
        this.customMessage = [];
        this.sLabelName = "";
    }

    ngOnInit() { }

    onFocusOut($event) {
        if (this.onBlur.observers && this.onBlur.observers.length) {
            this.onBlur.emit($event);
        }
        this.onTouchedInput();
    }
    onFocusIn($event) {
        if (this.onFocus.observers && this.onFocus.observers.length) {
            this.onFocus.emit($event);
        }
    }
    writeValue(sValue: any) {
        this.sInputValue = sValue || '';
        this.inputModelValue = this.sInputValue;
    }
    registerOnChange(fn: (_: any) => void): void {
        this.onChangeInput = fn;
    }
    registerOnTouched(fn: () => void): void {
        this.onTouchedInput = fn;
    }
    get inputModelValue(): any {
        return this.sInputValue;
    }
    set inputModelValue(sValue: any) {
        if (sValue !== this.sInputValue) {
            this.sInputValue = sValue;
            this.onChangeInput(sValue);
        }
        if (
            this.onValueChange.observers &&
            this.onValueChange.observers.length
        ) {
            this.onValueChange.emit(sValue);
        }
    }
    @Input()
    get labelName() {
        return this.sLabelName;
    }
    set labelName(value: string) {
        this.sLabelName = value || '';
    }
    @Input()
    get placeholder() {
        return this.sPlaceholder;
    }
    set placeholder(value: string) {
        this.sPlaceholder = value || '';
    }
    @Input()
    get disabled() {
        return this.bDisabled;
    }
    set disabled(value: boolean) {
        this.bDisabled = XgObjectUtils.coerceBooleanProperty(value);
    }
    @Input()
    get required() {
        return this.bRequired;
    }
    set required(value: boolean) {
        this.bRequired = XgObjectUtils.coerceBooleanProperty(value);
    }
    @Input()
    get validateOn() {
        return this.sValidateOn;
    }
    set validateOn(value: any) {
        this.sValidateOn =
            this.aValidationUpdateValues.indexOf(value) != -1
                ? value
                : 'change';
    }
    @Input()
    get minlength() {
        return this.sMinimumLength;
    }
    set minlength(value: number) {
        this.sMinimumLength = value;
    }
    @Input()
    get maxlength() {
        return this.sMaximumLength;
    }
    set maxlength(value: number) {
        this.sMaximumLength = value;
    }
    @Input()
    get rows() {
        return this.rowsLength;
    }
    set rows(value) {
        this.rowsLength = value;
    }
    @Input()
    get cols() {
        return this.colsLength;
    }
    set cols(value) {
        this.colsLength = value || 0;
    }

    @Input()
    get errorMessages() {
        return this.customMessage;
    }
    set errorMessages(value: any) {
        let actualData = value;
        setInterval(() => {
            actualData.forEach(element => {
                if (element.hasOwnProperty("errorRequired")) {
                    if (element.errorRequired.msg == '') {
                        element.errorRequired.msg = this.sLabelName + " is Required";
                    }
                } else if (element.hasOwnProperty("errorMinlength")) {
                    if (element.errorMinlength.msg == '') {
                        element.errorMinlength.msg = this.sLabelName + " should contain Minimum" + this.sMinimumLength + " Characters";
                    }
                }
            })
        }, 1000);
        value = actualData;
        this.customMessage = value || '';
    }
}
@NgModule({
    imports: [CommonModule, SharedModule],
    exports: [XgTextareaComponent],
    declarations: [XgTextareaComponent],
    providers: []
})
export class XgTextareaComponentModule { }
