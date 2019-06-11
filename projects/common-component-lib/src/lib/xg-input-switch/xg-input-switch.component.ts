import { NgModule, Component, OnInit, Input, Output, EventEmitter, ViewChild, forwardRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FormControl, FormBuilder, FormGroup, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { InputSwitchModule } from 'primeng/inputswitch';
@Component({
  selector: 'xg-input-switch',
  templateUrl: './xg-input-switch.component.html',
  styleUrls: ['./xg-input-switch.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => XgInputSwitchComponent), multi: true },
  ]
})
export class XgInputSwitchComponent implements OnInit, ControlValueAccessor {

  private isLabelName: string;
  public fullWidth: boolean;
  private isDisabled: boolean;
  private isReadOnly: boolean;
  private isChecked: boolean;
  private customMessage: string;

  private onChangeInputSwitch: (_: any) => void = () => { };
  private onTouchedInputSwitch: () => void = () => { };

  @Output('onValueChange') onValueChange = new EventEmitter<any>();

  constructor() {
    this.isLabelName = '';
    this.fullWidth = true;
    this.isDisabled = false;
    this.isReadOnly = false;
    this.isChecked = false;
    this.customMessage = "";
  }

  ngOnInit() {

  }

  onChange(e: Event) {
    if (this.onValueChange.observers && this.onValueChange.observers.length) {
      this.onValueChange.emit(this.isChecked);
    }
  }
  writeValue(sValue: boolean) {
    this.isChecked = sValue || false;
  }


  registerOnChange(fn: (_: any) => void): void { this.onChangeInputSwitch = fn; }
  registerOnTouched(fn: () => void): void { this.onTouchedInputSwitch = fn; }

  @Input()
  get label() {
    return this.isLabelName;
  }
  set label(value: any) {
    this.isLabelName = value || '';
  }

  @Input()
  get disabled() {
    return this.isDisabled;
  }
  set disabled(value: boolean) {
    this.isDisabled = coerceBooleanProperty(value);
  }

  @Input()
  get readonly() {
    return this.isReadOnly;
  }
  set readonly(value: boolean) {
    this.isReadOnly = coerceBooleanProperty(value);
  }

  @Input()
  get checked() {
    return this.isChecked;
  }
  set checked(sValue: boolean) {
    if (sValue !== this.isChecked) {
      this.isChecked = sValue;
      this.onChangeInputSwitch(this.isChecked);
    }
  }
  @Input()
  get errorMessage() {
    return this.customMessage;
  }
  set errorMessage(value: string) {
    this.customMessage = value || '';
  }


}
@NgModule({
  imports: [CommonModule, SharedModule, InputSwitchModule],
  exports: [XgInputSwitchComponent, SharedModule],
  declarations: [XgInputSwitchComponent],
  providers: []
})
export class XgInputSwitchComponentModule { }
