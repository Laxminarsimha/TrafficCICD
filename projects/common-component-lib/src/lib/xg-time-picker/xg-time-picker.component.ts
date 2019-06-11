import { Component, OnInit, Input, Output, EventEmitter, ViewChild, forwardRef, NgModule, OnDestroy, AfterViewInit, OnChanges, SimpleChanges, SimpleChange, ElementRef } from '@angular/core';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { FormControl, FormBuilder, FormGroup, Validators, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { XgInputComponentModule } from '../xg-input/xg-input.component';
import { SharedModule } from '../shared/shared.module';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { XgObjectUtils } from '../shared/utilities';
import { TimeValidator } from './directives/xg-time-formatValidator';

@Component({
  selector: 'xg-time-picker',
  templateUrl: './xg-time-picker.component.html',
  styleUrls: ['./xg-time-picker.component.scss'],
  animations: [
    trigger('overlayAnimation', [
      state('visible', style({
        transform: 'translateY(0)',
        opacity: 1
      })),
      state('visibleTouchUI', style({
        transform: 'translate(-50%,-50%)',
        opacity: 1
      })),
      transition('void => visible', [
        style({ transform: 'translateY(5%)', opacity: 0 }),
        animate('{{showTransitionParams}}')
      ]),
      transition('visible => void', [
        animate(('{{hideTransitionParams}}'),
          style({
            opacity: 0,
            transform: 'translateY(5%)'
          }))
      ]),
      transition('void => visibleTouchUI', [
        style({ opacity: 0, transform: 'translate3d(-50%, -40%, 0) scale(0.9)' }),
        animate('{{showTransitionParams}}')
      ]),
      transition('visibleTouchUI => void', [
        animate(('{{hideTransitionParams}}'),
          style({
            opacity: 0,
            transform: 'translate3d(-50%, -40%, 0) scale(0.9)'
          }))
      ])
    ])
  ],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => XgTimePickerComponent), multi: true }
  ]
})

export class XgTimePickerComponent implements OnInit, OnDestroy, ControlValueAccessor {

  private tpDisabled: boolean;
  private tpPlaceholder: string;
  private tpLabel: string;
  private tpRequired: boolean;
  private tpHourFormat: boolean;
  public showHours: boolean;
  private hoursArray: any[];
  private minutesArray: any[];
  public minValue: string;
  public hourValue: string;
  public showMinutes: boolean;
  private modelValue: string;
  private sAppendTo: string;
  private overlay: HTMLDivElement;
  private sValidateOn: string;
  public showTransitionOptions: string;
  public hideTransitionOptions: string;
  @ViewChild('xgTimePickerModel') xgTimePickerModel = FormControl;
  @ViewChild('inputElement') inputElement: ElementRef;

  private onChangeTime: (_: any) => void = () => { };
  private onTouchedTime: () => void = () => { };

  @Output('onValueChange') onValueChange = new EventEmitter<any>();
  @Output('onFocus') onFocus = new EventEmitter<any>();
  @Output('onBlur') onBlur = new EventEmitter<any>();
  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.tpDisabled = false;
    this.tpPlaceholder = '';
    this.tpLabel = '';
    this.tpRequired = false;
    this.tpHourFormat = false;
    this.showHours = false;
    this.showMinutes = false;
    this.hourValue = '';
    this.minValue = '';
    this.showTransitionOptions = "225ms ease-out";
    this.hideTransitionOptions = "195ms ease-in";
    this.modelValue = '';
    this.hoursArray = [
      ['00:00', '01:00', '02:00', '03:00'],
      ['04:00', '05:00', '06:00', '07:00'],
      ['08:00', '09:00', '10:00', '11:00'],
      ['12:00', '13:00', '14:00', '15:00'],
      ['16:00', '17:00', '18:00', '19:00'],
      ['20:00', '21:00', '22:00', '23:00']
    ];
    this.minutesArray = [
      { hour: '00:00', minutes: [['12:00', '12:05', '12:10', '12:15'], ['12:20', '12:25', '12:30', '12:35'], ['12:40', '12:45', '12:50', '12:55']], prefix: '12' },
      { hour: '01:00', minutes: [['01:00', '01:05', '01:10', '01:15'], ['01:20', '01:25', '01:30', '01:35'], ['01:40', '01:45', '01:50', '01:55']], prefix: '01' },
      { hour: '02:00', minutes: [['02:00', '02:05', '02:10', '02:15'], ['02:20', '02:25', '02:30', '02:35'], ['02:40', '02:45', '02:50', '02:55']], prefix: '02' },
      { hour: '03:00', minutes: [['03:00', '03:05', '03:10', '03:15'], ['03:20', '03:25', '03:30', '03:35'], ['03:40', '03:45', '03:50', '03:55']], prefix: '03' },
      { hour: '04:00', minutes: [['04:00', '04:05', '04:10', '04:15'], ['04:20', '04:25', '04:30', '04:35'], ['04:40', '04:45', '04:50', '04:55']], prefix: '04' },
      { hour: '05:00', minutes: [['05:00', '05:05', '05:10', '05:15'], ['05:20', '05:25', '05:30', '05:35'], ['05:40', '05:45', '05:50', '05:55']], prefix: '05' },
      { hour: '06:00', minutes: [['06:00', '06:05', '06:10', '06:15'], ['06:20', '06:25', '06:30', '06:35'], ['06:40', '06:45', '06:50', '06:55']], prefix: '06' },
      { hour: '07:00', minutes: [['07:00', '07:05', '07:10', '07:15'], ['07:20', '07:25', '07:30', '07:35'], ['07:40', '07:45', '07:50', '07:55']], prefix: '07' },
      { hour: '08:00', minutes: [['08:00', '08:05', '08:10', '08:15'], ['08:20', '08:25', '08:30', '08:35'], ['08:40', '08:45', '08:50', '08:55']], prefix: '08' },
      { hour: '09:00', minutes: [['09:00', '09:05', '09:10', '09:15'], ['09:20', '09:25', '09:30', '09:35'], ['09:40', '09:45', '09:50', '09:55']], prefix: '09' },
      { hour: '10:00', minutes: [['10:00', '10:05', '10:10', '10:15'], ['10:20', '10:25', '10:30', '10:35'], ['10:40', '10:45', '10:50', '10:55']], prefix: '10' },
      { hour: '11:00', minutes: [['11:00', '11:05', '11:10', '11:15'], ['11:20', '11:25', '11:30', '11:35'], ['11:40', '11:45', '11:50', '11:55']], prefix: '11' },
      { hour: '12:00', minutes: [['12:00', '12:05', '12:10', '12:15'], ['12:20', '12:25', '12:30', '12:35'], ['12:40', '12:45', '12:50', '12:55']], prefix: '12' },
      { hour: '13:00', minutes: [['01:00', '01:05', '01:10', '01:15'], ['01:20', '01:25', '01:30', '01:35'], ['01:40', '01:45', '01:50', '01:55']], prefix: '1' },
      { hour: '14:00', minutes: [['02:00', '02:05', '02:10', '02:15'], ['02:20', '02:25', '02:30', '02:35'], ['02:40', '02:45', '02:50', '02:55']], prefix: '2' },
      { hour: '15:00', minutes: [['03:00', '03:05', '03:10', '03:15'], ['03:20', '03:25', '03:30', '03:35'], ['03:40', '03:45', '03:50', '03:55']], prefix: '3' },
      { hour: '16:00', minutes: [['04:00', '04:05', '04:10', '04:15'], ['04:20', '04:25', '04:30', '4:35'], ['04:40', '04:45', '04:50', '04:55']], prefix: '4' },
      { hour: '17:00', minutes: [['05:00', '05:05', '05:10', '05:15'], ['05:20', '05:25', '05:30', '05:35'], ['05:40', '05:45', '05:50', '05:55']], prefix: '5' },
      { hour: '18:00', minutes: [['06:00', '06:05', '06:10', '06:15'], ['06:20', '06:25', '06:30', '06:35'], ['06:40', '06:45', '06:50', '06:55']], prefix: '6' },
      { hour: '19:00', minutes: [['07:00', '07:05', '07:10', '07:15'], ['07:20', '07:25', '07:30', '07:35'], ['07:40', '07:45', '07:50', '07:55']], prefix: '7' },
      { hour: '20:00', minutes: [['08:00', '08:05', '08:10', '08:15'], ['08:20', '08:25', '08:30', '08:35'], ['08:40', '08:45', '08:50', '08:55']], prefix: '8' },
      { hour: '21:00', minutes: [['09:00', '09:05', '09:10', '09:15'], ['09:20', '09:25', '09:30', '09:35'], ['09:40', '09:45', '09:50', '09:55']], prefix: '9' },
      { hour: '22:00', minutes: [['10:00', '10:05', '10:10', '10:15'], ['10:20', '10:25', '10:30', '10:35'], ['10:40', '10:45', '10:50', '10:55']], prefix: '10' },
      { hour: '23:00', minutes: [['11:00', '11:05', '11:10', '11:15'], ['11:20', '11:25', '11:30', '11:35'], ['11:40', '11:45', '11:50', '11:55']], prefix: '11' }
    ];
    this.sValidateOn = 'change';
  }

  ngOnInit() {

  }
  ngOnDestroy() {
    const overlayDiv = document.querySelector('.xg-time-overlay');
    if (overlayDiv) {
      overlayDiv.parentElement.removeChild(overlayDiv);
    }
  }
  onSelectedHour(h: any): void {
    this.hourValue = h;
    this.showHours = false;
    this.showMinutes = true;
  }

  onSelectedMinute(m: any): void {
    this.minValue = m;
    if (this.hourFormat) {
      this.modelValue = this.hourValue.split(':')[0] + ':' + m.split(':')[1];
    } else {
      let hour: any = this.hourValue.split(':')[0];
      if (hour < 12) {
        this.modelValue = hour + ':' + m.split(':')[1] + ' AM';
      } else {
        this.modelValue = m.split(':')[0] + ':' + m.split(':')[1] + ' PM';
      }
    }
    this.timePickerModelValue = this.modelValue;
    if (this.onSelect.observers && this.onSelect.observers.length) {
      this.onSelect.emit(this.modelValue);
    }
    this.showMinutes = false;
  }

  getMinutesByHour(h: any): any {
    return this.minutesArray.filter((data) => data.hour == h);
  }

  validateTime() {
    this.showHours = false;
    this.showMinutes = false;
    if (!this.validateValue(this.modelValue, "^\\ {0,}(2[0-4]|[0-1]{0,1}\\d)\\:{0,1}([0-5]\\d){0,1}\\ {0,}([AaPp][Mm]{0,1}|[MmNn][Dd]{0,1}){0,1}\\ {0,}$")) {
      return false;
    }
    let a = RegExp.$3;
    let h = parseInt(RegExp.$1)
    let h_tmp = RegExp.$1
    if (h_tmp.length > 1 && parseInt(h_tmp) == 0) {
      h_tmp = h_tmp.replace("0", "")
      h = parseInt(h_tmp)
    }
    if (a.length != 0) {
      a = a.toUpperCase().charAt(0);
      if (a == 'N') a = "P";
      if (a == 'M') a = "A";
    } else {
      if (h == 12) a = "P";
      else a = "A"
    }
    if (h > 12 && h < 24) {
      h -= 12;
      a = "P";
    }
    if (h == 0 || h == 24) h = 12;
    let m = RegExp.$2
    if (m.length == 0) m = "00";
    if (!this.hourFormat) {
      let format = `${a}${"M"}`;
      if (format === 'AM') {
        if (h < 10) {
          this.modelValue = "0" + h + ":" + m + " " + a + "M";
          this.hourValue = `${0}${h}:${0}${0}`;
          this.minValue = `${0}${h}:${m}`;

        } else {
          this.modelValue = "" + h + ":" + m + " " + a + "M";
          this.hourValue = `${h}:${0}${0}`;
          this.minValue = `${h}:${m}`;
        }
        if (h === 12) {
          this.hourValue = `${0}${0}:${0}${0}`;
          this.minValue = `${12}:${m}`;
        }
      }
      else if (format === 'PM') {
        if (h < 10) {
          this.modelValue = "0" + h + ":" + m + " " + a + "M";
          this.minValue = `${0}${h}:${m}`;
        } else {
          this.modelValue = "" + h + ":" + m + " " + a + "M";
          this.minValue = `${h}:${m}`;
        }
        if (h === 12) {
          this.hourValue = `${h}:${0}${0}`;
        } else {
          this.hourValue = `${h + 12}:${0}${0}`;
        }
      }
    }
    return true
  }

  updateValue() {
    if (!this.hourFormat) {
      this.validateTime();
    } else {
      let hour: any = this.modelValue.split(':')[0];
      let min: any = this.modelValue.split(':')[1];
      this.hourValue = `${hour}:${0}${0}`;
      if (hour < 10) {
        this.minValue = `${hour}:${min}`;
      } else {
        if (hour >= 10 && hour <= 12) {
          this.minValue = `${hour}:${min}`;
        }
        else if (hour > 13 && hour < 22) {
          this.minValue = `${0}${hour - 12}:${min}`;
        } else {
          this.minValue = `${hour - 12}:${min}`;
        }
      }
    }
  }

  togglePicker() {
    this.showHours = !this.showHours;
    if (this.showMinutes) {
      this.showHours = false;
    }
  }

  onOverlayAnimationStart(event: AnimationEvent) {
    switch (event.toState) {
      case 'visible':
      case 'visibleTouchUI':
        this.overlay = event.element;
        this.appendOverlay();
        this.alignOverlay();
        break;

      case 'void':
        this.showHours = false;
        this.showMinutes = false;
        // this.closeCalender()
        break;
    }
  }
  appendOverlay() {
    if (this.appendTo) {
      if (this.appendTo === 'body')
        document.body.appendChild(this.overlay);
      else
        XgObjectUtils.appendChild(this.overlay, this.appendTo);
    }
  }
  alignOverlay() {
    if (this.appendTo) {
      XgObjectUtils.absolutePosition(this.overlay, this.inputElement.nativeElement);
    }
    else {
      XgObjectUtils.relativePosition(this.overlay, this.inputElement.nativeElement);
    }
  }
  onFocusIn($event: Event) {
    if (this.onFocus.observers && this.onFocus.observers.length) {
      this.onFocus.emit($event);
    }
  }

  onFocusOut($event: Event) {
    setTimeout(() => {
      this.showHours = false;
    }, 200);

    setTimeout(() => {
      this.showMinutes = false;
    }, 2000);

    if (this.onBlur.observers && this.onBlur.observers.length) {
      this.onBlur.emit($event);
    }
    this.onTouchedTime();
    this.updateValue();
  }

  onChange($event) {
    if (this.onValueChange.observers && this.onValueChange.observers.length) {
      this.onValueChange.emit(this.modelValue);
    }
  }

  writeValue(sValue) {
    this.modelValue = sValue;
    this.timePickerModelValue = this.modelValue;
    if (sValue != null) {
      this.updateValue();
    }
  }

  registerOnChange(fn: (_: any) => void): void { this.onChangeTime = fn; }
  registerOnTouched(fn: () => void): void { this.onTouchedTime = fn; }

  @Input()
  get validateOn() {
    return this.sValidateOn;
  }
  set validateOn(value) {
    this.sValidateOn = ['change', 'blur', 'submit'].indexOf(value) !== -1 ? value : 'change';
  }

  validateValue(value, pattern) {
    let t = new RegExp(pattern)
    if (t.exec(value) == null) {
      return false
    }
    return true
  }

  @Input()
  get timePickerModelValue() {
    return this.modelValue;
  }
  set timePickerModelValue(value: any) {
    this.modelValue = value;
    this.onChangeTime(this.modelValue)
    if (this.onValueChange.observers && this.onValueChange.observers.length) {
      this.onValueChange.emit(this.modelValue);
    }
  }
  @Input()
  get appendTo() {
    return this.sAppendTo;
  }
  set appendTo(value) {
    this.sAppendTo = value || ''
  }
  @Input()
  get disabled() {
    return this.tpDisabled;
  }
  set disabled(value: any) {
    this.tpDisabled = coerceBooleanProperty(value);
  }

  @Input()
  get label() {
    return this.tpLabel;
  }
  set label(value: any) {
    this.tpLabel = value || '';
  }

  @Input()
  get placeholder() {
    return this.tpPlaceholder;
  }
  set placeholder(value: any) {
    this.tpPlaceholder = value || 'Select Time Picker';
  }

  @Input()
  get required() {
    return this.tpRequired;
  }
  set required(value: any) {
    this.tpRequired = coerceBooleanProperty(value);
  }

  @Input()
  get hourFormat() {
    return this.tpHourFormat;
  }
  set hourFormat(value: any) {
    this.tpHourFormat = coerceBooleanProperty(value);
  }

  get hours() {
    return this.hoursArray;
  }

  get minutes(): any {
    return this.minutesArray.filter((data) => data.hour == this.hourValue);
  }


}

@NgModule({
  imports: [XgInputComponentModule],
  exports: [XgTimePickerComponent, SharedModule, TimeValidator],
  declarations: [XgTimePickerComponent, TimeValidator],
  providers: []
})
export class XgTimePickerModule {

}