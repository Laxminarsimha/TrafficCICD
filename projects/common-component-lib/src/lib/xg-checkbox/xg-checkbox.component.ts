import { NgModule, Component, OnInit, Input, forwardRef, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
// import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { XgObjectUtils } from '../shared/utilities';

@Component({
  selector: 'xg-checkbox',
  templateUrl: './xg-checkbox.component.html',
  styleUrls: ['./xg-checkbox.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => XgCheckboxComponent), multi: true },
  ]
})
export class XgCheckboxComponent implements OnInit, ControlValueAccessor {

  private isDisabled: boolean;
  private isReadOnly: boolean;
  private checkboxValue: boolean;
  private cLabelName: string;
  public isLabelLeft: boolean;
  private isRequired: boolean;
  private cbCssClass: string;
  private lbCssClass: string;
  private cbBinary: boolean;
  private sLayout: string;

  private onChangeCheckbox: (_: any) => void = () => { };
  private onTouchedCheckbox: () => void = () => { };
  @Output('onValueChange') onValueChange = new EventEmitter<any>();
  @ViewChild('inputElement') inputElement: ElementRef;

  get checkboxModelValue(): any {
    return this.checkboxValue;
  };

  set checkboxModelValue(sValue: any) {
    const emittedValue = this.binary ? sValue ? 1 : 0 : sValue;
    if (sValue !== this.checkboxValue) {
      this.checkboxValue = sValue;
      this.onChangeCheckbox(emittedValue);
    }
    if (this.onValueChange.observers && this.onValueChange.observers.length) {
      this.onValueChange.emit(emittedValue);
    }
  }

  @Input()
  get disabled() {
    return this.isDisabled;
  }
  set disabled(value) {
    this.isDisabled = XgObjectUtils.coerceBooleanProperty(value);
  }

  @Input()
  get readOnly() {
    return this.isReadOnly;
  }
  set readOnly(value) {
    this.isReadOnly = XgObjectUtils.coerceBooleanProperty(value);
  }

  @Input()
  get labelName() {
    return this.cLabelName
  }
  set labelName(value) {
    this.cLabelName = value || '';
  }
  @Input()
  get layout() {
    return this.sLayout
  }
  set layout(value) {
    this.sLayout = value || 'vertical'
  }

  @Input()
  get labelLeft() {
    return this.isLabelLeft;
  }
  set labelLeft(value) {
    this.isLabelLeft = XgObjectUtils.coerceBooleanProperty(value);
  }

  @Input()
  get required() {
    return this.isRequired;
  }
  set required(value) {
    this.isRequired = XgObjectUtils.coerceBooleanProperty(value);
  }

  @Input()
  get cbStyleClass() {
    return this.cbCssClass;
  };
  set cbStyleClass(value) {
    this.cbCssClass = value || '';
  }

  @Input()
  get lbStyleClass() {
    return this.lbCssClass;
  };
  set lbStyleClass(value) {
    this.lbCssClass = value || '';
  }

  @Input()
  get binary() {
    return this.cbBinary;
  };
  set binary(value) {
    this.cbBinary = XgObjectUtils.coerceBooleanProperty(value);
  }

  constructor() {
    this.isDisabled = false;
    this.isReadOnly = false;
    this.cLabelName = '';
    this.checkboxValue = false;
    this.isLabelLeft = false;
    this.isRequired = false;
    this.cbCssClass = '';
    this.lbCssClass = '';
    this.binary = false;
    this.sLayout = 'vertical';
  }

  ngOnInit() {
  }

  writeValue(sValue) {
    this.checkboxValue = !!sValue || false;
    this.checkboxModelValue = this.checkboxValue;
  }
  toggleModel($event) {
    this.inputElement.nativeElement.click();
    // this.checkboxModelValue = !this.checkboxModelValue;
    $event.stopPropagation()
  }
  registerOnChange(fn: (_: any) => void): void { this.onChangeCheckbox = fn; }
  registerOnTouched(fn: () => void): void { this.onTouchedCheckbox = fn; }

}
@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [XgCheckboxComponent, SharedModule],
  declarations: [XgCheckboxComponent,],
  providers: []
})
export class XgCheckboxComponentModule { }