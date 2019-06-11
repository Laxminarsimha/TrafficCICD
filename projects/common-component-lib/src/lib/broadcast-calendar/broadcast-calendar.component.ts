import { Component, OnInit } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';

@Component({
    selector: 'img-lib-broadcast-calendar',
    templateUrl: './broadcast-calendar.component.html',
    styleUrls: ['./broadcast-calendar.component.css'],
})
export class BroadcastCalendarComponent {
    date1: Date;
    locale: string = 'en';
    localeConfig: any;
    availableLocales: any = {
        es: {
            firstDayOfWeek: 1,
            dayNames: [
                'domingo',
                'lunes',
                'martes',
                'miércoles',
                'jueves',
                'viernes',
                'sábado',
            ],
            dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
            dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
            monthNames: [
                'enero',
                'febrero',
                'marzo',
                'abril',
                'mayo',
                'junio',
                'julio',
                'agosto',
                'septiembre',
                'octubre',
                'noviembre',
                'diciembre',
            ],
            monthNamesShort: [
                'ene',
                'feb',
                'mar',
                'abr',
                'may',
                'jun',
                'jul',
                'ago',
                'sep',
                'oct',
                'nov',
                'dic',
            ],
            today: 'Hoy',
            clear: 'Borrar',
        },
        en: {
            firstDayOfWeek: 1,
            dayNames: [
                'Sunday',
                'Monday',
                'Tuesday',
                'Wednesday',
                'Thursday',
                'Friday',
                'Saturday',
            ],
            dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            monthNames: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ],
            monthNamesShort: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
            ],
            today: 'Today',
            clear: 'Clear',
        },
    };
    width: number = 200;
    invalidDates: any = [];
    invalidDaysOfTheWeek: any = [2];
    minDate: Date = new Date('10/29/2018');
    maxDate: Date = new Date('11/28/2018');
    constructor() {
        console.log(this.minDate.getFullYear());
    }
    ngOnInit() {
        this.localeConfig = this.availableLocales[this.locale];
    }
    onSelect(e) {
        console.log(e);
    }
    onMonthChange(e) {
        console.log(e);
    }
    onFocus(e) {
        console.log(e);
    }
}
