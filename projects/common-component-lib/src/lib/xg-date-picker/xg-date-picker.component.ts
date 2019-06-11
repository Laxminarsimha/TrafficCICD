import { NgModule, Component, OnInit, Input, forwardRef, Output, Renderer, EventEmitter, ViewChild, ViewEncapsulation, ElementRef, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate, AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { XgObjectUtils } from '../shared/utilities';
import { IXgDate, IXgMonth, IXgWeek, IXgDayLabels, IXgCalendarDay, IXgCalendarMonth, IXgCalendarYear, IXgDateFormat, IXgMonthLabels, IxgInputFocusBlur, IXgOptions } from './xg-date-picker.interfaces';
import { XgDatePickerService } from './xg-date-picker.service';
import { DatePickerConstants } from './xg-date-picker.constants';
import { DateValidator } from './directives/xg-date-pickerValidator';
// import { yearsPerPage } from '@angular/material/datepicker/typings/multi-year-view';

enum KeyCode {
  enter = 13,
  esc = 27,
  space = 32
}
enum MonthId {
  prev = 1,
  curr = 2,
  next = 3
}

@Component({
  selector: 'xg-date-picker',
  templateUrl: './xg-date-picker.component.html',
  styleUrls: ['./xg-date-picker.component.scss'],
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
    XgDatePickerService,
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => XgDatePickerComponent), multi: true }]
})
export class XgDatePickerComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private bRequired: boolean;
  private sPlaceholder: string;
  private bDisabled: boolean;
  public showCalender: boolean;
  public selectedDate: IXgDate;
  private sDefaultMonth: string;
  private selectedMonth: IXgMonth;
  public visibleMonth: IXgMonth;
  private oMonthLabels: IXgMonthLabels;
  public datePickerConstants: DatePickerConstants;
  public monthlyWeeks: Array<IXgWeek>;
  public firstDayOfWeekIndex: number;
  private sFirstDayOfWeek: string;
  public weekHeaders: any[];
  private oDayLabels: IXgDayLabels[];
  public bMonthView: boolean;
  public bYearView: boolean;
  public aMonths: Array<Array<IXgCalendarMonth>>;
  public aYears: Array<Array<IXgCalendarYear>>;
  private sMinYear: number;
  private sMaxYear: number;
  private sDatePickerValue: string;
  private sDateFormatter: string;
  private sMinDate: any;
  private sMaxDate: any;
  private sLabelName: string;
  public nextButtonDisable: boolean;
  public previousButtonDisable: boolean;
  private sValidateOn: string;
  public showTransitionOptions: string;
  public hideTransitionOptions: string;
  private sAppendTo: string;
  private overlay: HTMLDivElement;
  private onChangeDatePicker: (_: any) => void = () => { };
  private onTouchedDatePicker: () => void = () => { };
  @Output('onValueChange') onValueChange = new EventEmitter<any>();
  @Output('onToggleCalender') onToggleCalendar: EventEmitter<any> = new EventEmitter<any>();
  @Output('calenderViewChanged') calenderViewChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output('onBlur') onBlur: EventEmitter<IxgInputFocusBlur> = new EventEmitter<IxgInputFocusBlur>();
  @Output('onFocus') onFocus: EventEmitter<IxgInputFocusBlur> = new EventEmitter<IxgInputFocusBlur>();
  @ViewChild('inputElement') inputElement: ElementRef;
  prevMonthId: number = MonthId.prev;
  currMonthId: number = MonthId.curr;
  nextMonthId: number = MonthId.next;
  isValidateDate: boolean;
  opts: IXgOptions = {
    enableBroadcastCalendar: <boolean>true
  }
  private sBoardCastCalenderView: boolean;

  @Input()
  get placeholder() {
    return this.sPlaceholder;
  };
  set placeholder(value) {
    this.sPlaceholder = value || '';
  }
  @Input()
  get label() {
    return this.sLabelName;
  }
  set label(value) {
    this.sLabelName = value || '';
  }
  @Input()
  get disabled() {
    return this.bDisabled;
  }
  set disabled(value) {
    this.bDisabled = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get validateOn() {
    return this.sValidateOn
  }
  set validateOn(value) {
    this.sValidateOn = ['change', 'blur', 'submit'].indexOf(value) !== -1 ? value : 'change'
  }
  @Input()
  get required() {
    return this.bRequired;
  }
  set required(value) {
    this.bRequired = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get defaultMonth() {
    return this.sDefaultMonth;
  }
  set defaultMonth(value: string) {
    if (value) {
      this.sDefaultMonth = value;
      this.selectedMonth = this.xgDatePickerService.parseDefaultMonth(value);
    }
  }
  @Input()
  get monthLabels() {
    return this.oMonthLabels;
  }
  set monthLabels(value: object) {
    this.oMonthLabels = XgObjectUtils.isObject(value) ? { ...this.datePickerConstants.constants['monthLabels'], ...value } : this.datePickerConstants.constants['monthLabels'];
  }
  @Input()
  get dayLabels() {
    return this.oDayLabels;
  }
  set dayLabels(value: object) {
    this.oDayLabels = XgObjectUtils.isObject(value) ? { ...this.datePickerConstants.constants['dayLabels'], ...value } : this.datePickerConstants.constants['dayLabels'];
  }
  @Input()
  get firstDayOfWeek() {
    return this.sFirstDayOfWeek;
  }
  set firstDayOfWeek(value: string) {
    this.sFirstDayOfWeek = value;
  }
  @Input()
  get formatter() {
    return this.sDateFormatter;
  }
  set formatter(value: string) {
    this.sDateFormatter = value;
  }
  @Input()
  get minYear() {
    return this.sMinYear;
  }
  set minYear(value: number) {
    this.sMinYear = value || 1000;
  }
  @Input()
  get maxYear() {
    return this.sMaxYear;
  }
  set maxYear(value: number) {
    this.sMaxYear = value || 9999;
  }
  @Input()
  get minDate() {
    return this.sMinDate;
  }
  set minDate(value) {
    this.sMinDate = (value && this.xgDatePickerService.isValidDate(value)) ? this.xgDatePickerService.convertToXgDate(new Date(value)) : '';
  }
  @Input()
  get maxDate() {
    return this.sMaxDate;
  }
  set maxDate(value) {
    this.sMaxDate = (value && this.xgDatePickerService.isValidDate(value)) ? this.xgDatePickerService.convertToXgDate(new Date(value)) : '';
  }
  @Input()
  get appendTo() {
    return this.sAppendTo;
  }
  set appendTo(value) {
    this.sAppendTo = value || ''
  }
  get datePickerModelValue(): any {
    return this.sDatePickerValue;
  };
  set datePickerModelValue(sValue: any) {
    if (sValue !== this.sDatePickerValue) {
      this.sDatePickerValue = sValue;
      this.onChangeDatePicker(this.isValidateDate ? this.xgDatePickerService.convertXgDateToDate(this.selectedDate) : sValue);
    }
    if (this.onValueChange.observers && this.onValueChange.observers.length) {
      this.onValueChange.emit(sValue);
    }
    // this.sDatePickerValue = sValue
  }
  @Input()
  get boardCastCalenderView() {
    return this.sBoardCastCalenderView;
  }
  set boardCastCalenderView(value) {
    this.sBoardCastCalenderView = XgObjectUtils.coerceBooleanProperty(value);
  }
  constructor(private xgDatePickerService: XgDatePickerService, private renderer: Renderer) {
    this.showCalender = false;
    this.sPlaceholder = '';
    this.bDisabled = false;
    this.bRequired = false;
    this.sValidateOn = 'change';
    this.datePickerConstants = new DatePickerConstants();
    this.selectedDate = { year: 0, month: 0, day: 0 };
    this.selectedMonth = { monthTxt: "", monthNbr: 0, year: 0 };
    this.monthlyWeeks = [];
    this.sFirstDayOfWeek = 'mo';
    this.oDayLabels = this.datePickerConstants.constants['dayLabels'];
    this.oMonthLabels = this.datePickerConstants.constants['monthLabels'];
    this.bYearView = false;
    this.bMonthView = false;
    this.aMonths = [];
    this.aYears = [];
    this.weekHeaders = [];
    this.sMinYear = 1000;
    this.sMaxDate = '';
    this.sMinDate = '';
    this.sDateFormatter = 'MM/dd/yy';
    this.sMaxYear = 9999;
    this.showTransitionOptions = "225ms ease-out";
    this.hideTransitionOptions = "195ms ease-in";
    this.sBoardCastCalenderView = false;
    this.isValidateDate = false;
    renderer.listenGlobal("document", "click", (event: any) => {
      if (
        this.showCalender &&
        event.target &&
        !event.target.closest('.xg-date-picker')
      ) {
        this.showCalender = false;
        this.closeCalendarView('onOutsideCLick');
      }
    });
  }

  ngOnInit() {
    this.initializeCalendar()
  }
  ngOnDestroy() {
    const overlayDiv = document.querySelector('.xg-calender-overlay');
    if (overlayDiv) {
      overlayDiv.parentElement.removeChild(overlayDiv);
    }
  }
  onKeyDown(event) {
    if (this.showCalender) {
      switch (event.which || event.keyCode) {
        case KeyCode.esc:
          this.closeCalender();
          event.preventDefault();
          break;
      }
    }
  }
  initializeCalendar() {
    const weekDays = this.datePickerConstants.constants['weekDays'];
    this.firstDayOfWeekIndex = weekDays.indexOf(this.sFirstDayOfWeek);
    if (this.firstDayOfWeekIndex !== -1) {
      let sWeekIndex = this.firstDayOfWeekIndex
      weekDays.forEach((weekDay) => {
        this.weekHeaders.push(this.oDayLabels[weekDays[sWeekIndex]]);
        sWeekIndex = weekDays[sWeekIndex] === "sa" ? 0 : sWeekIndex + 1;
      })
    }
  }
  toggleCalendar() {
    this.showCalender = !this.showCalender;
    this.bMonthView = false;
    this.bYearView = false;
    if (this.showCalender) {
      this.inputElement.nativeElement.focus();
      this.openCalendarView("Opened");
    } else {
      this.closeCalendarView("Closed");
    }
  }
  openCalendarView(sAction): void {
    this.setVisibleMonth();
    this.onToggleCalendar.emit(sAction);
  }
  closeCalendarView(sAction): void {
    this.onToggleCalendar.emit(sAction);
  }
  setVisibleMonth(): void {
    let year: number = 0,
      month: number = 0;
    if (!this.xgDatePickerService.isInitializedDate(this.selectedDate)) {
      if (this.selectedMonth.year === 0 && this.selectedMonth.monthNbr === 0) {
        const currentDay: IXgDate = this.xgDatePickerService.getCurrentDay();
        year = currentDay.year;
        month = currentDay.month;
      } else {
        year = this.selectedMonth.year;
        month = this.selectedMonth.monthNbr;
      }
    } else {
      year = this.selectedDate.year;
      month = this.selectedDate.month;
    }
    this.visibleMonth = {
      monthTxt: this.oMonthLabels[month],
      monthNbr: month,
      year: year
    };

    // Create current month
    this.generateCalendar(month, year, true);
  }
  getMonthStartIndex(year: number, month: number): number {
    const currentDate = this.xgDatePickerService.getCurrentDate();
    currentDate.setDate(1);
    currentDate.setMonth(month - 1);
    currentDate.setFullYear(year);
    let sIndex = this.firstDayOfWeekIndex - currentDate.getDay()
    return sIndex < 0 ? Math.abs(sIndex) : (7 - sIndex)
  }
  getSundayIndex() {
    return this.firstDayOfWeekIndex > 0 ? 7 - this.firstDayOfWeekIndex : 0;
  }
  addDays(date: Date, days: number): Date {
    var newdate = new Date(
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear()
    );
    newdate.setDate(newdate.getDate() + days);
    return newdate;
  }

  GetBroadcastStartDate(month: number, year: number): Date {
    var day = 24;
    var BroadcastDate;
    var DayOfTheWeek;
    if (month == 1) {
      month = 12;
      year = year - 1;
    } else {
      month = month - 1;
    }
    BroadcastDate = new Date(month + "/" + day + "/" + year);
    DayOfTheWeek = BroadcastDate.getDay();
    if (DayOfTheWeek == 0) {
      let newDate = this.addDays(BroadcastDate, 7);
      if (
        BroadcastDate.getMonth() == newDate.getMonth() &&
        newDate.getDay() == 0
      ) {
        BroadcastDate.setDate(BroadcastDate.getDate() + 7);
      }
    }
    do {
      BroadcastDate.setDate(BroadcastDate.getDate() + 1);
      DayOfTheWeek = BroadcastDate.getDay();
    } while (DayOfTheWeek != 1);
    return BroadcastDate;
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
        this.closeCalender()
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
  generateBoardCastCalender(month: number, syear: number, notifyChange: boolean): void {
    this.nextButtonDisable = false;
    this.previousButtonDisable = false;
    this.monthlyWeeks = [];
    const currentDay: IXgDate = this.xgDatePickerService.getCurrentDay();
    let monthStartIndex: number = this.getMonthStartIndex(syear, month);
    let noOfDaysinCurrentMonth: number = this.xgDatePickerService.daysInMonth(month, syear);
    let noOfDaysinPreviousMonth: number = this.xgDatePickerService.daysInPreviousMonth(month, syear);
    let dayNbr: number = 1;
    let cmo: number = this.prevMonthId;
    let nextMonth: number;
    let year: number;
    // if (syear.toString().length == 2) {
    //   syear = parseInt(`${Math.floor(currentDay.year / 100)}${syear}`, 10)
    //   this.visibleMonth.year = syear;
    //   this.selectedDate.year = syear;
    // }
    if (month == 12) {
      nextMonth = 1;
      year = syear + 1;
    } else {
      nextMonth = month + 1;
      year = syear;
    }
    let nextmonthBroadcastDate: any = this.GetBroadcastStartDate(
      nextMonth,
      year
    );
    let currentMonthBroadcastDate: any = this.GetBroadcastStartDate(month, syear);
    let dif: any = Math.round(
      nextmonthBroadcastDate - currentMonthBroadcastDate
    );
    let weekdifference = Math.round(dif / 1000 / 60 / 60 / 24 / 7);
    if (!this.opts.enableBroadcastCalendar) {
      weekdifference = 7;
    }
    for (let i = 1; i <= weekdifference; i++) {
      let weekDates: Array<IXgCalendarDay> = [];
      if (i === 1) {
        // First week
        let pm = currentMonthBroadcastDate.getDate();
        if (!this.opts.enableBroadcastCalendar) {
          pm = noOfDaysinPreviousMonth - monthStartIndex + 1;
        }
        // Previous month
        if (pm > 23) {
          for (let j = pm; j <= noOfDaysinPreviousMonth; j++) {
            let date: IXgDate = {
              year: month === 1 ? syear - 1 : syear,
              month: month === 1 ? 12 : month - 1,
              day: j
            };
            weekDates.push({
              dateObj: date,
              currDay: this.xgDatePickerService.isCurrentDay(j, month, year, currentDay),
              disabled: !this.xgDatePickerService.isDisabled(date, this.minDate, this.maxDate),
              highlight: false,
              text: '',
              colSpan: 1
            })
          }
        }
        cmo = this.currMonthId;
        let daysLeft: number = 7 - weekDates.length;
        for (let j = 0; j < daysLeft; j++) {
          let date: IXgDate = { year: syear, month: month, day: dayNbr };
          weekDates.push({
            dateObj: date,
            currDay: this.xgDatePickerService.isCurrentDay(dayNbr, month, year, currentDay),
            disabled: !this.xgDatePickerService.isDisabled(date, this.minDate, this.maxDate),
            highlight: false,
            text: '',
            colSpan: 1
          })
          dayNbr++;
        }

      }
      else {
        // Rest of the weeks
        for (let j = 1; j < 8; j++) {
          if (dayNbr > noOfDaysinCurrentMonth) {
            // Next month
            dayNbr = 1;
            cmo = this.nextMonthId;
          }
          let date: IXgDate = {
            year: cmo === this.nextMonthId && month === 12 ? syear + 1 : syear,
            month:
              cmo === this.currMonthId
                ? month
                : cmo === this.nextMonthId && month < 12
                  ? month + 1
                  : 1,
            day: dayNbr
          };
          weekDates.push({
            dateObj: date,
            currDay: this.xgDatePickerService.isCurrentDay(dayNbr, month, year, currentDay),
            disabled: !this.xgDatePickerService.isDisabled(date, this.minDate, this.maxDate),
            highlight: false,
            text: '',
            colSpan: 1
          })
          dayNbr++;
        }
      }
      this.monthlyWeeks.push({ week: weekDates })
    }

    if (notifyChange) {
      this.calenderViewChanged.emit({
        year: syear, month: month,
        first: { number: 1, weekday: this.xgDatePickerService.getWeekday({ year: syear, month: month, day: 1 }) },
        last: { number: noOfDaysinCurrentMonth, weekday: this.xgDatePickerService.getWeekday({ year: syear, month: month, day: noOfDaysinCurrentMonth }) }
      });
    }
  }

  generateCalendar(month: number, year: number, notifyChange: boolean): void {
    if (this.sBoardCastCalenderView) {
      this.generateBoardCastCalender(month, year, notifyChange);
    } else {
      this.nextButtonDisable = false;
      this.previousButtonDisable = false;
      this.monthlyWeeks = [];
      const currentDay: IXgDate = this.xgDatePickerService.getCurrentDay();
      let monthStartIndex: number = this.getMonthStartIndex(year, month);
      let noOfDaysinCurrentMonth: number = this.xgDatePickerService.daysInMonth(month, year);
      let noOfDaysinPreviousMonth: number = this.xgDatePickerService.daysInPreviousMonth(month, year);

      const sMonthName = {
        dateObj: currentDay,
        currDay: false,
        disabled: false,
        highlight: false,
        text: this.visibleMonth.monthTxt,
        colSpan: 1
      }

      let weekDates: Array<IXgCalendarDay> = [];
      if (monthStartIndex < 3) {
        const sMonthToAdd = JSON.parse(JSON.stringify(sMonthName));
        sMonthToAdd['colSpan'] = 7;
        this.monthlyWeeks.unshift({ week: [sMonthToAdd] })
      }
      let bAddText = false;
      for (let startDate = 1; startDate <= noOfDaysinCurrentMonth; startDate++) {
        const date: IXgDate = { year: year, month: month, day: startDate };
        if ((monthStartIndex && monthStartIndex % 7 === 0)) {
          if (!bAddText) {
            const sMonthToAdd = JSON.parse(JSON.stringify(sMonthName));
            sMonthToAdd['colSpan'] = 7 - weekDates.length;
            sMonthToAdd['text'] = this.monthlyWeeks.length ? ' ' : sMonthToAdd['text'];
            weekDates.unshift(sMonthToAdd);
            bAddText = true;
          }
          this.monthlyWeeks.push({ week: weekDates })
          weekDates = [];
        }
        weekDates.push({
          dateObj: date,
          currDay: this.xgDatePickerService.isCurrentDay(startDate, month, year, currentDay),
          disabled: !this.xgDatePickerService.isDisabled(date, this.minDate, this.maxDate),
          highlight: false,
          text: '',
          colSpan: 1
        })
        if (startDate === noOfDaysinCurrentMonth) {
          this.monthlyWeeks.push({ week: weekDates })
        }
        monthStartIndex = monthStartIndex + 1;

      }
      const sNextYear = month === 12 ? year + 1 : year;
      const sPreviousYear = month === 1 ? year - 1 : year;
      const sNextMonth = month === 12 ? 1 : month + 1;
      const sPreviousMonth = month === 1 ? 12 : month - 1;
      const isNextYearDisabled = this.sMaxDate ? !this.xgDatePickerService.isDisabled({ year: sNextYear, month: sNextMonth, day: 1 }, '', this.maxDate) : false;
      const isPreviousYearDisabled = this.sMinDate ? !this.xgDatePickerService.isDisabled({ year: sPreviousYear, month: sPreviousMonth, day: noOfDaysinPreviousMonth }, this.minDate, '') : false

      if (isNextYearDisabled) {
        this.nextButtonDisable = true;
      }
      if (isPreviousYearDisabled) {
        this.previousButtonDisable = true;
      }

      if (notifyChange) {
        this.calenderViewChanged.emit({ year: year, month: month, first: { number: 1, weekday: this.xgDatePickerService.getWeekday({ year: year, month: month, day: 1 }) }, last: { number: noOfDaysinCurrentMonth, weekday: this.xgDatePickerService.getWeekday({ year: year, month: month, day: noOfDaysinCurrentMonth }) } });
      }
    }

  }
  onCellClicked(oDateObject): void {
    this.selectedDate = oDateObject.dateObj;
    this.isValidateDate = true;
    const sFormat = this.xgDatePickerService.formatDate(oDateObject.dateObj, this.sDateFormatter, this.oMonthLabels);
    this.datePickerModelValue = sFormat;
    this.closeCalender();
  }

  onMonthCellClicked(cell: IXgCalendarMonth): void {
    let mc: boolean = cell.monthKey !== this.visibleMonth.monthNbr;
    this.visibleMonth = {
      monthTxt: cell.name,
      monthNbr: cell.monthKey,
      year: this.visibleMonth.year
    };
    this.generateCalendar(cell.monthKey, this.visibleMonth.year, mc);
    this.bMonthView = false;
  }

  onSelectYearClicked(event) {
    event.stopPropagation();
    this.bYearView = !this.bYearView;
    this.bMonthView = false;
    if (this.bYearView) {
      this.generateYears(this.visibleMonth.year);
    }
  }
  onYearCellClicked(cell: IXgCalendarYear): void {
    let yc: boolean = cell.year !== this.visibleMonth.year;
    this.visibleMonth = {
      monthTxt: this.visibleMonth.monthTxt,
      monthNbr: this.visibleMonth.monthNbr,
      year: cell.year
    };
    this.generateCalendar(this.visibleMonth.monthNbr, cell.year, yc);
    this.bYearView = false;
  }


  onPrevYears(event: any, year: number): void {
    event.stopPropagation();
    this.generateYears(year - 25);
  }

  onNextYears(event: any, year: number): void {
    event.stopPropagation();
    this.generateYears(year + 25);
  }
  onYearCellKeyDown(event: any, cell: IXgCalendarYear) {
    if (
      (event.keyCode === KeyCode.enter || event.keyCode === KeyCode.space) &&
      !cell.disabled
    ) {
      event.preventDefault();
      this.onYearCellClicked(cell);
    }
  }
  onNext($event) {
    if (this.bYearView) {
      this.onNextYears($event, this.aYears[0][0].year)
    }
    else {
      let sDate: Date = this.xgDatePickerService.getDate(
        this.visibleMonth.year,
        this.visibleMonth.monthNbr,
        1
      );
      sDate.setMonth(sDate.getMonth() + 1);

      let year: number = sDate.getFullYear();
      let month: number = sDate.getMonth() + 1;

      this.visibleMonth = { monthTxt: this.oMonthLabels[month], monthNbr: month, year: year };
      this.generateCalendar(month, year, true);
    }

  }
  onPrev($event) {
    if (this.bYearView) {
      this.onPrevYears($event, this.aYears[0][0].year)
    }
    else {
      let sDate: Date = this.xgDatePickerService.getDate(
        this.visibleMonth.year,
        this.visibleMonth.monthNbr,
        1
      );
      sDate.setMonth(sDate.getMonth() - 1);

      let year: number = sDate.getFullYear();
      let month: number = sDate.getMonth() + 1;

      this.visibleMonth = { monthTxt: this.oMonthLabels[month], monthNbr: month, year: year };
      this.generateCalendar(month, year, true);
    }
  }
  onSelectMonthClicked(event: any): void {
    event.stopPropagation();
    this.bMonthView = !this.bMonthView;
    this.bYearView = false;
    if (this.bMonthView) {
      let currentDay: IXgDate = this.xgDatePickerService.getCurrentDay();
      this.aMonths = [];
      for (let startMonth = 1; startMonth <= 12; startMonth += 3) {
        let row: Array<IXgCalendarMonth> = [];
        for (let j = startMonth; j < startMonth + 3; j++) {
          let disabled: boolean = false;
          row.push({
            monthKey: j,
            name: this.oMonthLabels[j],
            currMonth:
              j === currentDay.month && this.visibleMonth.year === currentDay.year,
            selected: j === this.visibleMonth.monthNbr,
            disabled: !this.xgDatePickerService.isDisabled({ year: currentDay.year, month: j, day: 1 }, this.sMinDate, this.sMaxDate)
          });
        }
        this.aMonths.push(row);
      }
    }
  }

  generateYears(year: number): void {
    this.aYears = [];
    // let isDisabledAnyNumber = false;
    let sFirstYear = year;
    let sLastYear = year;
    const currentDate: IXgDate = this.xgDatePickerService.getCurrentDay();
    for (let startYear = year; startYear <= 20 + year; startYear += 5) {
      let row: Array<IXgCalendarYear> = [];
      for (let sYear = startYear; sYear < startYear + 5; sYear++) {
        sLastYear = sLastYear + 1;
        const sDate: IXgDate = { year: sYear, month: this.visibleMonth.monthNbr, day: 1 }
        // if (!isDisabledAnyNumber && !this.xgDatePickerService.isDisabled(sDate, this.minDate, this.sMaxDate)) {
        //   isDisabledAnyNumber = true;
        // }
        row.push({
          year: sYear,
          currYear: sYear === currentDate.year,
          selected: sYear === this.visibleMonth.year,
          disabled: !this.xgDatePickerService.isDisabled(sDate, this.minDate, this.sMaxDate)
        });
      }
      this.aYears.push(row);
    }
    const lastYear = sLastYear; //this.aYears.slice(-1)[this.aYears.length - 1]['year'];
    const firstYear = sFirstYear;
    const isNextYearDisabled = this.sMaxDate ? !this.xgDatePickerService.isDisabled({ year: lastYear + 1, month: this.visibleMonth.monthNbr, day: 1 }, '', this.maxDate) : false;
    const isPreviousYearDisabled = this.sMinDate ? !this.xgDatePickerService.isDisabled({ year: firstYear - 1, month: this.visibleMonth.monthNbr, day: 1 }, this.minDate, '') : false

    if (isNextYearDisabled) {
      this.nextButtonDisable = true;
    }
    if (isPreviousYearDisabled) {
      this.previousButtonDisable = true;
    }
  }


  parseSelectedDate(selectionDate: any, sFormatter): IXgDate {
    // Parse date value - it can be string or IMyDate object
    let date: IXgDate = { day: 0, month: 0, year: 0 };
    let convertedYear = 0;
    let convertedDay = 0;
    const currentDay: IXgDate = this.xgDatePickerService.getCurrentDay();
    if (typeof selectionDate === "string") {
      let sSelectionDate: string = <string>selectionDate;
      const dateFormatter: string = sFormatter;

      const delimeters: Array<string> = this.xgDatePickerService.getDateFormatDelimeters(
        dateFormatter
      );
      let dateValue: Array<IXgDateFormat> = this.xgDatePickerService.getDateValue(
        sSelectionDate,
        dateFormatter,
        delimeters
      );
      if (sFormatter.indexOf(this.datePickerConstants.constants['formatConst']['YYYY']) === -1 && dateValue[0].value.length === 2) {
        convertedYear = parseInt(`${Math.floor(currentDay.year / 100)}${dateValue[0].value}`, 10)
      }
      if (sFormatter.indexOf(this.datePickerConstants.constants['formatConst']['dd']) === -1 && dateValue[2].value.length === 2) {
        convertedDay = parseInt(`${Math.floor(currentDay.day / 100)}${dateValue[2].value}`, 10)
      }
      date.year = convertedYear || this.xgDatePickerService.getNumberByValue(dateValue[0]);
      date.month =
        dateFormatter.indexOf(this.datePickerConstants.constants['formatConst']['MMM']) !== -1
          ? this.xgDatePickerService.getMonthNumberByMonthName(
            dateValue[1],
            this.oMonthLabels
          )
          : this.xgDatePickerService.getNumberByValue(dateValue[1]);
      date.day = convertedDay || this.xgDatePickerService.getNumberByValue(dateValue[2]);
    } else if (typeof selectionDate === "object") {
      date = selectionDate;
    }
    return date;
  }
  onBlurInput($event: any): void {
    if (this.isValidateDate) {
      this.datePickerModelValue = this.xgDatePickerService.formatDate(this.selectedDate, this.sDateFormatter, this.oMonthLabels)
    }
    if (this.onBlur.observers && this.onBlur.observers.length) {
      this.onBlur.emit($event);
    }
    this.onTouchedDatePicker();
  }
  onFocusInput($event: any): void {
    if (this.onFocus.observers && this.onFocus.observers.length) {
      this.onFocus.emit($event);
    }
  }

  writeValue(sValue) {
    if (sValue) {
      if (this.xgDatePickerService.isValidDate(sValue)) {
        this.selectedDate = this.xgDatePickerService.convertToXgDate(new Date(sValue));
      }
      else if (typeof sValue === 'string') {
        this.selectedDate = this.parseSelectedDate(sValue, this.sDateFormatter)
      }
    }
    else {
      this.selectedDate = { year: 0, month: 0, day: 0 };
    }
    this.sDatePickerValue = this.selectedDate.year !== 0 ? this.xgDatePickerService.formatDate(this.selectedDate, this.sDateFormatter, this.oMonthLabels) : '';
    this.datePickerModelValue = this.sDatePickerValue;
  }
  closeCalender() {
    this.showCalender = false;
    this.closeCalendarView('Closed');
    this.inputElement.nativeElement.blur();
  }
  onModelChange($event) {
    this.isValidateDate = false;
    if (this.showCalender) {
      this.closeCalender();
    }
    if (this.xgDatePickerService.validateDate($event, this.sDateFormatter, this.oMonthLabels)) {
      const selectedDate: IXgDate = this.parseSelectedDate($event, this.sDateFormatter);
      this.selectedDate = selectedDate;
      this.isValidateDate = true;
      // if (this.datePickerModelValue == this.xgDatePickerService.formatDate(selectedDate, this.sDateFormatter, this.oMonthLabels)) {
      //   this.inputElement.nativeElement.value = this.xgDatePickerService.formatDate(selectedDate, this.sDateFormatter, this.oMonthLabels);
      // }
      // else {
      //   this.datePickerModelValue = this.xgDatePickerService.formatDate(selectedDate, this.sDateFormatter, this.oMonthLabels)

      // }
      //  this.datePickerModelValue = this.xgDatePickerService.formatDate(selectedDate, this.sDateFormatter, this.oMonthLabels);
    }
    else {
      this.datePickerModelValue = $event;
    }
  }
  registerOnChange(fn: (_: any) => void): void { this.onChangeDatePicker = fn; }
  registerOnTouched(fn: () => void): void { this.onTouchedDatePicker = fn; }
}
@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [XgDatePickerComponent, SharedModule, DateValidator],
  declarations: [XgDatePickerComponent, DateValidator],
  providers: [XgDatePickerService]
})
export class XgDatePickerComponentModule { }