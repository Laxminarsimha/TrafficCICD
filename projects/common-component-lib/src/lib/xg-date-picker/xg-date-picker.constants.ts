export class DatePickerConstants {
    public constants: any;
    constructor() {
        const oMonthLabels = {
            1: "Jan",
            2: "Feb",
            3: "Mar",
            4: "Apr",
            5: "May",
            6: "Jun",
            7: "Jul",
            8: "Aug",
            9: "Sep",
            10: "Oct",
            11: "Nov",
            12: "Dec"
        };
        const oDayLabels = {
            su: "S",
            mo: "M",
            tu: "T",
            we: "W",
            th: "T",
            fr: "F",
            sa: "S"
        };
        const oFormatConst = {
            M: "M",
            MM: "MM",
            MMM: "MMM",
            D: "d",
            DD: "dd",
            YYYY: "yyyy",
            YY: "yy"
        }
        const aWeekDays = ["su", "mo", "tu", "we", "th", "fr", "sa"]
        this.constants = {
            monthLabels: oMonthLabels,
            weekDays: aWeekDays,
            dayLabels: oDayLabels,
            formatConst: oFormatConst
        };
        Object.freeze(this.constants);
    }
}