import { Component, OnInit, NgModule, Input, ViewEncapsulation, forwardRef, Output, EventEmitter } from '@angular/core';
import { SharedModule } from 'primeng/components/common/shared';
import { XgTypeaheadComponentModule } from '../xg-typeahead/xg-typeahead.component';
import { MultiRequiredValidator } from '../xg-typeahead/directives/xg-multi-requireValidator';
import { XgColumnListItemComponent } from '../xg-column-list-item/xg-column-list-item.component';
import { HttpClient } from '@angular/common/http';
import { XgObjectUtils } from '../shared/utilities';
import { Observable } from 'rxjs';
import { IXgAdvertisercolumns } from './xg-advertiser.interface';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { map } from 'rxjs/operators';
@Component({
  selector: 'xg-advertise',
  templateUrl: './xg-advertise.component.html',
  styleUrls: ['./xg-advertise.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => XgAdvertiseComponent), multi: true }
  ]
})
export class XgAdvertiseComponent implements OnInit, ControlValueAccessor {
  private tableColumns: IXgAdvertisercolumns[];
  private tableDataSource: any;
  private labelName: string;
  private aPlaceholder: string;
  private aDisabled: boolean;
  private aRequired: boolean;
  private sAdvertiseModel: string;
  private sAdvertiseModalData: object;
  public onSearchFun: Function;
  private sMaximumLength: number;
  private onChangeAdvertise: (_: any) => void = () => { };
  private onTouchedAdvertise: () => void = () => { };
  @Output('onValueChange') onValueChange = new EventEmitter<any>();
  @Input() sourceUrl: string;

  @Input()
  get advertiseModel() {
    return this.sAdvertiseModel;
  }
  set advertiseModel(value: any) {
    this.sAdvertiseModel = value;
  }
  @Input()
  get columns() {
    return this.tableColumns;
  }
  set columns(value: IXgAdvertisercolumns[]) {
    this.tableColumns = value;
  }
  @Input()
  get maxlength() {
    return this.sMaximumLength;
  }
  set maxlength(value) {
    this.sMaximumLength = value;
  }
  @Input()
  get dataSource() {
    return this.tableDataSource;
  }
  set dataSource(value: any) {
    this.tableDataSource = value;
  }
  @Input()
  get label() {
    return this.labelName;
  }
  set label(value: string) {
    this.labelName = value || 'Advertiser';
  }

  @Input()
  get placeholder() {
    return this.aPlaceholder;
  };
  set placeholder(value) {
    this.aPlaceholder = value || 'Enter advertiser name';
  }
  @Input()
  get disabled() {
    return this.aDisabled;
  }
  set disabled(value) {
    this.aDisabled = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get required() {
    return this.aRequired;
  }
  set required(value) {
    this.aRequired = XgObjectUtils.coerceBooleanProperty(value);
  }

  constructor(private http: HttpClient) {
    this.labelName = "";
    this.aPlaceholder = "";
    this.tableDataSource = [];
    this.tableColumns = [];
    this.sAdvertiseModel = '';
    this.tableColumns = [];
    this.sAdvertiseModalData = {};
    this.onSearchFun = this.onSearch.bind(this);
  }
  ngOnInit() {

  }
  onSearch($event) {
    if (this.dataSource && this.dataSource.length) {
      const that = this;
      return new Observable(observer => {
        const aFilteredArray = that.dataSource.filter(
          oDataSource => {
            const aSearchColumns = this.columns.filter(oColumn => oColumn.searchOn === true);
            let bIsfound = false;
            aSearchColumns.forEach((oSearchColumn) => {
              if ((oDataSource[oSearchColumn['field']] || '').toString().toLowerCase().indexOf($event.toLowerCase()) > -1) {
                bIsfound = true;
              }
            })
            return bIsfound;
          })
        observer.next(aFilteredArray)
      })
    } else if (this.sourceUrl) {
      return this.http.get(this.sourceUrl);
    }
    else {
      return new Observable(observer => {
        observer.next([])
      })
    }

  }
  getSelelctedData(oSelectedObject) {
    this.sAdvertiseModalData = oSelectedObject
    this.advertiseModel = this.getKeyValue();
    if (this.onValueChange.observers && this.onValueChange.observers.length) {
      this.onValueChange.emit(oSelectedObject);
    }
    this.onChangeAdvertise(oSelectedObject);
  }
  getKeyValue() {
    const aKeyColumns = this.columns.filter(oColumn => oColumn.key === true);
    let sKeyString = '';
    if (Object.keys(this.sAdvertiseModalData).length) {
      aKeyColumns.forEach((oKeyColumn) => {
        sKeyString = sKeyString ? `${sKeyString},${this.sAdvertiseModalData[oKeyColumn['field']]}` : `${this.sAdvertiseModalData[oKeyColumn['field']]}`
      })
    }
    return sKeyString;
  }
  writeValue(oModelObject: object) {
    if (XgObjectUtils.isObject(oModelObject)) {
      this.sAdvertiseModalData = oModelObject;
      this.advertiseModel = this.sAdvertiseModel = this.getKeyValue();
    }
  }

  registerOnChange(fn: (_: any) => void): void { this.onChangeAdvertise = fn; }
  registerOnTouched(fn: () => void): void { this.onTouchedAdvertise = fn; }

}
@NgModule({
  imports: [SharedModule, XgTypeaheadComponentModule],
  exports: [XgAdvertiseComponent, SharedModule, XgColumnListItemComponent],
  declarations: [XgAdvertiseComponent, XgColumnListItemComponent],
  providers: []
})
export class XgAdvertiseModule { }
