export interface IXgDate {
    year: number;
    month: number;
    day: number;
}
export interface IXgMonth {
    monthTxt: string;
    monthNbr: number;
    year: number;
}
export interface IXgWeek {
    week: Array<IXgCalendarDay>;
}
export interface IXgCalendarDay {
    dateObj: IXgDate;
    // cmo: number;
    currDay: boolean;
    disabled: boolean;
    // markedDate: IXgMarkedDate;
    highlight: boolean;
    text: string;
    colSpan: number;
}
export interface IXgMarkedDate {
    marked: boolean;
    color: string;
}
export interface IXgDayLabels {
    [day: string]: string;
}
export interface IXgCalendarMonth {
    monthKey: number;
    name: string;
    currMonth: boolean;
    selected: boolean;
    disabled: boolean;
}
export interface IXgCalendarYear {
    year: number;
    currYear: boolean;
    selected: boolean;
    disabled: boolean;
}
export interface IXgDateFormat {
    value: string;
    format: string;
}
export interface IXgMonthLabels {
    [month: number]: string;
}
export interface IxgInputFocusBlur {
    reason: number;
    value: string;
}

export interface IXgOptions {
    enableBroadcastCalendar?: boolean;
}