import { NgModule, Component, OnInit, Input, forwardRef, Output, EventEmitter, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XgCheckboxComponentModule } from '../xg-checkbox/xg-checkbox.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { xgDays } from '../shared/xgInterfaces';
import { XgObjectUtils } from '../shared/utilities';

@Component({
  selector: 'xg-day-picker',
  templateUrl: './xg-day-picker.component.html',
  styleUrls: ['./xg-day-picker.component.scss'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => XgDayPickerComponent), multi: true }]
})
export class XgDayPickerComponent implements OnInit, ControlValueAccessor {
  private sDayPickerValue: number;
  public aDays: xgDays[];
  private aSelectedDays: xgDays[];
  private bRequired: boolean;
  private onChangeDayPickerChange: (_: any) => void = () => { };
  private onTouchedDayPicker: () => void = () => { };
  @Output('onValueChange') onValueChange = new EventEmitter<any>();
  @Input()
  get required() {
    return this.bRequired;
  }
  set required(value) {
    this.bRequired = XgObjectUtils.coerceBooleanProperty(value);
  }
  constructor() {
    this.aDays = this.getDays() || [];
    this.aSelectedDays = [];
    this.bRequired = false;
  }

  ngOnInit() {

  }
  checkAllDays() {
    let sDayCode = 127;
    if (this.getDayCodeN() === sDayCode) {
      sDayCode = 0;
    }
    this.setSelectedDays(sDayCode);
    this.updateDaysModel();
  }
  checkWeekdays() {
    let sDayCode = 124;
    if (this.getDayCodeN() === sDayCode) {
      sDayCode = 0;
    }
    this.setSelectedDays(sDayCode);
    this.updateDaysModel();
  }
  checkWeekends() {
    let sDayCode = 3;
    if (this.getDayCodeN() === sDayCode) {
      sDayCode = 0;
    }
    this.setSelectedDays(sDayCode);
    this.updateDaysModel();
  }
  getDayCodesArray(sDayCode: number) {
    const dayCodes: Array<number> = [];
    if (sDayCode >= 64) {
      dayCodes.push(64);
      sDayCode = sDayCode - 64;
    }
    if (sDayCode >= 32) {
      dayCodes.push(32)
      sDayCode = sDayCode - 32;
    }
    if (sDayCode >= 16) {
      dayCodes.push(16);
      sDayCode = sDayCode - 16;
    }
    if (sDayCode >= 8) {
      dayCodes.push(8)
      sDayCode = sDayCode - 8;
    }
    if (sDayCode >= 4) {
      dayCodes.push(4);
      sDayCode = sDayCode - 4;
    }

    if (sDayCode >= 2) {
      dayCodes.push(2)
      sDayCode = sDayCode - 2;
    }

    if (sDayCode >= 1) {
      dayCodes.push(1)
    }
    return dayCodes;

  }
  setSelectedDays(sDayCode) {
    this.aSelectedDays = [];
    const selectedDays = this.getDayCodesArray(sDayCode);
    this.aDays.forEach((oDay) => {
      oDay.isSelected = selectedDays.indexOf(oDay.daycode_N) !== -1;
      if (oDay.isSelected) {
        this.aSelectedDays.push(oDay);
      }
    })
  }
  getDays(): xgDays[] {
    return [
      {
        code: "Monday",
        label: "Mo",
        daycode: 2,
        daycode_N: 64,
        isSelected: false,
        isWeekDay: true,
        longlabel: "MON"
      },
      {
        code: "Tuesday",
        label: "Tu",
        daycode: 3,
        daycode_N: 32,
        isSelected: false,
        isWeekDay: true,
        longlabel: "TUE"
      },
      {
        code: "Wednesday",
        label: "We",
        daycode: 4,
        daycode_N: 16,
        isSelected: false,
        isWeekDay: true,
        longlabel: "WED"
      },
      {
        code: "Thursday",
        label: "Th",
        daycode: 5,
        daycode_N: 8,
        isSelected: false,
        isWeekDay: true,
        longlabel: "THU"
      },
      {
        code: "Friday",
        label: "Fr",
        daycode: 6,
        daycode_N: 4,
        isSelected: false,
        isWeekDay: true,
        longlabel: "FRI"
      },
      {
        code: "Saturday",
        label: "Sa",
        daycode: 7,
        daycode_N: 2,
        isSelected: false,
        isWeekDay: false,
        longlabel: "SAT"
      },
      {
        code: "Sunday",
        label: "Su",
        daycode: 8,
        daycode_N: 1,
        isSelected: false,
        isWeekDay: false,
        longlabel: "SUN"
      }
    ];
  }
  onModelChange(event, oDay) {
    const sIndex = this.aSelectedDays.findIndex(oSelectedDay => oSelectedDay.daycode_N === oDay.daycode_N);
    if (event) {
      if (sIndex === -1) {
        this.aSelectedDays.push(oDay);
      }

    }
    else {
      if (sIndex !== -1) {
        this.aSelectedDays.splice(sIndex, 1);
      }
    }
    this.updateDaysModel();
  }
  getDayCodeN() {
    let oDayCode = 0;
    this.aSelectedDays.forEach(oDay => {
      oDayCode = oDayCode + oDay.daycode_N;
    })
    return oDayCode;
  }
  updateDaysModel() {
    this.onChangeDayPickerChange(this.getDayCodeN());
    if (this.onValueChange.observers && this.onValueChange.observers.length) {
      this.onValueChange.emit(this.aSelectedDays);
    }
  }
  writeValue(sValue: number) {
    this.sDayPickerValue = sValue || 0;
    this.setSelectedDays(sValue)
  }
  registerOnChange(fn: (_: any) => void): void { this.onChangeDayPickerChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouchedDayPicker = fn; }

}
@NgModule({
  imports: [CommonModule, SharedModule, XgCheckboxComponentModule],
  exports: [XgDayPickerComponent],
  declarations: [XgDayPickerComponent],
  providers: []
})
export class XgDayPickerComponentModule { }
