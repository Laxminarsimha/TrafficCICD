import { NgModule, Component, OnInit, Input, forwardRef, Output, EventEmitter, ViewChild } from '@angular/core';
// import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Constants } from './xg-input-constants';
import { PasswordValidator } from './directives/xg-input-passwordValidator';
import { NumberValidator } from './directives/xg-input-numberValidator';
import { PhoneValidator } from './directives/xg-input-phoneValidator';
import { AlphaNumericValidator } from './directives/xg-input-alphanumericValidator';
import { MinMaxValidator } from './directives/xg-input-minMaxValidator';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { XgObjectUtils } from '../shared/utilities';

@Component({
  selector: 'xg-input',
  templateUrl: './xg-input.component.html',
  styleUrls: ['./xg-input.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => XgInputComponent), multi: true }]
})
export class XgInputComponent implements OnInit, ControlValueAccessor {
  private bDisabled: boolean;
  private sInputValue: string;
  private bRequired: boolean;
  private sPlaceholder: string;
  public oZipMask: any;
  public oPhoneMask: any;
  private sInputType: string;
  private sLabelName: string;
  private bValidatePassword: boolean;
  private sValidateOn: string;
  private xgInputConstants: Constants;
  private sMinimumLength: number;
  private sMaximumLength: number;
  private oOptions: any;
  private bAlphaNumeric: boolean;
  private sMin: number;  
  private sMax: number;
  private sPrecision:number;
  private onChangeInput: (_: any) => void = () => { };
  private onTouchedInput: () => void = () => { };
  @Output('onValueChange') onValueChange = new EventEmitter<any>();
  @Output('onBlur') onBlur = new EventEmitter<any>();
  @Output('onFocus') onFocus = new EventEmitter<any>();

  get inputModelValue(): any {
    return this.sInputValue;
  };
  set inputModelValue(sValue: any) {
    if (sValue !== this.sInputValue) {
      this.sInputValue = sValue;
      this.onChangeInput(sValue);
    }
    if (this.onValueChange.observers && this.onValueChange.observers.length) {
      this.onValueChange.emit(sValue);
    }
  }
  @Input()
  get type() {
    return this.sInputType;
  }
  set type(value) {
    this.sInputType = value || 'text';
  }
  @Input()
  get alphaNumeric() {
    return this.bAlphaNumeric;
  }
  set alphaNumeric(value) {
    this.bAlphaNumeric = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get labelName() {
    return this.sLabelName
  }
  set labelName(value) {
    this.sLabelName = value || '';
  }
  @Input()
  get placeholder() {
    return this.sPlaceholder;
  };
  set placeholder(value) {
    this.sPlaceholder = value || '';
  }
  @Input()
  get disabled() {
    return this.bDisabled;
  }
  set disabled(value) {
    this.bDisabled = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get required() {
    return this.bRequired;
  }
  set required(value) {
    this.bRequired = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get validateOn() {
    return this.sValidateOn
  }
  set validateOn(value) {
    this.sValidateOn = this.xgInputConstants.constants.formValidationValues.indexOf(value) !== -1 ? value : 'change'
  }
  @Input()
  get minlength() {
    return this.sMinimumLength;
  }
  set minlength(value) {
    this.sMinimumLength = value;
  }
  @Input()
  get maxlength() {
    return this.sMaximumLength;
  }
  set maxlength(value) {
    this.sMaximumLength = value;
  }
  @Input()
  get min() {
    return this.sMin;
  }
  set min(value) {
    this.sMin = value || null
  }
  @Input()
  get max() {
    return this.sMax;
  }
  set max(value) {
    this.sMax = value || null
  }
  @Input()
  get validatePassword() {
    return this.bValidatePassword;
  }
  set validatePassword(value) {
    this.bValidatePassword = XgObjectUtils.coerceBooleanProperty(value);
  }
  /*  passwordValidation Inputs*/
  @Input()
  get passwordvalidationOptions() {
    return this.oOptions;
  }
  set passwordvalidationOptions(value) {
    if (Object.prototype.toString.call(value).indexOf('Object') !== -1) {
      const mergedOptions = { ...this.xgInputConstants.constants.passwordValidationOptions, ...value }
      this.oOptions = mergedOptions
    }
    else {
      this.oOptions = this.xgInputConstants.constants.passwordValidationOptions
    }
  }

  @Input()
  get precision() {
    return this.sPrecision;
  }
  set precision(value) {
    this.sPrecision = value || 0
  }
  constructor() {
    this.bDisabled = false;
    this.sInputValue = '';
    this.bRequired = false;
    this.sPlaceholder = '';
    this.sInputType = 'text';
    this.bValidatePassword = false;
    this.sValidateOn = 'change';
    this.bAlphaNumeric = false;
    this.sMinimumLength = 0;
    this.xgInputConstants = new Constants();
    this.oZipMask = { mask: this.xgInputConstants.constants.inputMasks.zipMask, guide: false };
    this.oPhoneMask = { mask: this.xgInputConstants.constants.inputMasks.phoneMask, guide: false };
    this.oOptions = this.xgInputConstants.constants.passwordValidationOptions;
    this.sMin = 0;
    this.sMax = 0;
  }

  ngOnInit() {
  }
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
  writeValue(sValue) {
    this.sInputValue = sValue || '';
    this.inputModelValue = this.sInputValue;
  }
  registerOnChange(fn: (_: any) => void): void { this.onChangeInput = fn; }
  registerOnTouched(fn: () => void): void { this.onTouchedInput = fn; }

}
@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [XgInputComponent, PasswordValidator, NumberValidator, PhoneValidator, SharedModule, AlphaNumericValidator, MinMaxValidator],
  declarations: [XgInputComponent, PasswordValidator, NumberValidator, PhoneValidator, AlphaNumericValidator, MinMaxValidator],
  providers: []
})
export class XgInputComponentModule { }