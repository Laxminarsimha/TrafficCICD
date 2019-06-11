import { NgModule, Component, OnInit, Input, AfterViewInit, Output, EventEmitter, ViewChild, TemplateRef, ElementRef, ContentChild, ViewEncapsulation } from '@angular/core';
import { XgObjectUtils } from '../shared/utilities';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { Header, Footer } from '../shared/xgDirectives';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { XgCheckboxComponentModule } from '../xg-checkbox/xg-checkbox.component';
import { XgButtonComponentModule } from '../xg-button/xg-button.component';
import { XgStandardListItemComponent, XgStandardListItemComponentModule } from '../xg-standard-list-item/xg-standard-list-item.component';
@Component({
  selector: 'xg-list',
  templateUrl: './xg-list.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./xg-list.component.scss']
})
export class XgListComponent implements OnInit, AfterViewInit {
  private bGrowing: boolean;
  private bMultiple: boolean;
  private aDataSource: any[];
  private sHeaderText: string;
  private bDelete: boolean;
  public listData: any[];
  private aDeletedList: any[];
  public bCheckedAll: boolean;
  public activeItem: any;
  public sListElementHeight: number;
  private sGrowingTreshold: number;
  public sFirst: number;
  public currentIndex: number;
  // public isRecordsSelected: boolean;
  public aSelectedList: any[];
  @ContentChild('xgCustomTemplate') xgCustomTemplate: TemplateRef<any>;
  @ContentChild(Header) xgHeader: TemplateRef<any>;
  @ContentChild(Footer) xgFooter: TemplateRef<any>;
  @ViewChild('viewport') viewPortViewChild: ElementRef;
  @ViewChild('content') listContentElement: ElementRef;
  @Output('onItemDelete') onItemDelete = new EventEmitter<any>();
  @Output('onItemUnselect') onItemUnselect = new EventEmitter<any>();
  @Output('onItemSelect') onItemSelect = new EventEmitter<any>();
  @ContentChild(XgStandardListItemComponent) standardListItemTemplate: XgStandardListItemComponent;
  @Input('loadData') loadData: Function;
  @Input()
  get growing() {
    return this.bGrowing;
  }
  set growing(value) {
    this.bGrowing = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get growingThreshold() {
    return this.sGrowingTreshold;
  }
  set growingThreshold(value) {
    this.sGrowingTreshold = XgObjectUtils.coerceNumberProperty(value) || 20;
  }
  @Input()
  get dataSource() {
    return this.aDataSource;
  }
  set dataSource(value) {
    let sData = [];
    if (XgObjectUtils.isArray(value)) {
      if (this.growing) {
        if (!this.loadData) {
          if (!(this.aDataSource && this.aDataSource.length)) {
            this.aDataSource = value;
          }
          sData = value.slice(this.sFirst, this.sGrowingTreshold);
        }
        else {
          sData = value;
        }
        sData = [...this.listData, ...sData]
      }
      else {
        this.aDataSource = value || [];
        sData = this.aDataSource;
      }
      this.listData = JSON.parse(JSON.stringify(sData || []));
      this.prepareListData();
    }
  }
  @Input()
  get headerText() {
    return this.sHeaderText;
  }
  set headerText(value) {
    this.sHeaderText = value || '';
  }
  @Input()
  get multiple() {
    return this.bMultiple;
  }
  set multiple(value) {
    this.bMultiple = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get delete() {
    return this.bDelete;
  }
  set delete(value) {
    this.bDelete = XgObjectUtils.coerceBooleanProperty(value);
  }
  constructor() {
    this.listData = [];
    this.aDeletedList = [];
    this.aDataSource = [];
    this.bGrowing = false;
    this.bDelete = false;
    this.bCheckedAll = false;
    this.sListElementHeight = 64;
    this.sGrowingTreshold = 20;
    this.currentIndex = 0;
    this.sFirst = 0;
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    const sListElement = this.listContentElement.nativeElement.querySelector('li');
    if (sListElement) {
      this.sListElementHeight = sListElement.clientHeight || 64;
    }
  }
  onListItemDelete($event, oItem, sIndex) {
    this.listData.splice(sIndex, 1);
    this.aDeletedList.push(oItem);
    if (this.onItemDelete.observers && this.onItemDelete.observers.length) {
      this.onItemDelete.emit({ originalData: this.aDataSource, deletedList: this.aDeletedList, deletedItem: oItem });
    }
    $event.stopPropagation();
  }
  onDelete() {
    if (this.bCheckedAll) {
      this.listData = [];
    }
    else {
      this.listData = this.getUnselectedList();
    }
    if (this.onItemDelete.observers && this.onItemDelete.observers.length) {
      this.onItemDelete.emit({ originalData: this.aDataSource, deletedList: JSON.parse(JSON.stringify(this.aSelectedList)) });
    }
    this.aSelectedList = [];
  }
  toggleCheckAllButton() {
    const isAtleastOneUnchecked = this.checkIsAtleastOneUnchecked();
    this.aSelectedList = this.getSelectedList();
    if (!this.bCheckedAll && !isAtleastOneUnchecked) {
      this.bCheckedAll = true;
    }
    if (this.bCheckedAll && isAtleastOneUnchecked) {
      this.bCheckedAll = false
    }
  }
  onSelect(sValue, oItem) {
    this.toggleCheckAllButton();
    if (this.multiple) {
      if (sValue) {
        if (this.onItemSelect.observers && this.onItemSelect.observers.length) {
          this.onItemSelect.emit(oItem);
        }
      }
      else {
        if (this.onItemUnselect.observers && this.onItemUnselect.observers.length) {
          this.onItemUnselect.emit(oItem);
        }
      }
    }
  }
  prepareListData() {
    this.listData.forEach((oListItem) => {
      if (!oListItem.hasOwnProperty('disabled')) {
        oListItem['disabled'] = false;
      }
      if (!oListItem.hasOwnProperty('selected')) {
        oListItem['selected'] = false;
      }
    })
  }
  onListClick($event, oItem, sIndex) {
    if (oItem.disabled) {
      return;
    }
    let selectOption = false;
    if (!this.multiple) {
      this.listData.forEach(oItemData => oItemData['selected'] = false);
      selectOption = true;
    }
    else {
      if ($event.target.closest('.list-item-content')) {
        selectOption = true;
      }
    }
    if (selectOption) {
      this.listData[sIndex].selected = !this.listData[sIndex].selected;
      this.toggleCheckAllButton();
      if (this.onItemSelect.observers && this.onItemSelect.observers.length) {
        this.onItemSelect.emit(oItem);
      }
    }
  }
  onScrollIndexChange(index: number) {
    let p = Math.floor(index / this.growingThreshold);
    if (p !== this.currentIndex) {
      this.currentIndex = p;
      this.sFirst = this.currentIndex * this.growingThreshold;
      if (this.loadData) {
        this.loadData({ recordIndex: this.sFirst, totalRecordsToLoad: this.growingThreshold }).subscribe((data) => {
          this.dataSource = data;
        })
      }
      else {
        this.dataSource = this.dataSource.splice(this.sFirst, this.growingThreshold)
      }
    }
  }
  onCheckboxAllChange($event) {
    if ($event) {
      this.listData.forEach(oItemData => oItemData['selected'] = true);
      this.aSelectedList = JSON.parse(JSON.stringify(this.listData))
    }
    else {
      this.listData.forEach(oItemData => oItemData['selected'] = false);
      this.aSelectedList = [];
    }
  }
  scrollTo(sIndex: number): void {
    if (this.viewPortViewChild && this.viewPortViewChild['elementRef'] && this.viewPortViewChild['elementRef'].nativeElement) {
      this.viewPortViewChild['elementRef'].nativeElement.scrollTop = sIndex * this.sListElementHeight;
    }
  }
  checkIsAtleastOneUnchecked() {
    return this.listData.find(oItemData => oItemData['selected'] === false)
  }
  getSelectedList() {
    return this.listData.filter(oItemData => oItemData['selected'] === true)
  }
  getUnselectedList() {
    return this.listData.filter(oItemData => oItemData['selected'] === false);
  }

}
@NgModule({
  imports: [CommonModule, SharedModule, XgStandardListItemComponentModule, ScrollingModule, XgCheckboxComponentModule, XgButtonComponentModule],
  exports: [XgListComponent, SharedModule, XgStandardListItemComponentModule],
  declarations: [XgListComponent],
  providers: []
})
export class XgListComponentModule { }
