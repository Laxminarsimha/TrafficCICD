import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { xgGridModel } from '../../domain/grid-columns';

export interface filterOption {
  value: string;
  iconClass: string;
  imageUrl: string;
  isImage: boolean;
}

export interface stringOptions {
  value: filterOption,
  label: string
}
export interface numberOptions {
  value: filterOption,
  label: string
}
export interface filterOptions {
  value: filterOption,
  label: string
}
export interface filterStorage {
  field: string;
  value: any;
  filterType: string;
}
@Component({
  selector: 'xg-grid-column-filter',
  templateUrl: './xg-grid-column-filter.component.html',
  styleUrls: ['./xg-grid-column-filter.component.scss']
})

export class XgGridColumnFilterComponent implements OnInit {
  @Input() column: xgGridModel.Column;
  @Input() showLabel: boolean = true;
  @Input() dataTableRef: Table;
  @Output() onFilterChanged = new EventEmitter<xgGridModel.FilterColumn>();
  @ViewChild('filterPanel') filterPanel: OverlayPanelModule;
  public startValue: any;
  public endValue: any;

  currentFilterValue: string = '';
  currentOverlayValue: string = '';

  selectedString = { value: 'contains', iconClass: '', imageUrl: 'assets/contains.png', isImage: true };
  selectedNumber = { value: 'equals', iconClass: 'fa fa-equals', imageUrl: '', isImage: false };
  selectedBoolean = { value: 'all', iconClass: '', imageUrl: '', isImage: false };

  StringOptions: stringOptions[] = [
    { value: { value: 'startsWith', iconClass: '', imageUrl: 'assets/startWith.png', isImage: true }, label: 'Starts With' },
    { value: { value: 'contains', iconClass: '', imageUrl: 'assets/contains.png', isImage: true }, label: 'Contains' },
    { value: { value: 'endsWith', iconClass: '', imageUrl: 'assets/endWith.png', isImage: true }, label: 'Ends With' },
    { value: { value: 'doesNotContain', iconClass: '', imageUrl: 'assets/doesnotContains.png', isImage: true }, label: 'Does not contain' },
    { value: { value: 'equals', iconClass: 'fa fa-equals', imageUrl: '', isImage: false }, label: 'Equals' },
    { value: { value: 'notEquals', iconClass: 'fa fa-not-equal', imageUrl: '', isImage: false }, label: 'Does not equal' },
    { value: { value: 'reset', iconClass: 'fa fa-search', imageUrl: '', isImage: false }, label: 'Reset' }
  ];

  NumberOptions: numberOptions[] = [
    { value: { value: 'equals', iconClass: 'fa fa-equals', imageUrl: '', isImage: false }, label: 'Equal To' },
    { value: { value: 'notEquals', iconClass: 'fa fa-not-equal', imageUrl: '', isImage: false }, label: 'Not Equal' },
    { value: { value: 'lt', iconClass: 'fas fa-less-than', imageUrl: '', isImage: false }, label: 'Less Than' },
    { value: { value: 'lte', iconClass: 'fa fa-less-than-equal', imageUrl: '', isImage: false }, label: 'Less than or Equal' },
    { value: { value: 'gt', iconClass: 'fa fa-greater-than', imageUrl: '', isImage: false }, label: 'Greater Than' },
    { value: { value: 'gte', iconClass: 'fa fa-greater-than-equal', imageUrl: '', isImage: false }, label: 'Greater Than or Equal' },
    { value: { value: 'btw', iconClass: 'fa fa-arrows-alt-h', imageUrl: '', isImage: false }, label: 'Between' },
    { value: { value: 'reset', iconClass: 'fa fa-search', imageUrl: '', isImage: false }, label: 'Reset' }
  ]
  BooleanOptions: filterOptions[] = [
    { value: { value: 'all', iconClass: '', imageUrl: '', isImage: false }, label: 'All' },
    { value: { value: 'true', iconClass: 'fa fa-check', imageUrl: '', isImage: false }, label: 'True' },
    { value: { value: 'false', iconClass: 'fa fa-times-circle', imageUrl: '', isImage: false }, label: 'False' }
  ]
  public filterArray: filterStorage[] = [];

  constructor() {
  }

  ngOnInit() {
  }
  onHidePanel() {
    this.currentOverlayValue = `${this.startValue}--${this.endValue}`;
    this.refreshGridFilters('input');
  }
  showPanel($event, oFilterPanel) {
    oFilterPanel.toggle($event)
  }
  refreshGridFilters(sTriggeredElement) {
    let filterValue: any;
    let currentValue = this.currentFilterValue || null;
    let triggerFilter = true;
    switch (this.column.dataType) {
      case 'string':
        if (this.selectedString.value === 'doesNotContain') {
          filterValue = 'doesNotContain';
          this.createNewCustomFilter(filterValue);
        }
        else if (this.selectedString.value === 'reset') {
          if (sTriggeredElement === 'dropDown') {
            filterValue = 'reset';
            this.currentFilterValue = '';
            this.createNewCustomFilter(filterValue);
          }
          else {
            triggerFilter = false;
          }
        }
        else {
          filterValue = this.selectedString.value;
        }
        break;
      case 'number':
        if (this.selectedNumber.value === 'reset') {
          if (sTriggeredElement === 'dropDown') {
            filterValue = 'reset';
            this.currentFilterValue = null;
            this.currentOverlayValue = '';
            this.startValue = '';
            this.endValue = '';
            this.createNewCustomFilter(filterValue);
          }
          else {
            this.startValue = '';
            this.endValue = '';
            triggerFilter = false;
          }
        }
        else if (this.selectedNumber.value === 'btw') {
          filterValue = 'between';
          currentValue = this.currentOverlayValue;
          this.createNewCustomFilter(filterValue);
        }
        else {
          filterValue = this.selectedNumber.value;
        }
        break;
      case 'boolean':
        if (this.selectedBoolean.value === 'reset') {
          if (sTriggeredElement === 'dropDown') {
            filterValue = 'reset';
            this.currentFilterValue = null;
            this.createNewCustomFilter(filterValue);
          }
          else {
            triggerFilter = false;
          }
        }
        else {
          filterValue = this.selectedBoolean.value;
          currentValue = this.selectedBoolean.value;
          this.createNewCustomFilter(filterValue);
        }
        break;
      case 'date':
        if (this.selectedNumber.value === 'reset') {
          if (sTriggeredElement === 'dropDown') {
            filterValue = 'reset';
            this.currentFilterValue = '';
            this.currentOverlayValue = '';
            this.startValue = '';
            this.endValue = '';
            this.createNewCustomFilter(filterValue);
          }
          else {
            this.startValue = '';
            this.endValue = '';
            triggerFilter = false;
          }
        }
        else if (this.selectedNumber.value === 'btw') {
          filterValue = 'between';
          currentValue = this.currentOverlayValue;
          this.createNewCustomFilter(filterValue);
        }
        else {
          filterValue = 'customDate';
          currentValue = this.currentFilterValue == null ? null : this.currentFilterValue.toLocaleString()
          this.createNewDateFilter(false, filterValue);
        }
        //Have to call the every time as the selectedNumber can change...hence the function being rewritten and not in the Init
        break;
      case 'time':
        if (this.selectedNumber.value === 'reset') {
          if (sTriggeredElement === 'dropDown') {
            filterValue = 'reset';
            this.currentFilterValue = '';
            this.currentOverlayValue = '';
            this.startValue = '';
            this.endValue = '';
            this.createNewCustomFilter(filterValue);
          }
          else {
            this.startValue = '';
            this.endValue = '';
            triggerFilter = false;
          }
        }
        else if (this.selectedNumber.value === 'btw') {
          filterValue = 'between';
          currentValue = this.currentOverlayValue;
          this.createNewCustomFilter(filterValue);
        }
        else {
          filterValue = 'customTime';
          currentValue = this.currentFilterValue == null ? null : this.currentFilterValue.toLocaleString()
          this.createNewDateFilter(true, filterValue);
        }
        // filterValue = 'customTime';
        // currentValue = this.currentFilterValue == null ? null : this.currentFilterValue.toLocaleString()
        // this.createNewDateFilter(true, filterValue); //Have to call the every time as the selectedNumber can change...hence the function being rewritten and not in the Init
        break;

    }
    if (triggerFilter) {
      this.dataTableRef.filter(currentValue, this.column.field, filterValue);
      this.onFilterChanged.emit({ column: this.column, searchFilter: this.currentFilterValue });
    }
    if (sTriggeredElement === 'dropDown') {
      this.currentOverlayValue = ''
    }
    if (this.selectedNumber.value === 'btw') {
      this.currentFilterValue = ''
    }
  }
  createNewCustomFilter(sFilterValue) {
    this.dataTableRef.filterConstraints[sFilterValue] = (value, filter): boolean => {
      switch (sFilterValue) {
        case 'doesNotContain':
          return (value || '').toLowerCase().indexOf(filter.toLowerCase()) === -1;
        case 'all':
          return true;
        case 'true':
          return String(value).toLowerCase() === 'true';
        case 'false':
          return String(value).toLowerCase() === 'false';
        case 'between':
          return this.isPresentInBetween(value, filter)
        case 'reset':
          return true;
      }

    }
  }
  isPresentInBetween(value, filter) {
    const filterValue = filter.split('--');
    const sDataValue = this.getParsedValue(value);
    const startValue = this.getParsedValue(filterValue[0]);
    const endValue = this.getParsedValue(filterValue[1]);
    return sDataValue > startValue && sDataValue < endValue;
  }
  getParsedValue(sValue) {
    let formattedValue = 0;
    switch (this.column.dataType) {
      case "number":
        formattedValue = /^\d+$/.test(sValue) ? parseInt(sValue, 10) : 0;
        break;
      case "date":
        formattedValue = new Date(sValue) instanceof Date ? new Date(sValue).getTime() : 0;
        break;
      case "time":
        formattedValue = this.getDateTime(sValue).getTime();
    }
    return formattedValue;
  }
  getDateTime(sValue) {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const value = sValue.replace(/\s/g, "");
    const regexParts = value.trim().match(/(\d+)[\.|:](\d+)(\w+)/);
    let hours = 0;
    let minutes = 0;
    if (regexParts) {
      if (/^\d+$/.test(regexParts[3])) {
        hours = parseInt(regexParts[1], 10);
        minutes = parseInt((regexParts[2] + regexParts[3]), 10);
      }
      else {
        hours = /am/i.test(regexParts[3]) ? parseInt(regexParts[1], 10) : regexParts[1] === "12" ? 12 : parseInt(regexParts[1], 10) + 12,
          minutes = parseInt(regexParts[2], 10);
      }
    }
    currentDate.setHours(hours);
    currentDate.setMinutes(minutes);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);
    return currentDate;
  }
  createNewDateFilter(useTime: boolean = false, filterValue: string) {
    //  Add to the grids filter functionality
    this.dataTableRef.filterConstraints[filterValue] = (value, filter): boolean => {
      // Make sure the value and the filter are Dates
      let vDate = new Date();
      let fDate = new Date();

      if (useTime) {
        vDate = this.getDateTime(value);
        fDate = this.getDateTime(filter)
      }
      else {
        vDate = new Date(value);
        fDate = new Date(filter);
        vDate.setHours(0, 0, 0, 0);

      }

      switch (this.selectedNumber.value) {
        case 'equals':
          return vDate.getTime() == fDate.getTime();
        case 'notEquals':
          return vDate.getTime() != fDate.getTime();
        case 'lt':
          return vDate.getTime() < fDate.getTime();
        case 'lte':
          return vDate.getTime() <= fDate.getTime();
        case 'gt':
          return vDate.getTime() > fDate.getTime();
        case 'gte':
          return vDate.getTime() >= fDate.getTime();
      }

    }
  }

  dateEntryChanged(event) {
    let isValidDate = this.checkForValidDate(event.target.value);
    console.log('Date Entry Changed: ', event.target.value, isValidDate);
  }

  checkForValidDate(value) {
    try {
      let dateAttempt = new Date(value);
      let testValue = dateAttempt.getTime();
      return true;
    }
    catch{
      // Swallow the exception here
      return false;
    }
  }

}