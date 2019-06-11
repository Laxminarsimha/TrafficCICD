import { Component, OnInit } from '@angular/core';
import { LibraryService } from './services/library.service';
import {
    LibraryHeader,
    LibraryType,
    LibraryItem,
    LibraryItemUsage
} from './models/library.model';
import { Advertiser } from 'src/app/Customer/customer/model/customer.model';
import { MessageService } from 'primeng/api';
import { timeout } from 'rxjs/operators';
import { isUndefined } from 'util';
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder
} from '@angular/forms';

@Component({
    selector: 'app-library',
    templateUrl: './library.component.html',
    styleUrls: ['./library.component.scss'],
    providers: [LibraryService, MessageService]
})
export class LibraryComponent implements OnInit {
    public libraryItem: LibraryItem;
    public libraryTypes: LibraryType[];
    public advertisers: Advertiser[];
    public gridData: any[] = [{}];
    dayNames = [];
    public detailMessage: any;
    public libraryForm: FormGroup;
    public minStartDate: Date;
    public libraryItemUsageList: LibraryItemUsage[];
    public startDay: string;
    public EndDay: string;
    constructor(
        private LibraryService: LibraryService,
        private messageService: MessageService,
        private formBuilder: FormBuilder
    ) {}

    ngOnInit() {
        this.libraryTypes = [
            // {
            //     LibraryId: 1,
            //     LibraryName: 'Announcements'
            // },
            // {
            //     LibraryId: 2,
            //     LibraryName: 'Programming'
            // },
            {
                LibraryId: 1,
                LibraryName: 'Commercial'
            }
        ];

        this.getAdvertisers();
        this.libraryItem = new LibraryItem();
        this.minStartDate = new Date();
        this.libraryItem.StartDate=new Date();
        this.dayNames = this.getDays();

        this.libraryForm = this.formBuilder.group({
            Advertiserdto: [null, [Validators.required]],
            LibraryItemtypeId: [],
            Title: [null, [Validators.pattern('[a-zA-Z0-9]*')]],
            IsciAdId: [],
            Length: [],
            ContentId: [],
            ContentDuration: [],
            ExternalId: [],
            IsVariableLength: [],
            minStartDate: [],
            ExpirationDate: [null, [Validators.required]],
            StartDate: [null, [Validators.required]],
            StartTime: [], //[null, [this.StartTimeValidator()]],
            EndTime: [], //[null, [this.EndTimeValidator()]],
            EnableSpecificDays: [],
            MaximumLength: [null, [Validators.required]],
            MinimumLength: [null, [Validators.required]]
        });
        // console.log(this.dayNames);
    }

    private getAdvertisers() {
        this.LibraryService.GetAdvertisers().subscribe((res: any[]) => {
            this.advertisers = Object.assign([], res);
        });
    }
    submitForm(form) {
        this.libraryItem.LibraryItemUsageDTO = this.dayNames;
        this.libraryItem.LibraryItemtypeId =
            this.libraryItem.LibraryItemtypeId == 1 ? 1 : undefined;
        let message = '';
        message = this.validateLibrary(message);
        var daysValidationMessage = '';
        this.libraryItem.LibraryItemUsageDTO.forEach(e => {
            e['DaysOfWeek'] = e['usage'].DaysOfWeek;
            e['StartTime'] = e['usage'].StartTime;
            e['EndTime'] = e['usage'].EndTime;
            e['Enabled'] = e['usage'].Enabled;
            e['Selected'] = e['usage'].Selected;
            e['CreatedDate'] = e['usage'].CreatedDate;
            e['CreatedBy'] = e['usage'].CreatedBy;
            e['ModifiedDate'] = e['usage'].ModifiedDate;
            e['ModifiedBy'] = e['usage'].ModifiedBy;
            if (this.libraryItem.EnableSpecificDays) {
                if (e['usage'].StartTime >= e['usage'].EndTime) {
                    daysValidationMessage +=
                        '<div>Start time is greater than end time for ' +
                        this.getDays()[e['usage'].DaysOfWeek].value +
                        '</div>';
                }
            }
        });
        message += daysValidationMessage;
        if (message.length > 0) {
            this.detailMessage = message;
            this.messageService.add({
                severity: 'error',
                summary: 'library Component',
                detail: '',
                life: 5000
            });
            return;
        } 
        // else if (!this.libraryForm.valid) {
        //     return;
        // }

        this.LibraryService.AddCommercial(this.libraryItem).subscribe(
            (res: any[]) => {
                this.messageService.add({
                    severity: 'success',
                    summary: 'library Component',
                    detail: 'Library component saved successfully',
                    life: 3000
                });
                this.CancelLibrary();
            },
            err => {}
        );
    }
  private validateLibrary(message: string) {
    if (!this.libraryItem.StartDate ||
      isUndefined(this.libraryItem.LibraryItemtypeId) ||
      this.libraryItem.Advertiserdto.length <= 0) {
      message = `The following fields should not be empty :  
            <div>${!(this.libraryItem.Advertiserdto && this.libraryItem.Advertiserdto.length > 0) ? 'Advertiser' : ''}</div>
            <div>${isUndefined(this.libraryItem.LibraryItemtypeId) ? 'Library Type' : ''}</div>  
            <div>${!this.libraryItem.Title ? 'Title' : ''}</div> 
            <div>${!this.libraryItem.StartDate ? 'StartDate' : ''}</div>  
            `;
    }
    if (!this.libraryItem.StartTime || !this.libraryItem.EndTime) {
      if (!this.libraryItem.EnableSpecificDays) {
        if (!message)
          message += `The following fields should not be empty :  `;
        message += `<div>${!this.libraryItem.StartTime ? 'StartTime' : ''}</div>  
                        <div>${!this.libraryItem.EndTime ? 'EndTime' : ''}</div>  `;
      }
    }
    if (this.libraryItem.IsVariableLength &&
      this.libraryItem.MinimumLength >= this.libraryItem.MaximumLength) {
      message +=
        'Minimum variable length should be less than maximum variable length';
    }
    let regEx = new RegExp(/^[a-zA-Z0-9]*$/);
    if (!regEx.test(this.libraryItem.Title)) {
      message += "Title must be alphanumeric";
    }
    return message;
  }

    public getDayName(e, sIndex) {
        const oDay = this.dayNames[sIndex];

        oDay.valid = true;

        let isValid = oDay.valid;
        oDay.usage.Selected = !oDay.usage.Selected;
        oDay.usage.Enabled = isValid;
    }
    public changeDate(e) {
        this.getSetUsageTimes(true);
    }
    public getSetUsageTimes(datechange) {
        if (!(this.libraryItem.StartDate)) return;
        this.startDay = this.libraryItem.StartDate.toString().substr(0, 3);
        if(this.libraryItem.EndDate)
            this.EndDay = this.libraryItem.EndDate.toString().substr(0, 3);
        const startDateIndex = this.dayNames.findIndex(
            x => x.value == this.startDay
        );
        if (
            this.libraryItem.StartDate &&
            this.libraryItem.EndDate
        ) {
            
            let dateDiff =
                this.libraryItem.EndDate.getTime() -
                this.libraryItem.StartDate.getTime();
            const cd = 24 * 60 * 60 * 1000;
            dateDiff = Math.round(dateDiff / cd);
            if (datechange) {
                this.dayNames.forEach(e => {
                    e.usage.Selected = false;
                    e.usage.Enabled = false;
                });
                for (
                    let i = startDateIndex;
                    i <= startDateIndex + dateDiff;
                    i++
                ) {
                    let n = i > 6 ? i - 7 : i;
                    const selectedDay = this.dayNames[n];
                    selectedDay.usage.Selected = true;
                    selectedDay.usage.Enabled = true;
                }
            }

            if (!this.libraryItem.EnableSpecificDays) {
                this.dayNames.forEach(e => {
                    e.usage.StartTime = '00:00:00';
                    e.usage.EndTime = '23:59:59';
                });
                if (this.libraryItem.StartTime)
                    this.dayNames[
                        startDateIndex
                    ].usage.StartTime = this.libraryItem.StartTime;
                let endDayIndex = this.dayNames.findIndex(
                    x => x.value == this.EndDay
                );
                if (this.libraryItem.EndTime)
                    this.dayNames[
                        endDayIndex
                    ].usage.EndTime = this.libraryItem.EndTime;
            }
        }
        //when only startdate is entered, select and enable all days
        //set starttime to startdate
        else if (!this.libraryItem.EndDate){
            if(datechange)
                this.dayNames.forEach(e => {
                    e.usage.Selected = true;
                    e.usage.Enabled = true;
                });
            if (!this.libraryItem.EnableSpecificDays) {
                this.dayNames.forEach(e => {
                    e.usage.StartTime = '00:00:00';
                    e.usage.EndTime = '23:59:59';
                });
                if (this.libraryItem.StartTime)
                    this.dayNames[startDateIndex].usage.StartTime = this.libraryItem.StartTime;
            }
        }
    }
    public onDayTimeSwitch(e) {
        this.libraryItem.EnableSpecificDays = e;
        if (!e) {
            this.getSetUsageTimes(false);
        }
    }
    public onStartEndTimeChange(e) {
        this.getSetUsageTimes(false);
    }
    public variableLengthToggle(e) {
        this.libraryItem.IsVariableLength = e;
    }
    public getDays() {
        return [
            { valid: false, value: 'Mon', usage: this.getflightDateByDay(0) },
            { valid: false, value: 'Tue', usage: this.getflightDateByDay(1) },
            { valid: false, value: 'Wed', usage: this.getflightDateByDay(2) },
            { valid: false, value: 'Thu', usage: this.getflightDateByDay(3) },
            { valid: false, value: 'Fri', usage: this.getflightDateByDay(4) },
            { valid: false, value: 'Sat', usage: this.getflightDateByDay(5) },
            { valid: false, value: 'Sun', usage: this.getflightDateByDay(6) }
        ];
    }
    getflightDateByDay(day: number) {
        let libraryItemUsage = new LibraryItemUsage();
        libraryItemUsage.DaysOfWeek = day;
        libraryItemUsage.StartTime = '00:00:00';
        libraryItemUsage.EndTime = '23:59:00';
        libraryItemUsage.Enabled = false;
        libraryItemUsage.Selected = false;
        libraryItemUsage.CreatedDate = new Date();
        libraryItemUsage.CreatedBy = 'Admin';
        libraryItemUsage.ModifiedDate = new Date();
        libraryItemUsage.ModifiedBy = 'Admin';
        // this.libraryItemUsageList.push(libraryItemUsage);
        return libraryItemUsage;
    }
    public CancelLibrary() {
        this.libraryItem = new LibraryItem();
        this.minStartDate = new Date();
        this.dayNames = this.getDays();
    }
}
