import { NgModule, Component, OnInit, forwardRef, Output, EventEmitter, Input, ContentChild, TemplateRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
// import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { XgObjectUtils } from '../shared/utilities';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'xg-radio-group',
  templateUrl: './xg-radio.component.html',
  styleUrls: ['./xg-radio.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => XgRadioComponent), multi: true }
  ]
})
export class XgRadioComponent implements OnInit, ControlValueAccessor {
  private sradioName: string;
  private sRadioValue: string;
  private sRadioDisabled: boolean;
  private sRadioRequired: boolean;
  private sRadioClass: string;
  private sRadioOptions: any[];
  private sLabelLeft: string;
  private sLayout: string;
  private onChangeRadio: (_: any) => void = () => { };
  private onTouchedRadio: () => void = () => { };
  @Input() displayValue: string;
  @Input() keyValue: string;
  @Output('onValueChange') onValueChange = new EventEmitter<any>();
  @Output('onClick') onClick: EventEmitter<any> = new EventEmitter();
  @ContentChild('xgRadioTemplate') xgRadioTemplate: TemplateRef<any>;
  constructor() {
    this.sradioName = "";
    this.sRadioValue = "";
    this.sRadioDisabled = false;
    this.sRadioRequired = false;
    this.sRadioClass = "";
    this.sRadioOptions = [];
    this.sLabelLeft = 'after';
    this.sLayout = 'horizontal'
  }

  ngOnInit() {
  }

  toggleModel($event) {
    this.radioModelValue = $event;
  }

  writeValue(sValue: any) {
    this.sRadioValue = sValue || '';
    this.radioModelValue = this.sRadioValue;
  }
  onClickEvent(event: Event) {
    if (this.onClick.observers && this.onClick.observers.length) {
      this.onClick.emit(event);
    }
  }
  registerOnChange(fn: (_: any) => void): void { this.onChangeRadio = fn; }
  registerOnTouched(fn: () => void): void { this.onTouchedRadio = fn; }

  @Input()
  get radioModelValue(): any {
    return this.sRadioValue;
  };
  set radioModelValue(sValue: any) {
    if (sValue !== this.sRadioValue) {
      this.sRadioValue = sValue;
      this.onChangeRadio(sValue);
    }
    if (this.onValueChange.observers && this.onValueChange.observers.length) {
      this.onValueChange.emit(sValue);
    }
  }
  @Input()
  get groupName() {
    return this.sradioName;
  }
  set groupName(value: string) {
    this.sradioName = value || XgObjectUtils.getRandomId('xgRadio');
  }
  @Input()
  get disabled() {
    return this.sRadioDisabled;
  }
  set disabled(value: any) {
    this.sRadioDisabled = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get required() {
    return this.sRadioRequired;
  }
  set required(value: any) {
    this.sRadioRequired = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get radioClass() {
    return this.sRadioClass;
  }
  set radioClass(value: any) {
    this.sRadioClass = value || '';
  }
  @Input()
  get layout() {
    return this.sLayout;
  }
  set layout(value) {
    this.sLayout = value || 'horizontal';
  }

  @Input()
  get labelLeft() {
    return this.sLabelLeft;
  }
  set labelLeft(value) {
    this.sLabelLeft = (XgObjectUtils.coerceBooleanProperty(value)) ? 'before' : 'after';
  }
  @Input()
  get radioOptions() {
    return this.sRadioOptions;
  }
  set radioOptions(value: any) {
    if (value && value.length) {
      this.sRadioOptions = XgObjectUtils.convertToDropdownListItems(value, this.displayValue, this.keyValue);
    }
  }
  @Input()
  get checkedValue() {
    return this.sRadioValue;
  }
  set checkedValue(value) {
    this.sRadioValue = value || '';
  }
}
@NgModule({
  imports: [CommonModule, SharedModule, MatRadioModule],
  exports: [XgRadioComponent, SharedModule, MatRadioModule],
  declarations: [XgRadioComponent],
  providers: []
})
export class XgRadioComponentModule { }