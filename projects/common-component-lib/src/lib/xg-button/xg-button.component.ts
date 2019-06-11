import { NgModule, Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
// import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { XgObjectUtils } from '../shared/utilities';
@Component({
  selector: 'xg-button',
  templateUrl: './xg-button.component.html',
  styleUrls: ['./xg-button.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => XgButtonComponent), multi: true }
  ]
})
export class XgButtonComponent implements OnInit, ControlValueAccessor {
  private bInputType: string;
  private bDisabled: boolean;
  private bLabelName: string;
  private bIcon: string;
  private bIconPos: string;
  private buttonId: string;
  private isButtonDropdown: boolean;
  private xgbuttonClass: string;
  public buttonOptions: any[];
  @Output('onClick') onClick = new EventEmitter();


  showMenu: boolean = false;

  private onChangeButton: (_: any) => void = () => { };
  private onTouchedButton: () => void = () => { };

  constructor() {
    this.bInputType = '';
    this.bDisabled = false;
    this.bLabelName = '';
    this.bIcon = '';
    this.bIconPos = '';
    this.isButtonDropdown = false;
    this.buttonId = "";
    this.xgbuttonClass = "";
    this.buttonOptions = [];
  }

  ngOnInit() {
  }

  onClickEvent(event: Event) {
    if (this.onClick.observers && this.onClick.observers.length) {
      this.onClick.emit(event);
    }
  }

  writeValue(sValue: any) {
    console.log("ima in write")

  }
  registerOnChange(fn: (_: any) => void): void { this.onChangeButton = fn; }
  registerOnTouched(fn: () => void): void { this.onTouchedButton = fn; }

  @Input()
  get type() {
    return this.bInputType;
  }
  set type(value: string) {
    this.bInputType = value || 'button';
    this.label = this.label || '';
    this.icon = this.icon || '';
    this.xgButtonClass = this.xgButtonClass || '';
  }
  @Input()
  get disabled() {
    return this.bDisabled;
  }
  set disabled(value: boolean) {
    this.bDisabled = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get label() {
    return this.bLabelName
  }
  set label(value: string) {
    let val = this.bInputType;
    switch (val) {
      case 'reset':
        this.bLabelName = value || "Reset";
        break;
      case 'submit':
        this.bLabelName = value || "Submit";
        break;
      case 'button':
        this.bLabelName = value || "Button";
        break;
      case 'clear':
        this.bLabelName = value || "Clear";
        break;
      case 'save':
        this.bLabelName = value || "Save";
        break;
      case 'add':
        this.bLabelName = value || "Add";
        break;
      case 'delete':
        this.bLabelName = value || "Delete";
        break;
      default: this.bLabelName = value || "Label";
    }
  }
  @Input()
  get icon() {
    return this.bIcon
  }
  set icon(value: string) {
    let val = this.bInputType;
    switch (val) {
      case 'reset':
        this.bIcon = value || "fas fa-redo";
        break;
      case 'submit':
        this.bIcon = value || "fas fa-angle-right";
        break;
      case 'button':
        this.bIcon = value || "xg-icon-none";
        break;
      case 'clear':
        this.bIcon = value || "fas fa-times-circle";
        break;
      case 'add':
        this.bIcon = value || "fa fa-plus";
        break;
      case 'save':
        this.bIcon = value || "fa fa-save";
        break;
      case 'delete':
        this.bIcon = value || "fa fa-trash";
        break;
      default: this.bIcon = value || "";
    }
  }
  @Input()
  get iconPos() {
    return this.bIconPos
  }
  set iconPos(value: string) {
    this.bIconPos = value || 'left';
  }

  @Input()
  get xgButtonDropdown() {
    return this.isButtonDropdown
  }
  set xgButtonDropdown(value: boolean) {
    this.isButtonDropdown = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get xgButtonClass() {
    return this.xgbuttonClass
  }
  set xgButtonClass(value: string) {
    let val = this.bInputType;
    switch (val) {
      case 'reset':
        this.xgbuttonClass = value || "warning";
        break;
      case 'submit':
        this.xgbuttonClass = value || "primary";
        break;
      case 'button':
        this.xgbuttonClass = value || "default";
        break;
      case 'clear':
        this.xgbuttonClass = value || "danger";
        break;
      case 'save':
        this.xgbuttonClass = value || "primary";
        break;
      case 'add':
        this.xgbuttonClass = value || "primary";
        break;
      case 'delete':
        this.xgbuttonClass = value || "danger";
        break;
      default: this.xgbuttonClass = value || "default";
    }
  }
  @Input()
  get optionsButtons() {
    return this.buttonOptions
  }
  set optionsButtons(value: any) {
    this.buttonOptions = value || '';
  }

  getDropdown() {
    this.showMenu = !this.showMenu;
  }
}
@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [XgButtonComponent, SharedModule],
  declarations: [XgButtonComponent],
  providers: []
})
export class XgButtonComponentModule { }
