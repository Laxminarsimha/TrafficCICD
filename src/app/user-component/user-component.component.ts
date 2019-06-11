import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ICommercial, IAdvertiserItems, IResponseObject } from './user-component.interface';
import { xgGridModel, XgGridComponent } from '@imaginecom/common-component-lib';
import { UserComponentService } from './services/user-component.service';
import { MessageService } from 'primeng/api';
import { LibraryService } from 'src/app/library/library/services/library.service';
import { LibraryType, LibraryItem, LibraryItemUsage } from 'src/app/library/library/models/library.model';
import { Advertiser, UserlibraryItem } from './user-component.interface';
import { isUndefined } from 'util';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatHorizontalStepper } from '@angular/material';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.scss'],
  providers: [LibraryService, MessageService]
})
export class UserComponentComponent implements OnInit {
  private oHeaderData: ICommercial;
  private selectedData: Array<any> = [];
  public gridData: IAdvertiserItems[];
  public gridConfig: xgGridModel.Configuration;
  public libraryItem: UserlibraryItem;
  public libraryTypes: LibraryType[];
  public advertisers: Advertiser[];
  public dayNames = [];
  public detailMessage: any;
  public libraryForm: FormGroup;
  public minStartDate: Date;
  public libraryItemUsageList: LibraryItemUsage[];
  public startDay: string;
  public EndDay: string;
  public hideHeaderData: boolean = true;
  public showXgPopUp : boolean = false;

  @ViewChild(XgGridComponent) gridReference: XgGridComponent;
  @ViewChild(MatHorizontalStepper) matStepper: MatHorizontalStepper;
  @Output() onSelection: EventEmitter<any> = new EventEmitter();
  @Input()
  get headerData() {
    return this.oHeaderData;
  }
  set headerData(value) {
    this.oHeaderData = value;
  }
  constructor(
    private userComponentService: UserComponentService,
    private messageService: MessageService,
    private LibraryService: LibraryService,
    private formBuilder: FormBuilder
  ) {
    this.selectedData = [];
    this.gridData = [{
      advertiser: '',
      length: '',
      id: null,
      title: '',
      isciAdId: '',
      contentId: '',
      startDate: null,
      endDate: null,
      days: ''
    }];
  }
  ngOnInit() {
    // Temporary static data
    // this.headerData = { advertiser: 'test', length: '00:00:00' }
    
    this.gridConfig = {
      uniqueIdName: 'id',
      toolbarActionSettings: [],
      columns: [{
        header: 'Title',
        field: 'title',
        dataType: 'string',
        ordinal: 0,
        width: 100
      },
      {
        header: 'ISCI_Ad ID',
        field: 'isciAdId',
        dataType: 'string',
        ordinal: 1
      },
      {
        header: 'Content ID',
        field: 'contentId',
        dataType: 'string',
        ordinal: 2
      }
      ,
      
      {
        header: 'Length',
        field: 'orderedLength',
        dataType: 'string',
        ordinal: 3
      },
      {
        header: 'Start Date',
        field: 'startDate',
        dataType: 'date',
        ordinal: 4
      },
      {
        header: 'End Date',
        field: 'endDate',
        dataType: 'date',
        ordinal: 5
      },
      {
        header: 'Start Time',
        field: 'startTime',
        dataType: 'string',
        ordinal: 6
      },
      {
        header: 'End Time',
        field: 'endTime',
        dataType: 'string',
        ordinal: 7
      }
      ,
      {
        header: 'Advertiser',
        field: 'advertiser',
        dataType: 'string',
        ordinal: 8
      }
      ],
      editSettings: {
        editEnabled: false,
        editMode: xgGridModel.GridEditMode.popup
      }
    };
    this.getGridData();
    this.getAdvertisers();
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
    this.libraryItem = new UserlibraryItem();
    this.minStartDate = new Date();
    this.libraryItem.StartDate = new Date();
    this.dayNames = this.getDays();
    this.libraryForm = this.formBuilder.group({
      Advertiserdto: [null, [Validators.required]],
      LibraryItemtypeId: [],
      Title: [null, [Validators.pattern('[a-zA-Z0-9]*'),Validators.required]],
      IsciAdId: [],
      Length: [],
      ContentId: [],
      ContentDuration: [],
      ExternalId: [],
      IsVariableLength: [],
      minStartDate: [],
      ExpirationDate: [null, [Validators.required]],
      StartDate: [null, [Validators.required]],
      StartTime: [],
      EndTime: [],
      EnableSpecificDays: [],
      MaximumLength: [null, [Validators.required]],
      MinimumLength: [null, [Validators.required]]
    });
  }
  public getGridData() {
    const oRequestObject = this.getRequestOject();
    
    this.userComponentService.getAdvertiserItems(oRequestObject).subscribe((oResponse: IResponseObject) => {
      if (oResponse.StatusCode == 200) {
        this.gridData = oResponse.Result;
      }
      else if (oResponse.StatusCode == 400) {
        this.messageService.add({
          severity: 'error',
          summary: 'Copy Component',
          detail: oResponse.Result.toString(),
          life: 2000
        });
      }
    }, (oError) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Copy Component',
        detail: oError.StatusText,
        life: 2000
      });
    })
  }
  public getRequestOject(): IAdvertiserItems {
    return {
      advertiser: this.headerData.advertiser,
      length: this.headerData.length,
      id: 0,
      title: '',
      isciAdId: '',
      contentId: '',
      startDate: null,
      endDate: null,
      startTime: '',
      endTime: '',
      days: ''
    }
  }
  public onGridChange(oEvent: any) {
    if (oEvent.eventName == "onRowSelect" || oEvent.eventName == "onRowUnSelect") {
      this.selectedData = JSON.parse(JSON.stringify(oEvent.event))
    }
  }
  public sendGridSelectedData() {
    if (!this.selectedData.length) {
      this.messageService.clear();
      this.messageService.add({
        severity: 'error',
        summary: 'Copy Component',
        detail: 'Select atleast one record.',
        life: 2000
      });
      return;
    }
    this.onSelection.emit({ data: this.selectedData });
  }
  public cancelGridSelectedData() {
    this.gridReference.selectedRecords = [];
    this.selectedData = [];

  }
  // library form code
  private getAdvertisers() {
    this.LibraryService.GetAdvertisers().subscribe((res: any[]) => {
      this.advertisers = Object.assign([], res);
    });
  }
  public submitForm(form) {
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
    const oAdvertiser = this.advertisers.find(oAdvertiser => oAdvertiser.advertiserId ===  this.libraryItem.Advertiserdto['advertiserId']);
    this.libraryItem.Advertiserdto = [oAdvertiser];
    this.LibraryService.AddCommercial(this.libraryItem).subscribe(
      (res: any[]) => {
        this.messageService.add({
          severity: 'success',
          summary: 'library Component',
          detail: 'Library component saved successfully',
          life: 2000
        });
        this.CancelLibrary();
        this.hideHeaderData = true;
        this.getGridData();
        this.matStepper.reset();
      },
      err => {
        this.messageService.add({
          severity: 'error',
          summary: 'library Component',
          detail: 'Something went wrong',
          life: 2000
        });
      }
    );
  }
  private validateLibrary(message: string) {
    
    if (!this.libraryItem.StartDate ||
      isUndefined(this.libraryItem.LibraryItemtypeId) ||
      !this.libraryItem.Advertiserdto) {
      message = `The following fields should not be empty :  
        <div>${!(this.libraryItem.Advertiserdto) ? 'Advertiser' : ''}</div>
        <div>${isUndefined(this.libraryItem.LibraryItemtypeId) ? 'Library Type' : ''}</div>  
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
    if (!this.libraryItem.Title) {
      if (!message) message += "The following fields should not be empty : Title";
      else message += "Title";
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
    if (this.libraryItem.EndDate)
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
    else if (!this.libraryItem.EndDate) {
      if (datechange)
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
  public getflightDateByDay(day: number) {
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
    return libraryItemUsage;
  }
  public CancelLibrary() {
    this.libraryItem = new UserlibraryItem();
    this.minStartDate = new Date();
    this.dayNames = this.getDays();
  }
  public onCreateChange() {
    this.hideHeaderData = false;
    const oAdvertiser = this.advertisers.find(oAdvertiser => oAdvertiser.advertiserId === this.headerData.advertiserId);
    this.libraryForm.get('Advertiserdto').setValue(oAdvertiser);
    this.libraryItem.Length = this.headerData.length;
  }
  public showPopUp(){
    alert();
    this.showXgPopUp = true;
  }
}


