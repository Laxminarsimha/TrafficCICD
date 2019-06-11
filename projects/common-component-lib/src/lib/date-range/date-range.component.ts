import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
  Input,
  forwardRef
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormBuilder } from "@angular/forms";
import { FormControl } from "@angular/forms";
import * as _moment from "moment";
const moment = _moment;
import * as _ from "lodash";
import { isNull } from "util";
import { FormGroup } from "@angular/forms";
import { faPencilAlt, faCalendarAlt } from "@fortawesome/free-solid-svg-icons";

enum SideEnum {
  left = "left",
  right = "right"
}

@Component({
  selector: "app-date-range",
  templateUrl: "./date-range.component.html",
  styleUrls: ["./date-range.component.scss"]
})
export class DateRangeComponent implements OnInit {
  list1: any[];
  list2: any[];
  faPencilAlt = faPencilAlt;
  faCalendarAlt = faCalendarAlt;
  private _old: { start: any; end: any } = { start: null, end: null };
  chosenLabel: string;
  calendarVariables: { left: any; right: any } = { left: {}, right: {} };
  daterangepicker: { start: FormControl; end: FormControl } = {
    start: new FormControl(),
    end: new FormControl()
  };
  applyBtn: { disabled: boolean } = { disabled: false };
  startDate = moment().startOf("day");
  endDate = moment().endOf("day");
  dateLimit = null;
  dateInvalid: boolean = false;
  buttonDisableStatus: boolean = false;
  errorMsg: any;
  customemaxlength: any;
  @Input() width = 500;
  @Input() minDate: _moment.Moment = null;
  @Input() maxDate: _moment.Moment = null;
  @Input() autoApply: Boolean = false;
  @Input() singleDatePicker: Boolean = false;
  @Input() showDropdowns: Boolean = false;
  @Input() showWeekNumbers: Boolean = false;
  @Input() showISOWeekNumbers: Boolean = false;
  @Input() linkedCalendars: Boolean = false;
  @Input() autoUpdateInput: Boolean = true;
  @Input() alwaysShowCalendars: Boolean = false;
  @Input() maxSpan: Boolean = false;
  @Input() timePicker: Boolean = false;
  @Input() showClearButton: Boolean = false;
  @Input() firstMonthDayClass: string = null;
  @Input() lastMonthDayClass: string = null;
  @Input() emptyWeekRowClass: string = null;
  @Input() firstDayOfNextMonthClass: string = null;
  @Input() lastDayOfPreviousMonthClass: string = null;
  @Input() readOnlyInput: Boolean = true;
  @Input() dateRangeLabel: string = "Date";
  @Input() disabledInput: Boolean = false;
  @Input() showSwapCalendar: boolean = false; // parameter to swap calendars
  @Input() customStartDate: any = null;
  @Input() customEndDate: any = null;
  @Input() clearStartEndDates: boolean = false;
  @Input() startTimeLabel: String = "Time";
  @Input() endTimeLabel: String = "End Time";
  @Input() public tabIndex: number = 0;
  @Input() dynamicFormControlName: string;
  @Input() locale: any = {
    direction: "ltr",
    format: moment.localeData().longDateFormat("L"),
    separator: "-",
    weekLabel: "W",
    applyLabel: "Ok",
    cancelLabel: "Cancel",
    customRangeLabel: "Custom range",
    daysOfWeek: moment.weekdaysMin(),
    monthNames: moment.monthsShort(),
    firstDay: moment.localeData().firstDayOfWeek(),
    showDefaultDate: true,
    displayValueFromGrid: false,
    datePickerId: "",
    type: "",
    isRequired: false, // to identify the component is requied or not
    
  };
  // custom ranges
  @Input()
  ranges: any = {};
  @Input()
  showCustomRangeLabel: boolean;
  @Input()
  keepCalendarOpeningWithRange: boolean = false;
  @Input()
  showRangeLabelOnInput: boolean = false;
  chosenRange: string;
  rangesArray: Array<any> = [];
  maskDateTime: Array<any>;
  maskTime: Array<string | RegExp> = [
    /[0-2]/,
    /\d/,
    ":",
    /[0-5]/,
    /\d/,
    ":",
    /[0-5]/,
    /\d/
  ];
  // some state information
  isShown: Boolean = true;
  inline: boolean = true;
  leftCalendar: any = {};
  rightCalendar: any = {};
  showCalInRanges: Boolean = false;
  // Calendar View status
  @Input() CalendarStatus: Boolean = false;
  @Input() flexiDateRangeStatus: Boolean = false;
  initialLoad: any = true;
  calendarTime: any;
  timeLeft: any = "00:00:00";
  @Input() timeRight: any = "23:59:59";
  time: any;
  timeSide: any = "left";
  valid: boolean = true;
  defaultLeftVal: any;
  defaultRightVal: any;
  onlySingleDatePicker: boolean = false;
  singleDateTimePicker: boolean = false;
  dateRangePicker: boolean = false;
  dateTimeRangePicker: boolean = false;
  options: any = {}; // should get some opt from user
  @Output("choosedDate") choosedDate: EventEmitter<Object>;
  @Output("rangeClicked") rangeClicked: EventEmitter<Object>;
  @Output("datesUpdated") datesUpdated: EventEmitter<Object>;
  @Output("defaultDates") defaultDates: EventEmitter<Object>;
  @Output("chkIsDateValidEmitter") chkIsDateValidEmitter: EventEmitter<object>;
  @ViewChild("pickerContainer") pickerContainer: ElementRef;
  // Second calendar left arrow status
  rightCalendarPrev: boolean = true;
  CalendarStatusOnPrev: boolean;
  swapCalendarLabel: string = "Broadcast";
  clearDateLabel: string = "Clear Dates";
  @ViewChild("datepickerInput") dateTimeEl: ElementRef;
  @Input() calendarOnTop: boolean;
  ElTop: any;
  dateFromGrid: any;
  @Input()
  public set setDateTimeFromGrid(value: any) {
    this.dateFromGrid = value;
    if (!_.isNull(this.dateFromGrid) && 11 < this.dateFromGrid.length) {
      let tempDate = moment(this.dateFromGrid).format("MM/DD/YYYY HH:mm:ss");
      if (tempDate != "Invalid date") {
        this.updateSelectedDateTime(tempDate);
      }
    } else {
      let tempDate = moment(this.dateFromGrid).format("MM/DD/YYYY");
      if (tempDate != "Invalid date") {
        this.updateSelectedDate(tempDate);
      }
    }
  }
  constructor(private el: ElementRef, private fb:FormBuilder) {
    this.choosedDate = new EventEmitter();
    this.rangeClicked = new EventEmitter();
    this.datesUpdated = new EventEmitter();
    this.defaultDates = new EventEmitter();
    this.chkIsDateValidEmitter = new EventEmitter();
    this.updateMonthsInView();
  }
  preStartDate: string;
  preEndDate: string;
  preLefttime: string;
  preRightTime: string;
  ngOnInit() {
    this.list1 = [];//initialize list 1
    this.list2 = [];//initialize list 2

    // Emit the form group to the father to do whatever it wishes
    
    // @FIXME: make this code common as we are using same condition below in prepareMaskingForDateRange()
    if (this.singleDatePicker == true && this.timePicker == false) {
      this.customemaxlength = "10";
      // this.chosenLabel= moment().toString();
    } else if (this.singleDatePicker == false && this.timePicker == false) {
      this.customemaxlength = "21";
      // this.chosenLabel= moment().toString()+"-"+moment().toString();
    } else if (this.singleDatePicker == false && this.timePicker == true) {
      this.startTimeLabel = "Start Time";
      this.customemaxlength = "39";
      // this.chosenLabel= moment().toString()+" 00:00:00-"+moment().toString()+" 23:59:59";
    } else if (this.singleDatePicker == true && this.timePicker == true) {
      this.startTimeLabel = "Time";
      this.customemaxlength = "19";
      // this.chosenLabel= moment().toString()+" 00:00:00";
    }
    this.defaultLeftVal = "00:00:00";
    this.defaultRightVal = "23:59:59";
    //set swap calendar label
    if (this.locale.firstDay == 1) {
      this.swapCalendarLabel = "Gregorian";
    } else {
      this.swapCalendarLabel = "Broadcast";
    }
    // for the case of custom date range directive enherited from this date range directive
    if (this.customStartDate) {
      this.startDate = this.customStartDate;
      this.endDate = null;
      this.updateMonthsInView();
    } else if (this.customEndDate) {
      this.startDate = this.customEndDate;
      this.endDate = null;
      this.updateMonthsInView();
    }
    //-----------------------------------------------------------
    if (this.timePicker) {
      let modifiedFormat = this.locale.format + " HH:mm:ss";
      this.locale.format = modifiedFormat;
    }
    if (this.locale.firstDay != 0) {
      var iterator = this.locale.firstDay;
      while (iterator > 0) {
        this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
        iterator--;
      }
    }
    if (this.inline) {
      this._old.start = !_.isNull(this.startDate)
        ? this.startDate.clone()
        : null;
      this._old.end = !_.isNull(this.endDate) ? this.endDate.clone() : null;
    }
    this.renderCalendar(SideEnum.left);
    this.renderCalendar(SideEnum.right);
    this.renderRanges();
    this.calculateChosenLabel();
    this.emitDefaultDates();
    this.prepareMaskingForDateRange();
  }
  clearStart() {
    this.startDate = null;
    this.updateView();
    this.updateElement();
  }
  clearEnd() {
    this.endDate = null;
    this.updateView();
    this.updateElement();
  }
  // Function to swap broadcast calendar to gregorian and vice-versa
  onClickSwapCalanders() {
    if (this.locale.firstDay == 1) {
      this.swapCalendarLabel = "Broadcast";
      this.locale.firstDay = 0;
      this.showWeekNumbers = false;
      this.locale.daysOfWeek = moment.weekdaysMin();
    } else {
      this.swapCalendarLabel = "Gregorian";
      this.locale.firstDay = 1;
      this.showWeekNumbers = true;
      if (this.locale.firstDay != 0) {
        var iterator = this.locale.firstDay;
        while (iterator > 0) {
          this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift());
          iterator--;
        }
      }
    }
    this.updateView();
    this.updateElement();
  }
  ngModelChange(e) {
    // Model change event
  }
  getMask(): {
    mask: Array<string | RegExp>;
    keepCharPositions: boolean;
  } {
    return {
      mask: [
        /[0-2]/,
        this.time && parseInt(this.time[0]) > 1 ? /[0-3]/ : /\d/,
        ":",
        /[0-5]/,
        /\d/,
        ":",
        /[0-5]/,
        /\d/
      ],
      keepCharPositions: true
    };
  }
  setTime(e, side): void {
    this.time = e.target.value;
    this.timeSide = side;
    // if(this.time =='' && side == "left"){
    //   this.timeLeft="00:00:00";
    // }
    // if(this.time !='' && side == "left"){
    //   this.timeLeft = e.target.value;
    // }
    // if(this.time =='' && side == "right"){
    //   this.timeLeft="23:59:59";
    // }
    // if(this.time !='' && side == "right"){
    //   this.timeRight = e.target.value;
    // }
    if (side == "left") {
      this.timeLeft = e.target.value;
    }
    if (side == "right") {
      this.timeRight = e.target.value;
    }
  }
  textInput(e) {
    var inputDate = e.target.value;
    var strValidation = inputDate.search(/[a-z]/i);
    if (strValidation >= 0) {
      this.dateInvalid = true;
      this.chosenLabel = e.target.value;
      e.target.value = null;
    } else {
      this.dateInvalid = false;
    }
  }
  calanderChange(e) {
    // Calander change event
  }
  clearDates() {
    this.startDate = null;
    this.endDate = null;
    this.updateElement();
    //this.choosedDate.emit({chosenLabel: '', startDate: this.startDate, endDate: this.endDate});
  }
  onClickCearDates() {
    this.startDate = null;
    this.endDate = null;
    this.updateElement();
    this.choosedDate.emit({
      chosenLabel: "",
      startDate: this.startDate,
      endDate: this.endDate
    });
  }
  renderRanges() {
    let start, end;
    if (typeof this.ranges === "object") {
      for (const range in this.ranges) {
        if (typeof this.ranges[range][0] === "string") {
          start = moment(this.ranges[range][0], this.locale.format);
        } else {
          start = moment(this.ranges[range][0]);
        }
        if (typeof this.ranges[range][1] === "string") {
          end = moment(this.ranges[range][1], this.locale.format);
        } else {
          end = moment(this.ranges[range][1]);
        }
        // If the start or end date exceed those allowed by the minDate or maxSpan
        // options, shorten the range to the allowable period.
        if (this.minDate && start.isBefore(this.minDate)) {
          start = this.minDate.clone();
        }
        var maxDate = this.maxDate;
        if (
          this.maxSpan &&
          maxDate &&
          start
            .clone()
            .add(this.maxSpan)
            .isAfter(maxDate)
        ) {
          maxDate = start.clone().add(this.maxSpan);
        }
        if (maxDate && end.isAfter(maxDate)) {
          end = maxDate.clone();
        }
        // If the end of the range is before the minimum or the start of the range is
        // after the maximum, don't display this range option at all.
        if (
          (this.minDate &&
            end.isBefore(this.minDate, this.timePicker ? "minute" : "day")) ||
          (maxDate &&
            start.isAfter(maxDate, this.timePicker ? "minute" : "day"))
        ) {
          continue;
        }
        //Support unicode chars in the range names.
        var elem = document.createElement("textarea");
        elem.innerHTML = range;
        var rangeHtml = elem.value;
        this.ranges[rangeHtml] = [start, end];
      }
      for (const range in this.ranges) {
        this.rangesArray.push(range);
      }
      if (this.showCustomRangeLabel) {
        this.rangesArray.push(this.locale.customRangeLabel);
      }
      this.showCalInRanges =
        !this.rangesArray.length || this.alwaysShowCalendars;
    }
  }
  renderCalendar(side) {
    // site enum
    const latestYear = new Date().getFullYear();
      let mainCalendar: any =
      side === SideEnum.left ? this.leftCalendar : this.rightCalendar;
    const month = mainCalendar.month.month();
    const year = mainCalendar.month.year();
    const hour = mainCalendar.month.hour();
    const minute = mainCalendar.month.minute();
    const second = mainCalendar.month.second();
    const daysInMonth = moment([year, month]).daysInMonth();
    const firstDay = moment([year, month, 1]);
    const lastDay = moment([year, month, daysInMonth]);
    const lastMonth = moment(firstDay)
      .subtract(1, "month")
      .month();
    const lastYear = moment(firstDay)
      .subtract(1, "month")
      .year();
    const daysInLastMonth = moment([lastYear, lastMonth]).daysInMonth();
    const dayOfWeek = firstDay.day();
    // initialize a 6 rows x 7 columns array for the calendar
    let calendar: any = [];
    calendar.firstDay = firstDay;
    calendar.lastDay = lastDay;

    for (let i = 0; i < 6; i++) {
      calendar[i] = [];
    }
    // populate the calendar with date objects
    let startDay = daysInLastMonth - dayOfWeek + this.locale.firstDay + 1;
    if (startDay > daysInLastMonth) {
      startDay -= 7;
    }
    if (dayOfWeek === this.locale.firstDay) {
      startDay = daysInLastMonth - 6;
    }
    let curDate = moment([lastYear, lastMonth, startDay, 12, minute, second]);
    for (
      let i = 0, col = 0, row = 0;
      i < 42;
      i++, col++, curDate = moment(curDate).add(24, "hour")
    ) {
      if (i > 0 && col % 7 === 0) {
        col = 0;
        row++;
      }
      calendar[row][col] = curDate
        .clone()
        .hour(hour)
        .minute(minute)
        .second(second);
      curDate.hour(12);
      if (
        this.minDate &&
        calendar[row][col].format("YYYY-MM-DD") ===
          this.minDate.format("YYYY-MM-DD") &&
        calendar[row][col].isBefore(this.minDate) &&
        side === "left"
      ) {
        calendar[row][col] = this.minDate.clone();
      }
      if (
        this.maxDate &&
        calendar[row][col].format("YYYY-MM-DD") ===
          this.maxDate.format("YYYY-MM-DD") &&
        calendar[row][col].isAfter(this.maxDate) &&
        side === "right"
      ) {
        calendar[row][col] = this.maxDate.clone();
      }
      if (
        !this.singleDatePicker &&
        this.maxDate &&
        calendar[row][col].format("YYYY-MM-DD") ===
          this.maxDate.format("YYYY-MM-DD") &&
        side === "left"
      ) {
        // use previous calendars
        this.leftCalendar.month.subtract(1, "month");
      }
    }
    // make the calendar object available to hoverDate/clickDate
    if (side === SideEnum.left) {
      this.leftCalendar.calendar = calendar;
    } else {
      this.rightCalendar.calendar = calendar;
    }
    // Display the calendar
    const minDate = side === "left" ? this.minDate : this.startDate;
    let maxDate = this.maxDate;
    const selected = side === "left" ? this.startDate : this.endDate;
    this.calendarVariables[side] = {
      month: month,
      year: year,
      hour: hour,
      minute: minute,
      second: second,
      daysInMonth: daysInMonth,
      firstDay: firstDay,
      lastDay: lastDay,
      lastMonth: lastMonth,
      lastYear: lastYear,
      daysInLastMonth: daysInLastMonth,
      dayOfWeek: dayOfWeek,
      // other vars
      calRows: Array.from(Array(6).keys()),
      calCols: Array.from(Array(7).keys()),
      classes: {},
      minDate: minDate,
      maxDate: maxDate,
      calendar: calendar
    };
    if (this.showDropdowns) {
      const currentMonth = calendar[1][1].month();
      const currentYear = calendar[1][1].year();
       //const maxYear = (maxDate && maxDate.year()) || latestYear;
      const maxYear = (maxDate && maxDate.year()) || currentYear + 15;
      const minYear = (minDate && minDate.year()) || currentYear - 50;
      const inMinYear = currentYear === minYear;
      const inMaxYear = currentYear === maxYear;
      const years = [];
      for (var y = minYear; y <= maxYear; y++) {
        years.push(y);
      }
      this.calendarVariables[side].dropdowns = {
        currentMonth: currentMonth,
        currentYear: currentYear,
        maxYear: maxYear,
        minYear: minYear,
        inMinYear: inMinYear,
        inMaxYear: inMaxYear,
        monthArrays: Array.from(Array(12).keys()),
        yearArrays: years
      };
    }
    // adjust maxDate to reflect the dateLimit setting in order to
    // grey out end dates beyond the dateLimit
    if (this.endDate === null && this.dateLimit) {
      const maxLimit = this.startDate
        .clone()
        .add(this.dateLimit)
        .endOf("day");
      if (!maxDate || maxLimit.isBefore(maxDate)) {
        maxDate = maxLimit;
      }
    }
    for (let row = 0; row < 6; row++) {
      this.calendarVariables[side].classes[row] = {};
      const rowClasses = [];
      if (
        this.emptyWeekRowClass &&
        !this.hasCurrentMonthDays(month, calendar[row])
      ) {
        rowClasses.push(this.emptyWeekRowClass);
      }
      for (let col = 0; col < 7; col++) {
        const classes = [];
        // highlight today's date
        if (calendar[row][col].isSame(new Date(), "day")) {
          classes.push("today");
        }
        // highlight weekends
        if (calendar[row][col].isoWeekday() > 5) {
          classes.push("weekend");
          if (this.locale.firstDay == 1) {
            // const indexVal=classes.indexOf("weekend_broadcast");
            // classes.splice(indexVal,1);
            /**To highlight background color of weenend */
            classes.push("weekend_gregorian");
          } else {
            classes.push("weekend_broadcast");
          }
        }
        // grey out the dates in other months displayed at beginning and end of this calendar
        if (calendar[row][col].month() !== calendar[1][1].month()) {
          classes.push("off");
          if (this.locale.firstDay == 1) {
            classes.push("off_gregorian");
          } else {
            classes.push("off_broadcast");
          }
          // mark the last day of the previous month in this calendar
          if (
            this.lastDayOfPreviousMonthClass &&
            (calendar[row][col].month() < calendar[1][1].month() ||
              calendar[1][1].month() === 0) &&
            calendar[row][col].date() === daysInLastMonth
          ) {
            classes.push(this.lastDayOfPreviousMonthClass);
          }
          // mark the first day of the next month in this calendar
          if (
            this.firstDayOfNextMonthClass &&
            (calendar[row][col].month() > calendar[1][1].month() ||
              calendar[row][col].month() === 0) &&
            calendar[row][col].date() === 1
          ) {
            classes.push(this.firstDayOfNextMonthClass);
          }
        }
        // mark the first day of the current month with a custom class
        if (
          this.firstMonthDayClass &&
          calendar[row][col].month() === calendar[1][1].month() &&
          calendar[row][col].date() === calendar.firstDay.date()
        ) {
          classes.push(this.firstMonthDayClass);
        }
        // mark the last day of the current month with a custom class
        if (
          this.lastMonthDayClass &&
          calendar[row][col].month() === calendar[1][1].month() &&
          calendar[row][col].date() === calendar.lastDay.date()
        ) {
          classes.push(this.lastMonthDayClass);
        }
        // don't allow selection of dates before the minimum date
        if (this.minDate && calendar[row][col].isBefore(this.minDate, "day")) {
          classes.push("off", "disabled");
        }
        // don't allow selection of dates after the maximum date
        if (maxDate && calendar[row][col].isAfter(maxDate, "day")) {
          classes.push("off", "disabled");
        }
        // don't allow selection of date if a custom function decides it's invalid
        if (this.isInvalidDate(calendar[row][col])) {
          classes.push("off", "disabled");
        }
        // highlight the currently selected start date
        if (
          this.startDate &&
          calendar[row][col].format("YYYY-MM-DD") ===
            this.startDate.format("YYYY-MM-DD")
        ) {
          classes.push("active", "start-date");
        }
        // highlight the currently selected end date
        if (
          this.endDate != null &&
          calendar[row][col].format("YYYY-MM-DD") ===
            this.endDate.format("YYYY-MM-DD")
        ) {
          classes.push("active", "end-date");
        }
        // highlight dates in-between the selected dates
        if ( (this.startDate == null && calendar[row][col] < this.endDate) || (this.endDate == null && calendar[row][col] > this.startDate) || (calendar[row][col] > this.startDate && calendar[row][col] < this.endDate) ) {
          classes.push("in-range");
        }
        // apply custom classes for this date
        const isCustom = this.isCustomDate(calendar[row][col]);
        if (isCustom !== false) {
          if (typeof isCustom === "string") {
            classes.push(isCustom);
          } else {
            Array.prototype.push.apply(classes, isCustom);
          }
        }
        // store classes var
        let cname = "",
          disabled = false;
        for (let i = 0; i < classes.length; i++) {
          cname += classes[i] + " ";
          if (classes[i] === "disabled") {
            disabled = true;
          }
        }
        if (!disabled) {
          cname += "available";
        }
        this.calendarVariables[side].classes[row][col] = cname.replace(
          /^\s+|\s+$/g,
          ""
        );
      }
      this.calendarVariables[side].classes[row].classList = rowClasses.join(
        " "
      );
    }
    this.disableRightCalendarPrev();
  }
  // Methods for show calendar and hide calendar
  hideCalendar() {
    /* if (this.CalendarStatusOnPrev) {
             this.showCalendar();
         } else {
             this.CalendarStatus = false;
         }*/
    this.CalendarStatus = false;
  }
  showCalendar() {
    var type = this.locale.type;
    if (type == "1" || type == "2") {
      this.clearDateLabel = "Clear Date";
      this.startTimeLabel = "Time";
    }
    if (type == "3" || type == "4") {
      this.clearDateLabel = "Clear Dates";
      this.startTimeLabel = "Start Time";
    }
    if (this.timeLeft == "") {
      this.timeLeft = "00:00:00";
    }
    if (this.timeRight == "") {
      this.timeLeft = "23:59:59";
    }
    this.CalendarStatus = true;
    this.calendarPosition();
  }
  // Methods for show calendar and hide calendar
  disableRightCalendarPrev() {
    if (
      this.calendarVariables.left.month ===
        this.calendarVariables.right.month - 1 ||
      (this.calendarVariables.right.month === 0 &&
        this.calendarVariables.left.month === 11)
    ) {
      this.rightCalendarPrev = false;
    } else {
      this.rightCalendarPrev = true;
    }
  }
  setStartDate(startDate) {
    if (typeof startDate === "string") {
      this.startDate = moment(startDate, this.locale.format);
    }
    if (typeof startDate === "object") {
      this.startDate = moment(startDate);
    }
    this.startDate = this.startDate.startOf("day");
    if (this.minDate && this.startDate.isBefore(this.minDate)) {
      this.startDate = this.minDate.clone();
    }
    if (this.maxDate && this.startDate.isAfter(this.maxDate)) {
      this.startDate = this.maxDate.clone();
    }
    this.updateElement();
    if (!this.isShown) {
      this.updateElement();
    }
    this.updateMonthsInView();
    this.datesUpdated.emit({
      startDate: this.startDate,
      endDate: this.endDate
    });
  }
  setEndDate(endDate) {
    if (typeof endDate === "string") {
      this.endDate = moment(endDate, this.locale.format);
    }
    if (typeof endDate === "object") {
      this.endDate = moment(endDate);
    }
    this.endDate = this.endDate
      .add(1, "d")
      .startOf("day")
      .subtract(1, "second");
    if (this.endDate.isBefore(this.startDate)) {
      this.endDate = this.startDate.clone();
    }
    if (this.maxDate && this.endDate.isAfter(this.maxDate)) {
      this.endDate = this.maxDate.clone();
    }
    if (
      this.dateLimit &&
      this.startDate
        .clone()
        .add(this.dateLimit)
        .isBefore(this.endDate)
    ) {
      this.endDate = this.startDate.clone().add(this.dateLimit);
    }
    if (!this.isShown) {
      // this.updateElement();
    }
    this.updateMonthsInView();
    this.datesUpdated.emit({
      startDate: this.startDate,
      endDate: this.endDate
    });
  }
  @Input()
  isInvalidDate(date) {
    return false;
  }
  isCustomDate(date) {
    return false;
  }
  updateView() {
    this.updateMonthsInView();
    this.updateCalendars();
  }
  // Update Months of view
  updateMonthsInView() {
    if (this.endDate) {
      // if both dates are visible already, do nothing
      if (
        !this.singleDatePicker &&
        this.leftCalendar.month &&
        this.rightCalendar.month &&
        ((this.startDate &&
          this.leftCalendar &&
          this.startDate.format("YYYY-MM") ===
            this.leftCalendar.month.format("YYYY-MM")) ||
          (this.startDate &&
            this.rightCalendar &&
            this.startDate.format("YYYY-MM") ===
              this.rightCalendar.month.format("YYYY-MM"))) &&
        (this.endDate.format("YYYY-MM") ===
          this.leftCalendar.month.format("YYYY-MM") ||
          this.endDate.format("YYYY-MM") ===
            this.rightCalendar.month.format("YYYY-MM"))
      ) {
        return;
      }
      if (this.startDate) {
        this.leftCalendar.month = this.startDate.clone().date(2);
        if (
          !this.linkedCalendars &&
          (this.endDate.month() !== this.startDate.month() ||
            this.endDate.year() !== this.startDate.year())
        ) {
          this.rightCalendar.month = this.endDate.clone().date(2);
        } else {
          this.rightCalendar.month = this.startDate
            .clone()
            .date(2)
            .add(1, "month");
        }
      }
    } else if (!_.isNull(this.startDate)) {
      if (
        this.leftCalendar.month.format("YYYY") >=
        this.rightCalendar.month.format("YYYY")
      ) {
        this.leftCalendar.month = this.startDate.clone().date(2);
        this.rightCalendar.month = this.startDate
          .clone()
          .date(2)
          .add(1, "month");
      }
      if (
        this.leftCalendar.month.format("MM") >=
        this.rightCalendar.month.format("MM")
      ) {
        this.leftCalendar.month = this.startDate.clone().date(2);
        this.rightCalendar.month = this.startDate
          .clone()
          .date(2)
          .add(1, "month");
      }
    }
    if (
      this.maxDate &&
      this.linkedCalendars &&
      !this.singleDatePicker &&
      this.rightCalendar.month > this.maxDate
    ) {
      this.rightCalendar.month = this.maxDate.clone().date(2);
      this.leftCalendar.month = this.maxDate
        .clone()
        .date(2)
        .subtract(1, "month");
    }
  }
  // This is responsible for updating the calendars
  updateCalendars() {
    this.renderCalendar(SideEnum.left);
    this.renderCalendar(SideEnum.right);
    if (this.endDate === null) {
      return;
    }
    this.calculateChosenLabel();
    this.disableRightCalendarPrev();
  }
  updateElement() {
    this.locale.separator = this.locale.separator.trim();
    if (_.isNull(this.startDate) && _.isNull(this.endDate)) {
      this.chosenLabel = "";
      this.hideCalendar();
      return;
    } else if (_.isNull(this.startDate) && !_.isNull(this.endDate)) {
      //this.startDate = this.endDate.clone();
    }
    if (this.initialLoad) {
      this.chosenLabel = this.startDate.format(this.locale.format);
      if (this.singleDatePicker == true && this.timePicker == false) {
        this.customemaxlength = "10";
        this.chosenLabel = moment()
          .format("MM/DD/YYYY")
          .toString();
      } else if (this.singleDatePicker == false && this.timePicker == false) {
        this.customemaxlength = "21";
        this.chosenLabel =
          moment()
            .format("MM/DD/YYYY")
            .toString() +
          "-" +
          moment()
            .format("MM/DD/YYYY")
            .toString();
      } else if (this.singleDatePicker == false && this.timePicker == true) {
        this.customemaxlength = "39";
        this.chosenLabel =
          moment()
            .format("MM/DD/YYYY")
            .toString() +
          " 00:00:00-" +
          moment()
            .format("MM/DD/YYYY")
            .toString() + " "+
          this.timeRight;
      } else if (this.singleDatePicker == true && this.timePicker == true) {
        this.customemaxlength = "19";
        this.chosenLabel =
          moment()
            .format("MM/DD/YYYY")
            .toString() + " 00:00:00";
      }
      this.endDate = null;
      this.initialLoad = false;
    }
  }
  
  remove() {
    this.isShown = false;
  }
  emitDefaultDates() {
    if (this.locale.showDefaultDate) {
      this.defaultDates.emit({
        chosenLabel: this.chosenLabel,
        startDate: this.startDate,
        endDate: this.endDate
      });
    } else if ((this.dateFromGrid) &&
      11 < this.dateFromGrid.length &&
      !this.locale.showDefaultDate
    ) {
      this.defaultDates.emit({
        chosenLabel: this.chosenLabel,
        startDate: this.startDate,
        endDate: this.endDate
      });
    } else {
      this.chosenLabel = "";
      this.defaultDates.emit({
        chosenLabel: this.chosenLabel,
        startDate: this.startDate,
        endDate: this.endDate
      });
    }
  }
  // this should calculate the label
  calculateChosenLabel() {
    let customRange = true;
    let i = 0;
    if (this.rangesArray.length > 0) {
      for (const range in this.ranges) {
        if (
          this.startDate.format("YYYY-MM-DD") ==
            this.ranges[range][0].format("YYYY-MM-DD") &&
          this.endDate.format("YYYY-MM-DD") ==
            this.ranges[range][1].format("YYYY-MM-DD")
        ) {
          customRange = false;
          this.chosenRange = this.rangesArray[i];
          break;
        }
        i++;
      }
      if (customRange) {
        if (this.showCustomRangeLabel) {
          this.chosenRange = this.locale.customRangeLabel;
        } else {
          this.chosenRange = null;
        }
        // if custom label: show calenar
        this.showCalInRanges = true;
      }
    } else {
      this.CalendarStatusOnPrev = true;
    }
    this.updateElement();
  }
  inputClick() {
    this.isShown = true;
    this.show();
  }
  setTimeToDate() {
    let timeL = this.timeLeft.split(":");
    this.startDate.set({ hour: timeL[0], minute: timeL[1], second: timeL[2] });
    if (!_.isNull(this.endDate)) {
      let timeR = this.timeRight.split(":");
      this.endDate.set({ hour: timeR[0], minute: timeR[1], second: timeR[2] });
    }
    this.calculateChosenLabel();
    return true;
  }
  validateTime() {
    this.valid = true;
    let tmpStDate = this.startDate.clone();
    let tmpEndDate = this.startDate.clone();
    let stDate: any = tmpStDate;
    let endDate: any;
    if (_.isNull(this.endDate)) {
      let timeR = this.timeRight.split(":");
      endDate = tmpEndDate.set({
        hour: timeR[0],
        minute: timeR[1],
        second: timeR[2]
      });
    } else {
      endDate = this.endDate;
    }
    let dateDiff = endDate.valueOf() - stDate.valueOf();
    if (dateDiff <= 0) {
      this.valid = false;
      return true;
    }
  }
  clickApply(e?) {
    if (this.timePicker) {
      this.locale.format = "MM/DD/YYYY HH:mm:ss";
      this.setTimeToDate();
      if (!this.singleDatePicker) {
        if (this.validateTime()) {
          return;
        }
      }
    }
    if (!this.singleDatePicker && this.startDate && !this.endDate) {
      //this.endDate = this.startDate.clone();
      this.calculateChosenLabel();
    }
    if (!this.singleDatePicker && this.autoUpdateInput) {
      if (
        this.rangesArray.length &&
        this.showRangeLabelOnInput === true &&
        this.chosenRange &&
        this.locale.customRangeLabel !== this.chosenRange
      ) {
        this.chosenLabel = this.chosenRange;
        const b = this.chosenLabel;
      } else {
        if (this.startDate && this.endDate) {
          this.chosenLabel =
            this.startDate.format(this.locale.format) +
            this.locale.separator +
            this.endDate.format(this.locale.format);
          const c = this.chosenLabel;
        } else if (this.startDate && _.isNull(this.endDate)) {
          this.chosenLabel =
            this.startDate.format(this.locale.format) +
            "" +
            this.locale.separator +
            "End Date";
          const d = this.chosenLabel;
        } else if (_.isNull(this.startDate) && this.endDate) {
          this.chosenLabel =
            "Start Date" +
            this.locale.separator +
            this.endDate.format(this.locale.format);
          const e = this.chosenLabel;
        }
      }
    } else if (this.autoUpdateInput) {
      this.chosenLabel = this.startDate.format(this.locale.format);
      const f = this.chosenLabel;
    }
    if (!this.alwaysShowCalendars) {
      this.hideCalendar();
    }
    if (this.chosenLabel) {
      this.choosedDate.emit({
        chosenLabel: this.chosenLabel,
        startDate: this.startDate,
        endDate: this.endDate,
        isClick: (e && e.type === 'click') ? true : false
      });
    }
    this.datesUpdated.emit({
      startDate: this.startDate,
      endDate: this.endDate
    });
  
    this.errorMsg = ""; //to clear error message
    if (this.timeLeft == "") {
      this.timeLeft = "00:00:00";
    }
    if (this.timeRight == "") {
      this.timeLeft = "23:59:59";
    }
  this.chkIsValidDateFunction(true);   // To set the date status -> valid     
    
  }
  clickCancel(e) {
    // var type = this.locale.type;
    // this.startDate = this._old.start;
    // if (!_.isNull(this.endDate)) {
    //     this.endDate = this._old.end;
    // }
    // this.datesUpdated.emit({ startDate: this.startDate, endDate: this.endDate });
    //this.updateView();
    // if (this.inline) {
    //     this.updateView();
    // }
    this.hideCalendar();
    /* if (this.chosenLabel !== "" && type !== "") {
      switch (type) {
        case "1":
          this.updateSelectedDate(this.chosenLabel);
          break;
        case "2":
          this.updateSelectedDateTime(this.chosenLabel);
          break;
        case "3":
          this.newSelectedDateRange(this.chosenLabel);
          break;
        case "4":
          this.SelectedDateRangeWithWithTime(this.chosenLabel);
          break;
      }
    } */

    if (!this.chosenLabel) return;
    if (this.singleDatePicker && !this.timePicker) { // single date picker
      this.updateSelectedDate(this.chosenLabel);
    } else if (this.singleDatePicker && this.timePicker) { // single date picker with time
      this.updateSelectedDateTime(this.chosenLabel);
    } else if (!this.singleDatePicker && !this.timePicker) { // date ranege picker
      this.newSelectedDateRange(this.chosenLabel);
    } else if (!this.singleDatePicker && this.timePicker) { // date range with time picker
      this.SelectedDateRangeWithWithTime(this.chosenLabel);
    }
  }
  setSelectedDate() {
    if (this.chosenLabel) {
    }
  }
  /**
   * called when month is changed
   * @param monthEvent get value in event.target.value
   * @param side left or right
   */
  monthChanged(monthEvent: any, side) {
    const year = this.calendarVariables[side].dropdowns.currentYear;
    const month = parseInt(monthEvent.target.value, 10);
    this.monthOrYearChanged(month, year, side);
  }
  /**
   * called when year is changed
   * @param yearEvent get value in event.target.value
   * @param side left or right
   */
  yearChanged(yearEvent: any, side) {
    const month = this.calendarVariables[side].dropdowns.currentMonth;
    const year = parseInt(yearEvent.target.value, 10);
    this.monthOrYearChanged(month, year, side);
    if (side == "left") {
      let tmpNextMonth = this.calendarVariables.right.month;
      let tmpNextYear = this.calendarVariables.right.year;

      if (month > tmpNextMonth || year > tmpNextYear) {
        this.monthOrYearChanged(month, year, SideEnum.right);
      }
    }
    if (side == "right") {
      let tmpPrevMonth = this.calendarVariables.right.month;
      let tmpPrevYear = this.calendarVariables.right.year;
      if (month < tmpPrevMonth || year < tmpPrevYear) {
        this.monthOrYearChanged(month, year, SideEnum.left);
      }
    }
  }
  /**
   *  call when month or year changed
   * @param month month number 0 -11
   * @param year year eg: 1995
   * @param side left or right
   */
  monthOrYearChanged(month: number, year: number, side) {
    const isLeft = side === SideEnum.left;
    if (!isLeft) {
      if (
        year < this.startDate.year() ||
        (year === this.startDate.year() && month < this.startDate.month())
      ) {
        month = this.startDate.month();
        year = this.startDate.year();
      }
    }
    if (this.minDate) {
      if (
        year < this.minDate.year() ||
        (year === this.minDate.year() && month < this.minDate.month())
      ) {
        month = this.minDate.month();
        year = this.minDate.year();
      }
    }
    if (this.maxDate) {
      if (
        year > this.maxDate.year() ||
        (year === this.maxDate.year() && month > this.maxDate.month())
      ) {
        month = this.maxDate.month();
        year = this.maxDate.year();
      }
    }
    this.calendarVariables[side].dropdowns.currentYear = year;
    this.calendarVariables[side].dropdowns.currentMonth = month;
    if (isLeft) {
      this.leftCalendar.month.month(month).year(year);
      if (this.linkedCalendars) {
        this.rightCalendar.month = this.leftCalendar.month
          .clone()
          .add(1, "month");
      }
    } else {
      this.rightCalendar.month.month(month).year(year);
      if (this.linkedCalendars) {
        this.leftCalendar.month = this.rightCalendar.month
          .clone()
          .subtract(1, "month");
      }
    }
    this.updateCalendars();
  }
  /**
   * Click on previous month
   * @param side left or right calendar
   */
  clickPrev(side) {
    if (side === SideEnum.left) {
      this.leftCalendar.month.subtract(1, "month");
      if (this.linkedCalendars) {
        this.rightCalendar.month.subtract(1, "month");
      }
    } else {
      this.rightCalendar.month.subtract(1, "month");
    }
    this.updateCalendars();
  }
  /**
   * Click on next month
   * @param side left or right calendar
   */
  clickNext(side) {
    if (side === SideEnum.left) {
      this.leftCalendar.month.add(1, "month");
    } else {
      this.rightCalendar.month.add(1, "month");
      if (this.linkedCalendars) {
        this.leftCalendar.month.add(1, "month");
      }
    }
    this.updateCalendars();
  }
  /**
   * When selecting a date
   * @param e event: get value by e.target.value
   * @param side left or right
   * @param row row position of the current date clicked
   * @param col col position of the current date clicked
   */
  clickDate(e, side, row: number, col: number) {
    this.dateInvalid = false;
    let leftCalendar = this.calendarVariables.left.firstDay;
    let rightCalendar = this.calendarVariables.right.firstDay;
    let date =
      side === SideEnum.left
        ? this.leftCalendar.calendar[row][col]
        : this.rightCalendar.calendar[row][col];

    let chkCalValidity = leftCalendar.isBefore(rightCalendar);
    // setStartDate as selected date if choosenlabel is NUll, showDefaultDate: false which was passed by other components
    if (!this.chosenLabel && !this.locale.showDefaultDate) {
      this.setStartDate(date.clone());
    }
    // It will not allow user to choose end date previous to start date
    if (!chkCalValidity) {
      let tmpDate = this.leftCalendar.calendar[row][col];
      this.setStartDate(date.clone());
      this.endDate = null;
      this.updateView();
      return;
    }
    if (_.isNull(this.startDate) && _.isNull(this.endDate)) {
      this.setStartDate(date.clone());
      this.endDate = null;
      this.updateView();
      return;
    }
    if (!e.target.classList.contains("available")) {
      return;
    }
    if (this.rangesArray.length) {
      this.chosenRange = this.locale.customRangeLabel;
    }
    if (this.endDate || date.isBefore(this.startDate, "day")) {
      // picking start
      this.endDate = null;
      this.setStartDate(date.clone());
    } else if (!this.endDate && date.isBefore(this.startDate)) {
      // special case: clicking the same date for start/end,
      // but the time of the end date is before the start date
      this.setEndDate(this.startDate.clone());
    } else {
      // picking end
      this.setEndDate(date.clone());
      if (this.autoApply) {
        this.calculateChosenLabel();
        //this.clickApply();
      }
    }
    if (this.singleDatePicker) {
      this.setEndDate(this.startDate);
      this.updateElement();
      if (this.autoApply) {
        //  this.clickApply();
      }
    }
    this.updateView();
    // This is to cancel the blur event handler if the mouse was in one of the inputs
    e.stopPropagation();
  }
  /**
   *  Click on the custom range
   * @param e: Event
   * @param label
   */
  clickRange(e, label) {
    this.chosenRange = label;
    if (label == this.locale.customRangeLabel) {
      this.isShown = true; // show calendars
      this.showCalInRanges = true;
    } else {
      var dates = this.ranges[label];
      this.startDate = dates[0].clone();
      this.endDate = dates[1].clone();
      if (
        this.showRangeLabelOnInput &&
        label !== this.locale.customRangeLabel
      ) {
        this.chosenLabel = label;
      } else {
        this.calculateChosenLabel();
      }
      this.showCalInRanges =
        !this.rangesArray.length || this.alwaysShowCalendars;
      if (!this.timePicker) {
        this.startDate.startOf("day");
        this.endDate.endOf("day");
      }
      if (!this.alwaysShowCalendars) {
        this.isShown = false; // hide calendars
      }
      this.rangeClicked.emit({ label: label, dates: dates });
      if (!this.keepCalendarOpeningWithRange) {
        this.clickApply();
      } else {
        this.renderCalendar(SideEnum.left);
        this.renderCalendar(SideEnum.right);
      }
    }
  }
  show(e?) {
    if (this.isShown) {
      return;
    }
    this._old.start = this.startDate.clone();
    this._old.end = this.endDate.clone();
    this.isShown = true;
    this.updateView();
  }
  hide(e?) {
    if (!this.isShown) {
      return;
    }
    // incomplete date selection, revert to last values
    if (!this.endDate) {
      if (this._old.start) {
        this.startDate = this._old.start.clone();
      }
      if (this._old.end && !_.isNull(this.endDate)) {
        this.endDate = this._old.end.clone();
      }
    }
    // if a new date range was selected, invoke the user callback function
    //if (!this.startDate.isSame(this._old.start) || !this.endDate.isSame(this._old.end)) {
    // this.callback(this.startDate, this.endDate, this.chosenLabel);
    //}
    // if picker is attached to a text input, update it
    this.updateElement();
    this.hideCalendar();
    setTimeout(() => {
      this.isShown = false;
    }, 0);
  }
  /**
   * handle click on all element in the component, usefull for outside of click
   * @param e event
   */
  handleInternalClick(e) {
    e.stopPropagation();
  }
  /**
   * update the locale options
   * @param locale
   */
  updateLocale(locale) {
    for (const key in locale) {
      if (this.locale.hasOwnProperty(key) && this.locale.hasOwnProperty(key)) {
        this.locale[key] = locale[key];
      }
    }
  }
  /**
   *  clear the daterange picker
   */
  clear() {
    this.startDate = moment().startOf("day");
    this.endDate = moment().endOf("day");
    this.choosedDate.emit({ chosenLabel: "", startDate: null, endDate: null });
    this.datesUpdated.emit({ startDate: null, endDate: null });
    this.hide();
  }
  /**
   * Find out if the selected range should be disabled if it doesn't
   * fit into minDate and maxDate limitations.
   */
  disableRange(range) {
    if (range === this.locale.customRangeLabel) {
      return false;
    }
    const rangeMarkers = this.ranges[range];
    const areBothBefore = rangeMarkers.every(date => {
      if (!this.minDate) {
        return false;
      }
      return date.isBefore(this.minDate);
    });
    const areBothAfter = rangeMarkers.every(date => {
      if (!this.maxDate) {
        return false;
      }
      return date.isAfter(this.maxDate);
    });
    return areBothBefore || areBothAfter;
  }
  /**
   * Find out if the current calendar row has current month days
   * (as opposed to consisting of only previous/next month days)
   */
  hasCurrentMonthDays(currentMonth, row) {
    for (let day = 0; day < 7; day++) {
      if (row[day].month() === currentMonth) {
        return true;
      }
    }
    return false;
  }
  allowValidDate(event) {
    this.buttonDisableStatus = true;
    var numCharCode: number = event.keyCode;
    var numarrKeyCode: number[] = [8, 9, 37, 39, 46, 189];
    if (this.singleDateTimePicker && 32 === numCharCode) {
      return true;
    }
    if (
      numarrKeyCode.includes(numCharCode) ||
      (numCharCode >= 48 && numCharCode <= 57) ||
      (numCharCode >= 96 && numCharCode <= 105)
    ) {
      if (
        this.onlySingleDatePicker &&
        8 !== numCharCode &&
        9 === event.target.value.length
      ) {
        // Single date picker
        this.updateSelectedDate(event.target.value + "" + event.key);
      } else if (
        this.singleDateTimePicker &&
        8 !== numCharCode &&
        18 === event.target.value.length
      ) {
        // Single date time picker
        this.updateSelectedDateTime(event.target.value + "" + event.key);
        if (this.chosenLabel) {
          this.choosedDate.emit({ chosenLabel: this.chosenLabel });
        }
      } else if (!this.singleDatePicker) {
        // Date Range Update calendar view on user date entry
        // @FIXME: Can we optimize this if else block?
        if (8 === numCharCode) {
          if (11 === event.target.value.length) {
            var newDateRange = event.target.value;
            this.updateSelectedDateRange(newDateRange);
          }
        } else {
          if (
            9 === event.target.value.length ||
            20 === event.target.value.length
          ) {
            var newDateRange = event.target.value + event.key;
            this.updateSelectedDateRange(newDateRange);
          }
        }
      }
      return true;
    } else {
      event.preventDefault();
    }
  }
  allowOnlyDateTime(event) {
    if (event.key.length == 1) {
      let code = event.key.charCodeAt(0);
      if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {
        event.preventDefault();
        return;
      }
      const regEx = /[`~!@#$%^&*()_|+=?;'",.<>\{\}\[\]\\]/gi;
      var isSplChar = regEx.test(event.key);
      if (isSplChar) {
        event.preventDefault();
        return;
      }
    }
    //      var letters = /^[A-Za-z]+$/;
    // if(event.key.match(letters)){
    //   event.target.value.stopPropagation();
    // }
  }

  chkIsValidDateFunction(status:boolean){
  
      this.chkIsDateValidEmitter.emit({
       dateStatus:status
      });
   }
  // @FIXME: Will remove unwanted code
  checkDateFormat(event) {
    if (event.keyCode == 37 || event.keyCode == 39) return;        
    this.errorMsg = "";
    if (event.target.value.length == 0) {
      // this.clearDates();
      this.chosenLabel = "";
      if (this.locale.isRequired) this.errorMsg = this.dateRangeLabel.replace("*", "") + " is required.";
      this.choosedDate.emit({ chosenLabel: this.chosenLabel });
      this.chkIsValidDateFunction(false);
    } else if (this.singleDatePicker == true && this.timePicker == false) {
      var str = event.target.value.toString();
      var patt = new RegExp(
        /^(((0[13578]|1[02])(|[\/\-\s])31(|[\/\-\s])(18|19|20)[0-9]{2})|((01|0[3-9]|1[1-2])(|[\/\-\s])(29|30)(|[\/\-\s])(18|19|20)[0-9]{2})|((0[1-9]|1[0-2])(|[\/\-\s])(0[1-9]|1[0-9]|2[0-8])(|[\/\-\s])(18|19|20)[0-9]{2})|((02)(|[\/\-\s])29(|[\/\-\s])(((18|19|20)(04|08|[2468][048]|[13579][26]))|2000)))$/
      );
      var isValid: boolean = patt.test(str);
      if (!isValid) {
        this.errorMsg = this.dateRangeLabel.replace("*", "") + " is invalid.";
        this.chkIsValidDateFunction(isValid);
      } else {
        this.errorMsg = "";
        this.updateSelectedDate(str);
        
      }
    } else if (this.singleDatePicker == false && this.timePicker == false) {
      var str = event.target.value.toString();
      var patt = new RegExp(
        /^(((0[13578]|1[02])(|[\/\- ])31(|[\/\- ])(18|19|20)[0-9]{2})|((01|0[3-9]|1[1-2])(|[\/\- ])(29|30)(|[\/\- ])(18|19|20)[0-9]{2})|((0[1-9]|1[0-2])(|[\/\- ])(0[1-9]|1[0-9]|2[0-8])(|[\/\- ])(18|19|20)[0-9]{2})|((02)(|[\/\- ])29(|[\/\- ])(((18|19|20)(04|08|[2468][048]|[13579][26]))|2000)))-(((0[13578]|1[02])(|[\/\- ])31(|[\/\- ]) (18|19|20)[0-9]{2})|((01|0[3-9]|1[1-2])(|[\/\- ])(29|30)(|[\/\- ])(18|19|20)[0-9]{2})|((0[1-9]|1[0-2])(|[\/\- ])(0[1-9]|1[0-9]|2[0-8])(|[\/\- ])(18|19|20)[0-9]{2})|((02)(|[\/\- ])29(|[\/\- ])(((18|19|20)(04|08|[2468][048]|[13579][26]))|2000)))$/
      );
      var isValid: boolean = patt.test(str);
      if (!isValid) {
        this.errorMsg = this.dateRangeLabel.replace("*", "") + " is invalid.";
      } else {
        this.errorMsg = "";
        this.newSelectedDateRange(str);
      }
    } else if (this.singleDatePicker == false && this.timePicker == true) {
      var str = event.target.value.toString();
      //var patt = new RegExp(/^(((0[13578]|1[02])[\/\- ]31[\/\- ](18|19|20)[0-9]{2})|((01|0[3-9]|1[1-2])[\/\- ](29|30)[\/\- ](18|19|20)[0-9]{2})|((0[1-9]|1[0-2])[\/\- ](0[1-9]|1[0-9]|2[0-8])[\/\- ](18|19|20)[0-9]{2})|((02)[\/\- ]29[\/\- ](((18|19|20)(04|08|[2468][048]|[13579][26]))|2000)))(\s)(([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d))\-(((0[13578]|1[02])[\/\- ]31[\/\- ](18|19|20)[0-9]{2})|((01|0[3-9]|1[1-2])[\/\- ](29|30)[\/\- ](18|19|20)[0-9]{2})|((0[1-9]|1[0-2])[\/\- ](0[1-9]|1[0-9]|2[0-8])[\/\- ](18|19|20)[0-9]{2})|((02)[\/\- ]29[\/\- ](((18|19|20)(04|08|[2468][048]|[13579][26]))|2000)))(\s)(([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d))$/);
      var patt = new RegExp(
        /^(((0[13578]|1[02])(|[\/\- ])31(|[\/\- ])(18|19|20)[0-9]{2})|((01|0[3-9]|1[1-2])(|[\/\- ])(29|30)(|[\/\- ])(18|19|20)[0-9]{2})|((0[1-9]|1[0-2])(|[\/\- ])(0[1-9]|1[0-9]|2[0-8])(|[\/\- ])(18|19|20)[0-9]{2})|((02)(|[\/\- ])29(|[\/\- ])(((18|19|20)(04|08|[2468][048]|[13579][26]))|2000)))(\s)(([0-1]\d|2[0-3])(|[\:\s])([0-5]\d)(|[\:\s])([0-5]\d))\-(((0[13578]|1[02])(|[\/\- ])31(|[\/\- ])(18|19|20)[0-9]{2})|((01|0[3-9]|1[1-2])(|[\/\- ])(29|30)(|[\/\- ])(18|19|20)[0-9]{2})|((0[1-9]|1[0-2])(|[\/\- ])(0[1-9]|1[0-9]|2[0-8])(|[\/\- ])(18|19|20)[0-9]{2})|((02)(|[\/\- ])29(|[\/\- ])(((18|19|20)(04|08|[2468][048]|[13579][26]))|2000)))(\s)(([0-1]\d|2[0-3])(|[\:\s])([0-5]\d)(|[\:\s])([0-5]\d))$/
      );
      var isValid: boolean = patt.test(str);
      // this.buttonDisableStatus = false;
      if (!isValid) {
        // this.dateInvalid = true;
        // this.buttonDisableStatus = true;
        this.errorMsg =
          this.dateRangeLabel.replace("*", "") + " is invalid.";
      } else {
        this.errorMsg = "";
        this.SelectedDateRangeWithWithTime(str);
      }
    } else if (this.singleDatePicker == true && this.timePicker == true) {
      var str = event.target.value.toString();
      //var patt = new RegExp(/^(((0[13578]|1[02])[\/\-\s]31[\/\-\s](18|19|20)[0-9]{2})|((01|0[3-9]|1[1-2])[\/\-\s](29|30)[\/\-\s](18|19|20)[0-9]{2})|((0[1-9]|1[0-2])[\/\-\s](0[1-9]|1[0-9]|2[0-8])[\/\-\s](18|19|20)[0-9]{2})|((02)[\/\-\s]29[\/\-\s](((18|19|20)(04|08|[2468][048]|[13579][26]))|2000)))(\s)(([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d))$/);
      // var patt = new RegExp(/^(((0[13578]|1[02])(|[\/\- ])31(|[\/\- ])(18|19|20)[0-9]{2})|((01|0[3-9]|1[1-2])(|[\/\- ])(29|30)(|[\/\- ])(18|19|20)[0-9]{2})|((0[1-9]|1[0-2])(|[\/\- ])(0[1-9]|1[0-9]|2[0-8])(|[\/\- ])(18|19|20)[0-9]{2})|((02)(|[\/\- ])29(|[\/\- ])(((18|19|20)(04|08|[2468][048]|[13579][26]))|2000)))(\s)(([0-1]\d|2[0-3])(|[\:\s])([0-5]\d)(|[\:\s])([0-5]\d))\-(((0[13578]|1[02])(|[\/\- ])31(|[\/\- ])(18|19|20)[0-9]{2})|((01|0[3-9]|1[1-2])(|[\/\- ])(29|30)(|[\/\- ])(18|19|20)[0-9]{2})|((0[1-9]|1[0-2])(|[\/\- ])(0[1-9]|1[0-9]|2[0-8])(|[\/\- ])(18|19|20)[0-9]{2})|((02)(|[\/\- ])29(|[\/\- ])(((18|19|20)(04|08|[2468][048]|[13579][26]))|2000)))(\s)(([0-1]\d|2[0-3])(|[\:\s])([0-5]\d)(|[\:\s])([0-5]\d))$/);
      var patt = new RegExp(
        /^(((0[13578]|1[02])(|[\/\-\s])31(|[\/\-\s])(18|19|20)[0-9]{2})|((01|0[3-9]|1[1-2])(|[\/\-\s])(29|30)(|[\/\-\s])(18|19|20)[0-9]{2})|((0[1-9]|1[0-2])(|[\/\-\s])(0[1-9]|1[0-9]|2[0-8])(|[\/\-\s])(18|19|20)[0-9]{2})|((02)(|[\/\-\s])29(|[\/\-\s])(((18|19|20)(04|08|[2468][048]|[13579][26]))|2000)))(\s)(([0-1]\d|2[0-3])(|[\:\s])([0-5]\d)(|[\:\s])([0-5]\d))$/
      );
      var isValid: boolean = patt.test(str);
      if (!isValid) {
        this.updateDefaultCalendarWithTime();
        this.errorMsg =
          this.dateRangeLabel.replace("*", "") + " is invalid.";
      } else {
        this.errorMsg = "";
        // this.choosedDate.emit({ chosenLabel: this.chosenLabel });
        this.updateSelectedDateTime(str);
      }
      /*if (isValid && this.updateSelectedDateTime(event.target.value)) {
        this.errorMsg = '';
        this.choosedDate.emit({ chosenLabel: this.chosenLabel });
      } else if (19 == str.length && !isValid) {
        this.updateDefaultCalendarWithTime();
        this.errorMsg = this.dateRangeLabel.replace('*', '') + ' is invalid.';
      }*/
    }
  }
  replaceAllHypenSpaceSlash(dateString: string) {
    dateString = dateString.replace(/\//g, "");
    dateString = dateString.replace(/\-/g, "");
    dateString = dateString.replace(/\s/g, "");
    dateString = dateString.replace(/\:/g, "");
    return dateString;
  }
  /*** 12/12/2018-12/12/2018 10122018-10122018 */
  newSelectedDateRange(selectedDate) {
    var selectedDate = selectedDate.trim();
    const hypenSeparator = selectedDate.indexOf("-", 7);
    var firstHalfDate = selectedDate.substring(0, hypenSeparator);
    var secondHalfDate = selectedDate.substring(
      hypenSeparator + 1,
      selectedDate.length
    );
    firstHalfDate = this.replaceAllHypenSpaceSlash(firstHalfDate);
    secondHalfDate = this.replaceAllHypenSpaceSlash(secondHalfDate);
    if (firstHalfDate.length == 8) {
      var startDate =
        firstHalfDate.substring(0, 2) +
        "/" +
        firstHalfDate.substring(2, 4) +
        "/" +
        firstHalfDate.substring(4, 8);
      this.setStartDate(startDate);
    }
    if (secondHalfDate.length == 8) {
      var endDate =
        secondHalfDate.substring(0, 2) +
        "/" +
        secondHalfDate.substring(2, 4) +
        "/" +
        secondHalfDate.substring(4, 8);
      this.setEndDate(endDate);
    }
    if (moment(startDate).isAfter(endDate)) {
      this.errorMsg = "End date should be greater or equal to start date.";
      return true;
    } else {
      this.errorMsg = "";
    }
    this.updateView();
    this.clickApply();
    return true;
  }
  newSelectedDateRange_old(selectedDate) {
    var selectedDate = selectedDate.trim();
    if (selectedDate.length == 21) {
      this.startDate = moment();
      this.dateInvalid = false;
      var array = Array.from(selectedDate);
      var formDate = array.slice(0, 10);
      var toDate = array.slice(11);
      if (moment(formDate.toString()).isAfter(toDate.toString())) {
        this.buttonDisableStatus = true;
        return;
      }
      if (
        selectedDate.charAt(2) == "/" &&
        selectedDate.charAt(5) == "/" &&
        selectedDate.charAt(13) == "/" &&
        selectedDate.charAt(16) == "/"
      ) {
        var isValidSDate = moment(
          formDate.join(""),
          "MM/DD/YYYY",
          true
        ).isValid();
        var isValidEDate = moment(
          toDate.join(""),
          "MM/DD/YYYY",
          true
        ).isValid();
      } else if (
        selectedDate.charAt(2) == "-" &&
        selectedDate.charAt(5) == "-" &&
        selectedDate.charAt(13) == "-" &&
        selectedDate.charAt(16) == "-"
      ) {
        var isValidSDate = moment(
          formDate.join(""),
          "MM-DD-YYYY",
          true
        ).isValid();
        var isValidEDate = moment(
          toDate.join(""),
          "MM-DD-YYYY",
          true
        ).isValid();
      } else if (
        selectedDate.charAt(2) == " " &&
        selectedDate.charAt(5) == " " &&
        selectedDate.charAt(13) == " " &&
        selectedDate.charAt(16) == " "
      ) {
        var isValidSDate = moment(
          formDate.join(""),
          "MM DD YYYY",
          true
        ).isValid();
        var isValidEDate = moment(
          toDate.join(""),
          "MM DD YYYY",
          true
        ).isValid();
      }
      if (isValidSDate && isValidEDate) {
        if (moment(toDate.join("")).isBefore(moment(formDate.join("")))) {
          this.dateInvalid = true;
          return;
        }
        if (formDate.join("") && moment(formDate.join("")).isValid()) {
          let tmpSDate = moment(formDate.join(""));
          this.setStartDate(tmpSDate);
          this.endDate = null;
          this.updateView();
        }
        if (toDate.join("") && moment(toDate.join("")).isValid()) {
          let tmpEDate = moment(toDate.join(""));
          this.setEndDate(tmpEDate);
          this.updateView();
        }
        this.buttonDisableStatus = false;
      } else if (isValidSDate && !isValidEDate) {
        if (formDate.join("") && moment(formDate.join("")).isValid()) {
          let tmpSDate = moment(formDate.join(""));
          this.setStartDate(tmpSDate);
          this.endDate = null;
          this.updateView();
        }
        this.buttonDisableStatus = false;
      } else {
        this.dateInvalid = true;
        this.buttonDisableStatus = true;
      }
      return true;
    }
  }
  SelectedDateRangeWithWithTime(fullDate) {
    fullDate = fullDate.trim();
    const hypenSeparator = fullDate.indexOf("-", 14);
    var firstHalfString = fullDate.substring(0, hypenSeparator);
    var secondHalfString = fullDate.substring(
      hypenSeparator + 1,
      fullDate.length
    );
    const spaceSeparator = firstHalfString.indexOf(" ", 7);
    var firsthalfStartDate = firstHalfString.substring(0, spaceSeparator);
    var firstHalfStartTime = firstHalfString.substring(
      spaceSeparator + 1,
      firstHalfString.length
    );
    var startDate = this.replaceAllHypenSpaceSlash(firsthalfStartDate);
    var startTime = this.replaceAllHypenSpaceSlash(firstHalfStartTime);
    if (startDate.length == 8) {
      var startDate =
        startDate.substring(0, 2) +
        "/" +
        startDate.substring(2, 4) +
        "/" +
        startDate.substring(4, 8);
    }
    if (startTime.length == 6) {
      var startTime =
        startTime.substring(0, 2) +
        ":" +
        startTime.substring(2, 4) +
        ":" +
        startTime.substring(4, 8);
    }
    const spaceSeparator2 = secondHalfString.indexOf(" ", 7);
    var secondHalfEndDate = secondHalfString.substring(0, spaceSeparator2);
    var secondHalfEndTime = secondHalfString.substring(
      spaceSeparator2 + 1,
      secondHalfString.length
    );
    var endDate = this.replaceAllHypenSpaceSlash(secondHalfEndDate);
    var endTime = this.replaceAllHypenSpaceSlash(secondHalfEndTime);
    if (endDate.length == 8) {
      var endDate =
        endDate.substring(0, 2) +
        "/" +
        endDate.substring(2, 4) +
        "/" +
        endDate.substring(4, 8);
    }
    if (endTime.length == 6) {
      var endTime =
        endTime.substring(0, 2) +
        ":" +
        endTime.substring(2, 4) +
        ":" +
        endTime.substring(4, 8);
    }
    if (moment(startDate).isAfter(endDate)) {
      this.errorMsg = "End date should be greater or equal to start date.";
      return true;
    } else {
      this.errorMsg = "";
    }
    this.setStartDate(moment(startDate));
    this.setEndDate(endDate);
    this.timeLeft = startTime;
    this.timeRight = endTime;
    this.setTimeToDate();
    this.updateView();
    this.clickApply();
    return true;
  }
  SelectedDateRangeWithWithTimeOld(fullDate) {
    fullDate.trim();
    if (fullDate.length == 39) {
      const firstDateAndTime = fullDate.substring(0, 19);
      const secondDateAndTime = fullDate.substring(20, 39);
      const startDate = firstDateAndTime.substring(0, 10);
      const startTime = firstDateAndTime.substring(11, 19);
      const endDate = secondDateAndTime.substring(0, 10);
      const endTime = secondDateAndTime.substring(11, 19);
      this.setStartDate(moment(startDate));
      this.setEndDate(endDate);
      this.timeLeft = startTime;
      this.timeRight = endTime;
      this.setTimeToDate();
      this.updateView();
      return true;
    }
  }
  // It will call on keyUp event for clearing date time
  clearDateTimeOnKeyUp(event) {
    if (event.target.value.length === 0) {
      this.clearDates();
      this.choosedDate.emit({ chosenLabel: this.chosenLabel });
    }
    return true;
  }

  /** valid eg 10122018 10/12/2018 10 12 2018 10-12-2018 */
  updateSelectedDate(selectedDate) {
    var selectedDate = selectedDate.trim();
    selectedDate = this.replaceAllHypenSpaceSlash(selectedDate);
    if (selectedDate.length == 8) {
      selectedDate =
        selectedDate.substring(0, 2) +
        "/" +
        selectedDate.substring(2, 4) +
        "/" +
        selectedDate.substring(4, 8);
      this.startDate = moment();
      this.setStartDate(moment(selectedDate));
      this.setEndDate(this.startDate);
      // this.updateElement();
      this.updateView();
      this.clickApply();
      
      return true;
    }
  }
  /**10/12/2018 00:00:00  */
  updateSelectedDateTime(selectedDateTime) {
    var selectedDateTime = selectedDateTime.trim();
    const hypenSeparator = selectedDateTime.indexOf(" ", 7);
    var firstHalfDate = selectedDateTime.substring(0, hypenSeparator);
    var secondHalfTime = selectedDateTime.substring(
      hypenSeparator + 1,
      selectedDateTime.length
    );
    firstHalfDate = this.replaceAllHypenSpaceSlash(firstHalfDate);
    secondHalfTime = this.replaceAllHypenSpaceSlash(secondHalfTime);
    if (firstHalfDate.length == 8) {
      firstHalfDate =
        firstHalfDate.substring(0, 2) +
        "/" +
        firstHalfDate.substring(2, 4) +
        "/" +
        firstHalfDate.substring(4, 8);
    }
    if (secondHalfTime.length == 6) {
      secondHalfTime =
        secondHalfTime.substring(0, 2) +
        ":" +
        secondHalfTime.substring(2, 4) +
        ":" +
        secondHalfTime.substring(4, 6);
    }
    this.setStartDate(moment(firstHalfDate));
    this.setEndDate(this.startDate);
    this.timeLeft = secondHalfTime;
    this.setTimeToDate();
    this.updateView();
    this.clickApply();
    return true;
  }
  updateSelectedDateTimeOld(selectedDateTime) {
    var selectedDateTime = selectedDateTime.trim();
    const isPatrnWithoutSpace = selectedDateTime.charAt(8);
    const isPatrnWithSpace = selectedDateTime.charAt(10);
    const lengthOfStr = selectedDateTime.length;
    if (isPatrnWithoutSpace == " ") {
      var startDatePicker = selectedDateTime.substring(0, 8);
      if (startDatePicker.length == 8) {
        startDatePicker =
          startDatePicker.substring(0, 2) +
          "/" +
          startDatePicker.substring(2, 4) +
          "/" +
          startDatePicker.substring(4, 8);
      }
      var startTime = selectedDateTime.substring(9, lengthOfStr);

      if (startTime.length == 6) {
        startTime =
          startTime.substring(0, 2) +
          ":" +
          startTime.substring(2, 4) +
          ":" +
          startTime.substring(4, 6);
      }
      this.setStartDate(moment(startDatePicker));
      this.setEndDate(this.startDate);
      this.timeLeft = startTime;
      this.setTimeToDate();
      this.updateView();
      this.clickApply();
      return true;
    }
    if (isPatrnWithSpace == " ") {
      const startDatePicker = selectedDateTime.substring(0, 10);
      const startTime = selectedDateTime.substring(11, lengthOfStr);
      this.startDate = moment();
      this.setStartDate(moment(startDatePicker));
      this.setEndDate(this.startDate);
      this.timeLeft = startTime;
      this.setTimeToDate();
      this.updateView();
      this.clickApply();
      return true;
    }
    /*if (selectedDateTime.length == 19) {
      const startDatePicker = selectedDateTime.substring(0, 10);
      const startTime =  selectedDateTime.substring(11, 19);
      this.startDate = moment();
      this.setStartDate(moment(startDatePicker));
      this.setEndDate(this.startDate);
      this.timeLeft = startTime;
      this.setTimeToDate();
      this.updateView();
      this.clickApply();
      return true;
    }*/
    return true;
  }
  updateDefaultCalendarWithTime() {
    const startTime = "00:00:00";
    this.startDate = moment();
    this.setStartDate(this.startDate);
    this.setEndDate(this.startDate);
    this.timeLeft = startTime;
    this.setTimeToDate();
    this.updateView();
    return true;
  }
  prepareMaskingForDateRange() {
    if (this.singleDatePicker && !this.timePicker) {
      // single date picker
      this.onlySingleDatePicker = true;
      this.maskDateTime = [
        /[0-1]/,
        /[0-2]/,
        "/",
        /[0-3]/,
        /[0-9]/,
        "/",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/
      ];
    } else if (this.singleDatePicker && this.timePicker) {
      // Single date time picker
      this.singleDateTimePicker = true;
      this.maskDateTime = [
        /[0-1]/,
        /[0-2]/,
        "/",
        /[0-3]/,
        /[0-9]/,
        "/",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[ ]/,
        /[0-2]/,
        /[0-9]/,
        ":",
        /[0-5]/,
        /[0-9]/,
        ":",
        /[0-5]/,
        /[0-9]/
      ];
    } else if (!this.singleDatePicker && !this.timePicker) {
      // date range picker
      this.dateRangePicker = true;
      this.maskDateTime = [
        /[0-1]/,
        /[0-2]/,
        "/",
        /[0-3]/,
        /[0-9]/,
        "/",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[-]/,
        /[0-1]/,
        /[0-2]/,
        "/",
        /[0-3]/,
        /[0-9]/,
        "/",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/
      ];
    } else if (!this.singleDatePicker && this.timePicker) {
      // date range time picker
      this.dateTimeRangePicker = true;
      this.maskDateTime = [
        /[0-1]/,
        /[0-2]/,
        "/",
        /[0-3]/,
        /[0-9]/,
        "/",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[ ]/,
        /[0-2]/,
        /[0-9]/,
        ":",
        /[0-5]/,
        /[0-9]/,
        ":",
        /[0-5]/,
        /[0-9]/,
        /[-]/,
        /[0-1]/,
        /[0-2]/,
        "/",
        /[0-3]/,
        /[0-9]/,
        "/",
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        /[0-9]/,
        " ",
        /[0-2]/,
        /[0-9]/,
        ":",
        /[0-5]/,
        /[0-9]/,
        ":",
        /[0-5]/,
        /[0-9]/
      ];
    }
    return true;
  }
  updateSelectedDateRange(selectedDate) {
    this.startDate = moment();
    this.dateInvalid = false;
    let dateRangeArray = selectedDate.split("-");
    let isValidSDate = moment(dateRangeArray[0], "MM/DD/YYYY", true).isValid();
    let isValidEDate = moment(dateRangeArray[1], "MM/DD/YYYY", true).isValid();
    if (isValidSDate && isValidEDate) {
      if (moment(dateRangeArray[1]).isBefore(moment(dateRangeArray[0]))) {
        this.dateInvalid = true;
        return;
      }
      if (dateRangeArray[0] && moment(dateRangeArray[0]).isValid()) {
        let tmpSDate = moment(dateRangeArray[0]);
        this.setStartDate(tmpSDate);
        this.endDate = null;
        this.updateView();
      }
      if (dateRangeArray[1] && moment(dateRangeArray[1]).isValid()) {
        let tmpEDate = moment(dateRangeArray[1]);
        this.setEndDate(tmpEDate);
        this.updateView();
      }
      this.buttonDisableStatus = false;
    } else if (isValidSDate && !isValidEDate) {
      if (dateRangeArray[0] && moment(dateRangeArray[0]).isValid()) {
        let tmpSDate = moment(dateRangeArray[0]);
        this.setStartDate(tmpSDate);
        this.endDate = null;
        this.updateView();
      }
      this.buttonDisableStatus = false;
    } else {
      this.dateInvalid = true;
      this.buttonDisableStatus = true;
    }
    return true;
  }
  calendarPosition() {
    this.ElTop = this.dateTimeEl.nativeElement;
    ElFromTop = 0;
    if (this.ElTop.offsetParent) {
      while (this.ElTop.offsetParent) {
        var ElFromTop = this.ElTop.offsetParent.offsetTop + ElFromTop;
        this.ElTop = this.ElTop.offsetParent;
      }
    }
    // let winHeight = window.screen.height;
    let docHeight = document.body.clientHeight;
    let ElPosition = ElFromTop + 450;
    if (ElPosition != undefined && docHeight < ElPosition) {
      this.calendarOnTop = true;
    }
  }
}
