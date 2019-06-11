import { NgModule, Component, OnInit, Input, Output, EventEmitter, ViewChild, TemplateRef, forwardRef, ContentChild, AfterContentInit, ViewEncapsulation } from '@angular/core';
// import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FormControl, FormBuilder, FormGroup, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { XgObjectUtils } from '../shared/utilities';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'xg-multi-select',
  templateUrl: './xg-multi-select.component.html',
  styleUrls: ['./xg-multi-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => XgMultiSelectComponent), multi: true }
  ]
})
export class XgMultiSelectComponent implements OnInit, ControlValueAccessor {

  private msDisabled: boolean;
  private msReadOnly: boolean;
  private msLabel: string;
  private msRequired: boolean;
  private msOptions: any[];
  private multiModelValue: string;
  private sMultiValue: any[];
  private msShowHeader: boolean;
  private msFilter: boolean;
  private msSelectionLimit: number;
  private msMaxSelectedLabels: number;
  private msPlaceholder: string;
  private msDefaultLabel: string;
  public sError: boolean;
  @ViewChild('xgMultiSelectModel') xgMultiSelectModel = FormControl;
  @ContentChild('xgCustomTemplate') xgCustomTemplate: TemplateRef<any>;

  @Input() displayValue: string;
  @Input() keyValue: string;
  @Output() onValueChange: EventEmitter<any> = new EventEmitter();
  @Output('onClick') onClick: EventEmitter<any> = new EventEmitter();
  @Output('onUnSelect') onUnSelect: EventEmitter<any> = new EventEmitter();
  @Output('onFocus') onFocus: EventEmitter<any> = new EventEmitter();
  @Output('onBlur') onBlur: EventEmitter<any> = new EventEmitter();
  private onChangeMultiDropdown: (_: any) => void = () => { };
  private onTouchedMultiDropdown: () => void = () => { };

  constructor() {
    this.msDisabled = false;
    this.msReadOnly = false;
    this.msLabel = '';
    this.msRequired = false;
    this.msOptions = [];
    this.multiModelValue = "";
    this.sMultiValue = [];
    this.msShowHeader = false;
    this.msFilter = false;
    this.msSelectionLimit = 0;
    this.msMaxSelectedLabels = 3;
    this.displayValue = "label";
    this.msPlaceholder = "";
    this.msDefaultLabel = "";
    this.sError = false;
  }

  ngOnInit() {
  }


  writeValue(sValue) {
    let aSelectedList = [];
    this.sMultiValue = [];
    if (XgObjectUtils.isArray(sValue)) {
      aSelectedList = sValue;
    }
    else if (XgObjectUtils.isObject(sValue)) {
      aSelectedList = [sValue]
    }
    if (aSelectedList && aSelectedList.length) {
      aSelectedList = XgObjectUtils.convertToDropdownListItems(aSelectedList, this.displayValue, this.keyValue);
      aSelectedList.forEach((oSelectedOption) => {
        const oFindedObject = this.options.find((oOption) => oOption.value === oSelectedOption.value)
        if (oFindedObject) {
          this.sMultiValue.push(oFindedObject)
        }
      })
      this.multiSelectModelValue = this.sMultiValue;
    }
    else {
      this.multiSelectModelValue = [];
    }
  }
  onClickEvent(event: Event) {
    if (this.onClick.observers && this.onClick.observers.length) {
      this.onClick.emit(event);
    }
  }
  onFocusEvent(event) {
    if (this.onFocus.observers && this.onFocus.observers.length) {
      this.onFocus.emit(event);
    }
  }
  onBlurEvent(event) {
    if (this.onBlur.observers && this.onBlur.observers.length) {
      this.onBlur.emit(event);
    }
  }
  onChangeEvent(event) {
    const isUnselectIndex = event.originalEvent.target.className.indexOf('pi pi-check');
    if (isUnselectIndex !== -1 && this.onUnSelect.observers && this.onUnSelect.observers.length) {
      this.onUnSelect.emit(event.itemValue);
    }
  }

  registerOnChange(fn: (_: any) => void): void { this.onChangeMultiDropdown = fn; }
  registerOnTouched(fn: () => void): void { this.onTouchedMultiDropdown = fn; }

  @Input()
  get disabled() {
    return this.msDisabled;
  }
  set disabled(value: boolean) {
    this.msDisabled = XgObjectUtils.coerceBooleanProperty(value);
  }

  @Input()
  get readonly() {
    return this.msReadOnly;
  }
  set readonly(value: boolean) {
    this.msReadOnly = XgObjectUtils.coerceBooleanProperty(value);
  }

  @Input()
  get label() {
    return this.msLabel;
  }
  set label(value: string) {
    this.msLabel = value || '';
  }

  @Input()
  get required() {
    return this.msRequired;
  }
  set required(value: boolean) {
    this.msRequired = XgObjectUtils.coerceBooleanProperty(value);
  }

  @Input()
  get options() {
    return this.msOptions;
  }

  set options(value: any) {
    if (value && value.length) {
      this.msOptions = XgObjectUtils.convertToDropdownListItems(value, this.displayValue, this.keyValue);
    }
    else{
      this.msOptions = [];
    }
  }

  @Input()
  get multiSelectModelValue(): any {
    return this.sMultiValue;
  };
  set multiSelectModelValue(sValue: any) {
    if (sValue !== this.sMultiValue) {
      this.sMultiValue = sValue;
      this.onChangeMultiDropdown(sValue);
    }
    if (this.onValueChange.observers && this.onValueChange.observers.length) {
      this.onValueChange.emit(sValue);
    }
  }
  @Input()
  get showHeader() {
    return this.msShowHeader;
  }
  set showHeader(value: boolean) {
    this.msShowHeader = XgObjectUtils.coerceBooleanProperty(value);
  }

  @Input()
  get filter() {
    return this.msFilter;
  }
  set filter(value: boolean) {
    this.msFilter = XgObjectUtils.coerceBooleanProperty(value);
  }

  @Input()
  get selectionLimit() {
    return this.msSelectionLimit;
  }
  set selectionLimit(value: number) {
    this.msSelectionLimit = value || 0;
  }
  @Input()
  get maxSelectedLabels() {
    return this.msMaxSelectedLabels;
  }
  set maxSelectedLabels(value: number) {
    this.msMaxSelectedLabels = value || 3;
  }
  @Input()
  get filterPlaceHolder() {
    return this.msPlaceholder;
  }
  set filterPlaceHolder(value) {
    this.msPlaceholder = value || '';
  }
  @Input()
  get placeholder() {
    return this.msDefaultLabel;
  }
  set placeholder(value) {
    this.msDefaultLabel = value || 'Select';
  }

}
@NgModule({
  imports: [CommonModule, SharedModule, MultiSelectModule],
  exports: [XgMultiSelectComponent, SharedModule],
  declarations: [XgMultiSelectComponent],
  providers: []
})
export class XgMultiSelectComponentModule { }