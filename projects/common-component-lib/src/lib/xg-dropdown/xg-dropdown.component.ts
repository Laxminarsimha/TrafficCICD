import { NgModule, Component, OnInit, Input, Output, EventEmitter, ViewChild, forwardRef, ContentChild, TemplateRef, ViewEncapsulation } from '@angular/core';
// import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FormControl, FormBuilder, FormGroup, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { XgObjectUtils } from '../shared/utilities';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'xg-dropdown',
  templateUrl: './xg-dropdown.component.html',
  styleUrls: ['./xg-dropdown.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => XgDropdownComponent), multi: true }
  ]
})
export class XgDropdownComponent implements OnInit, ControlValueAccessor {

  private dDisabled: boolean;
  private dReadOnly: boolean;
  private dRequired: boolean;
  private dPlaceholder: string;
  private dName: string;
  private dFilter: boolean;
  private dFilterBy: string;
  private dScrollHeight: string;
  private dStyle: string;
  private dFilterPlaceholder: string;
  private dAutoWidth: boolean;
  private dAutofocus: boolean;
  private dResetFilterOnHide: boolean;
  private dEmptyFilterMessage: string;
  private dShowClear: boolean;
  private dShowTransitionOptions: string;
  private dHideTransitionOptions: string;
  private dropdownValue: any;
  private dOptions: any;
  private labelName: string;
  public fullWidth: boolean;
  public checkObject: boolean;
  private onChangeDropdown: (_: any) => void = () => { };
  private onTouchedDropdown: () => void = () => { };

  @Output() onValueChange: EventEmitter<any> = new EventEmitter();
  @Output('onClick') onClick: EventEmitter<any> = new EventEmitter();
  @Output('onFocus') onFocus: EventEmitter<any> = new EventEmitter();
  @Output('onBlur') onBlur: EventEmitter<any> = new EventEmitter();
  @Output('onShow') onShow: EventEmitter<any> = new EventEmitter();
  @Output('onHide') onHide: EventEmitter<any> = new EventEmitter();

  @ViewChild('xgDropdownModel') xgDropdownModel = FormControl;
  @ContentChild('xgCustomTemplate') xgCustomTemplate: TemplateRef<any>;

  @Input() displayValue: string;
  @Input() keyValue: string;

  get dropdownModelValue(): any {
    return this.dropdownValue;
  };
  set dropdownModelValue(sValue: any) {
    let checkOption: any;
    if (sValue !== this.dropdownValue) {
      this.dropdownValue = sValue;
      if (this.checkObject) {
        checkOption = this.dOptions.find((oOption: any) => oOption[this.keyValue] === sValue);
      } else {
        checkOption = sValue
      }
      this.onChangeDropdown(checkOption);
    }
    if (this.onValueChange.observers && this.onValueChange.observers.length) {
      this.onValueChange.emit(sValue);
    }
  }

  @Input()
  get options() {
    return this.dOptions;
  }

  set options(value: any) {
    if (value && value.length) {
      this.dOptions = XgObjectUtils.convertToDropdownListItems(value, this.displayValue, this.keyValue);
      this.dOptions.unshift({ label: "Select", value: null });
    }
  }

  @Input()
  get placeholder() {
    return this.dPlaceholder;
  }
  set placeholder(value) {
    this.dPlaceholder = value || 'Select a value';
    if (this.dPlaceholder.length > 0) {
      this.options.splice(0, 1);
    }
  }

  @Input()
  get disabled() {
    return this.dDisabled;
  }
  set disabled(value) {
    this.dDisabled = XgObjectUtils.coerceBooleanProperty(value);
  }

  @Input()
  get readOnly() {
    return this.dReadOnly;
  }
  set readOnly(value) {
    this.dReadOnly = XgObjectUtils.coerceBooleanProperty(value);
  }

  @Input()
  get required() {
    return this.dRequired;
  }
  set required(value) {
    this.dRequired = XgObjectUtils.coerceBooleanProperty(value);
  }

  @Input()
  get name() {
    return this.dName;
  }
  set name(value) {
    this.dName = value || '';
  }

  @Input()
  get filter() {
    return this.dFilter;
  }
  set filter(value) {
    this.dFilter = XgObjectUtils.coerceBooleanProperty(value);
  }

  @Input()
  get filterBy() {
    return this.dFilterBy;
  }
  set filterBy(value) {
    this.dFilterBy = value || '';
  }

  @Input()
  get scrollHeight() {
    return this.dScrollHeight;
  }
  set scrollHeight(value) {
    this.dScrollHeight = value || '';
  }

  @Input()
  get style() {
    return this.dStyle;
  }
  set style(value) {
    this.dStyle = value || '';
  }

  @Input()
  get filterPlaceholder() {
    return this.dFilterPlaceholder;
  }
  set filterPlaceholder(value) {
    this.dFilterPlaceholder = value || '';
  }

  @Input()
  get autoWidth() {
    return this.dAutoWidth;
  }
  set autoWidth(value) {
    this.dAutoWidth = XgObjectUtils.coerceBooleanProperty(value);
  }

  @Input()
  get autofocus() {
    return this.dAutofocus;
  }
  set autofocus(value) {
    this.dAutofocus = XgObjectUtils.coerceBooleanProperty(value);
  }

  @Input()
  get resetFilterOnHide() {
    return this.dResetFilterOnHide;
  }
  set resetFilterOnHide(value) {
    this.dResetFilterOnHide = XgObjectUtils.coerceBooleanProperty(value);
  }

  @Input()
  get emptyFilterMessage() {
    return this.dEmptyFilterMessage;
  }
  set emptyFilterMessage(value) {
    this.dEmptyFilterMessage = value || '';
  }

  @Input()
  get showClear() {
    return this.dShowClear;
  }
  set showClear(value) {
    this.dShowClear = XgObjectUtils.coerceBooleanProperty(value);
  }

  @Input()
  get showTransitionOptions() {
    return this.dShowTransitionOptions;
  }
  set showTransitionOptions(value) {
    this.dShowTransitionOptions = value || '';
  }

  @Input()
  get hideTransitionOptions() {
    return this.dHideTransitionOptions;
  }
  set hideTransitionOptions(value) {
    this.dHideTransitionOptions = value || '';
  }

  @Input()
  get label() {
    return this.labelName;
  }
  set label(value) {
    this.labelName = value || '';
  }

  constructor() {
    this.dDisabled = false;
    this.dReadOnly = false;
    this.dRequired = false;
    this.dPlaceholder = '';
    this.dScrollHeight = '200px';
    this.dStyle = '';
    this.dOptions = [];
    this.dName = '';
    this.dFilter = false;
    this.dFilterBy = '';
    this.dFilterPlaceholder = '';
    this.dAutoWidth = true;
    this.dAutofocus = false;
    this.dResetFilterOnHide = true;
    this.dEmptyFilterMessage = 'No results found';
    this.dShowClear = false;
    this.dShowTransitionOptions = '225ms ease-out';
    this.dHideTransitionOptions = '195ms ease-in';
    this.dropdownValue = '';
    this.displayValue = 'label';
    this.labelName = '';
    this.fullWidth = true;
    this.checkObject = false
  }

  ngOnInit() {
  }

  onClickEvent(event: Event) {
    if (this.onClick.observers && this.onClick.observers.length) {
      this.onClick.emit(event);
    }
  }

  onFocusEvent(event: Event) {
    if (this.onFocus.observers && this.onFocus.observers.length) { }
    this.onFocus.emit(event);
  }

  onBlurEvent(event: Event) {
    if (this.onBlur.observers && this.onBlur.observers.length) { }
    this.onBlur.emit(event);
  }

  onShowEvent(event: Event) {
    if (this.onShow.observers && this.onShow.observers.length) { }
    this.onShow.emit(event);
  }

  onHideEvent(event: Event) {
    if (this.onHide.observers && this.onHide.observers.length) { }
    this.onHide.emit(event);
  }

  writeValue(sValue) {
    if (typeof (sValue) == 'string') {
      this.checkObject = false;
      this.dropdownValue = sValue;
    }
    else if (XgObjectUtils.isObject(sValue)) {
      this.checkObject = true;
      this.dropdownValue = sValue[this.keyValue];
    }
    else {
      this.dropdownValue = '';
    }
    this.dropdownModelValue = this.dropdownValue;
  }

  registerOnChange(fn: (_: any) => void): void { this.onChangeDropdown = fn; }
  registerOnTouched(fn: () => void): void { this.onTouchedDropdown = fn; }

}
@NgModule({
  imports: [CommonModule, SharedModule, DropdownModule],
  exports: [XgDropdownComponent, SharedModule],
  declarations: [XgDropdownComponent],
  providers: []
})
export class XgDropdownComponentModule { }

