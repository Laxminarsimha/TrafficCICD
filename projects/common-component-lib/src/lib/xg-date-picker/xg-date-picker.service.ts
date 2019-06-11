import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IXgDate, IXgMonth, IXgDateFormat, IXgMonthLabels } from './xg-date-picker.interfaces';
import { DatePickerConstants } from './xg-date-picker.constants';
import * as moment from "moment";
@Injectable()
export class XgDatePickerService {
    private datePickerConstants: DatePickerConstants;
    constructor() {
        this.datePickerConstants = new DatePickerConstants();
    }
    isInitializedDate(date: IXgDate): boolean {
        return date.year !== 0 && date.month !== 0 && date.day !== 0;
    }
    parseDefaultMonth(value: string): IXgMonth {
        const sMonth: IXgMonth = { monthTxt: "", monthNbr: 0, year: 0 };
        if (value) {
            const splitValue = value.split(value.match(/[^0-9]/)[0]);
            sMonth.monthNbr =
                splitValue[0].length === 2 ? parseInt(splitValue[0]) : parseInt(splitValue[1]);
            sMonth.year =
                splitValue[0].length === 2 ? parseInt(splitValue[1]) : parseInt(splitValue[0]);
        }
        return sMonth;
    }
    getCurrentDay(): IXgDate {
        let date: Date = this.getCurrentDate();
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        };
    }
    daysInMonth(month: number, year: number): number {
        return new Date(year, month, 0).getDate();
    }
    getFirstDayIndexOfMonth(year: number, month: number): number {
        return new Date(year, month, 1).getDay();
    }
    daysInPreviousMonth(month: number, year: number): number {
        const oDate: Date = this.getDate(year, month, 1);
        oDate.setMonth(oDate.getMonth() - 1);
        return this.daysInMonth(oDate.getMonth() + 1, oDate.getFullYear());
    }
    getDate(year: number, month: number, day: number): Date {
        return new Date(year, month - 1, day, 0, 0, 0, 0);
    }
    getCurrentDate(): Date {
        return new Date()
    }
    getDayNumber(date: IXgDate): number {
        return this.getDate(date.year, date.month, date.day).getDay();
    }
    isCurrentDay(date: number, month: number, year: number, today: IXgDate): boolean {
        return date === today.day && month === today.month && year === today.year;
    }
    getWeekday(date: IXgDate): string {
        let weekDays: Array<string> = this.datePickerConstants.constants['weekDays'];
        return weekDays[this.getDayNumber(date)];
    }
    isValidDate(date): boolean {
        const sDate = new Date(date);
        return sDate instanceof Date;
    }
    getDateFormatDelimeters(dateFormat: string): Array<string> {
        return dateFormat.match(/[^(dMy)]{1,}/g);
    }
    getDateValue(
        dateStr: string,
        dateFormat: string,
        delimeters: Array<string>
    ): Array<IXgDateFormat> {
        let del: string = delimeters[0];
        if (delimeters[0] !== delimeters[1]) {
            del = delimeters[0] + delimeters[1];
        }

        let re: any = new RegExp("[" + del + "]");
        let ds: Array<string> = dateStr.split(re);
        let df: Array<string> = dateFormat.split(re);
        let da: Array<IXgDateFormat> = [];

        for (let i = 0; i < df.length; i++) {
            if (df[i].indexOf(this.datePickerConstants.constants['formatConst']['YYYY']) !== -1) {
                da[0] = { value: ds[i], format: df[i] };
            }
            else if (df[i].indexOf(this.datePickerConstants.constants['formatConst']['YY']) !== -1) {
                da[0] = { value: ds[i], format: df[i] };
            }
            if (df[i].indexOf(this.datePickerConstants.constants['formatConst']['M']) !== -1) {
                da[1] = { value: ds[i], format: df[i] };
            }
            if (df[i].indexOf(this.datePickerConstants.constants['formatConst']['D']) !== -1) {
                da[2] = { value: ds[i], format: df[i] };
            }
        }
        return da;
    }

    getMonthNumberByMonthName(
        dateFormat: IXgDateFormat,
        monthLabels: IXgMonthLabels
    ): number {
        if (dateFormat.value) {
            for (let key = 1; key <= 12; key++) {
                if (dateFormat.value.toLowerCase() === monthLabels[key].toLowerCase()) {
                    return key;
                }
            }
        }
        return -1;
    }
    getNumberByValue(dateFormat: IXgDateFormat): number {
        if (!/^\d+$/.test(dateFormat.value)) {
            return -1;
        }

        let nbr: number = Number(dateFormat.value);
        if (
            (dateFormat.format.length === 1 && dateFormat.value.length !== 1 && nbr < 10) ||
            (dateFormat.format.length === 1 && dateFormat.value.length !== 2 && nbr >= 10)
        ) {
            nbr = -1;
        } else if (dateFormat.format.length === 2 && dateFormat.value.length > 2) {
            nbr = -1;
        }
        return nbr;
    }
    convertToXgDate(date: Date): IXgDate {
        return {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        };
    }
    convertXgDateToDate(date: IXgDate): Date {
        const sDate = this.getCurrentDate();
        sDate.setMonth(date.month - 1);
        sDate.setFullYear(date.year);
        sDate.setDate(date.day);
        return sDate;
    }
    formatDate(
        date: IXgDate,
        dateFormat: string,
        monthLabels: IXgMonthLabels
    ): string {
        let formatted: string = '';
        if (dateFormat.indexOf(this.datePickerConstants.constants['formatConst']['YYYY']) !== -1) {
            formatted = dateFormat.replace(this.datePickerConstants.constants['formatConst']['YYYY'], String(date.year));
        }
        else if (dateFormat.indexOf(this.datePickerConstants.constants['formatConst']['YY']) !== -1) {
            formatted = dateFormat.replace(this.datePickerConstants.constants['formatConst']['YY'], String(date.year).length === 2 ? String(date.year) : String(date.year).length === 1 ? `0${date.year}` : String(date.year).substr(2));
        }

        if (dateFormat.indexOf(this.datePickerConstants.constants['formatConst']['MMM']) !== -1) {
            formatted = formatted.replace(this.datePickerConstants.constants['formatConst']['MMM'], monthLabels[date.month]);
        } else if (dateFormat.indexOf(this.datePickerConstants.constants['formatConst']['MM']) !== -1) {
            formatted = formatted.replace(this.datePickerConstants.constants['formatConst']['MM'], this.preZero(date.month));
        } else {
            formatted = formatted.replace(this.datePickerConstants.constants['formatConst']['M'], String(date.month));
        }

        if (dateFormat.indexOf(this.datePickerConstants.constants['formatConst']['DD']) !== -1) {
            formatted = formatted.replace(this.datePickerConstants.constants['formatConst']['DD'], this.preZero(date.day));
        } else {
            formatted = formatted.replace(this.datePickerConstants.constants['formatConst']['D'], String(date.day));
        }
        return formatted;
    }

    preZero(val: number): string {
        return val < 10 ? "0" + val : String(val);
    }
    isDisabled(sDate: IXgDate, sMinDate: any, sMaxDate: any): boolean {
        const sDateTime = this.getTimeInMilliseconds(sDate);
        const sMinDateTime = sMinDate ? this.getTimeInMilliseconds(sMinDate) : 0;
        const sMaxDateTime = sMaxDate ? this.getTimeInMilliseconds(sMaxDate) : 0
        if (sMinDateTime && sMaxDateTime) {
            return sDateTime >= sMinDateTime && sDateTime <= sMaxDateTime;
        }
        else if (sMinDateTime && !sMaxDateTime) {
            return sDateTime >= sMinDateTime;
        }
        else if (!sMinDateTime && sMaxDateTime) {
            return sDateTime <= sMaxDateTime;
        }
        else {
            return true;
        }
    }
    getTimeInMilliseconds(date: IXgDate): number {
        return new Date(date.year, date.month - 1, date.day, 0, 0, 0, 0).getTime();
    }
    validateDate(sValue, sFormatter, oMonthLabels) {
        // if (sValue.length !== sFormatter.length) {
        //     return false;
        // }
        const daysInMonth: Array<number> = [
            31,
            28,
            31,
            30,
            31,
            30,
            31,
            31,
            30,
            31,
            30,
            31
        ];
        const isMonthStr: boolean = sFormatter.indexOf(this.datePickerConstants.constants['formatConst']['MMM']) !== -1;
        const delimeters: Array<string> = this.getDateFormatDelimeters(sFormatter);
        let re: any = new RegExp("[" + delimeters[0] + "]");
        let ds: Array<string> = sValue.split(re);
        let df: Array<string> = sFormatter.split(re);
        if (ds.length !== df.length) {
            return false;
        }
        const dateValue: Array<IXgDateFormat> = this.getDateValue(
            sValue,
            sFormatter,
            delimeters
        );
        let year: number = this.getNumberByValue(dateValue[0]);
        let month: number = isMonthStr
            ? this.getMonthNumberByMonthName(dateValue[1], oMonthLabels)
            : this.getNumberByValue(dateValue[1]);
        let day: number = this.getNumberByValue(dateValue[2]);
        const currentDay: IXgDate = this.getCurrentDay();
        if (month !== -1 && day !== -1 && year !== -1) {
            if (sFormatter.indexOf(this.datePickerConstants.constants['formatConst']['YYYY']) === -1 && dateValue[0].value.length === 2) {
                year = dateValue[0].value.indexOf("0") === 0 ? parseInt(`${Math.floor(currentDay.year / 100)}0${year}`, 10) : parseInt(`${Math.floor(currentDay.year / 100)}${year}`, 10)
            }
            if (sFormatter.indexOf(this.datePickerConstants.constants['formatConst']['DD']) === -1 && dateValue[2].value.length === 2) {
                day = dateValue[0].value.indexOf("0") === 0 ? parseInt(`${Math.floor(currentDay.day / 100)}0${day}`, 10) : parseInt(`${Math.floor(currentDay.day / 100)}${day}`, 10)
            }
            if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
                daysInMonth[1] = 29;
            }
            if (year < 1000 || year > 9999 || month < 1 || month > 12 || ((month > 0 && month < 13) && (day < 1 || day > daysInMonth[month - 1]))) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            return false;
        }
    }

}

