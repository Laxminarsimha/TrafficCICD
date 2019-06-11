import {
  NgModule,
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  OnChanges,
  QueryList,
  ContentChild,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation,
  ContentChildren,
  AfterContentInit
} from '@angular/core';
import { xgGridModel } from './domain/grid-columns';
// import { UtilitiesService } from 'src/app/shared/services/utilities.service';
import { Subscription } from 'rxjs';
import * as _ from 'underscore';
import 'hammerjs';
import { xgDataExportProcessingMode, xgDataExportSelctionMode } from './sub-components/xg-grid-data-export/xg-grid-data-export.component';
import { xgAPIService } from './services/api-base';
import { SaveDataService } from './services/save-data.service';
import { xgCustomCellTemplateDirective } from './sub-components/dynamic-form/dynamic-field/custom-cell-template.directive'


export class UtilitiesService {

  constructor() { }

  public sortBy(array, iteratee, delegate?) {
    return _.sortBy(array, iteratee, delegate);
  }

  public each(array, delegate) {
    return _.each(array, delegate);
  }
}

@Component({
  selector: 'xg-grid',
  templateUrl: './xg-grid.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./xg-grid.component.scss'],
})
export class XgGridComponent implements OnInit, OnChanges, AfterContentInit {

  // * Data and Configuration Options
  @Input() gridConfig: xgGridModel.Configuration;
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Input() logEventsToConsole: boolean = true;
  @Input() devMode: boolean = false;
  // @Input() customIconsConfig: any[] = [];

  // * Filtering Options
  @Input() enableGlobalFilter: boolean = true;
  @Input() showColumnFilterRow: boolean = false;
  @Input() showFilterLabels: boolean = false;
  @Input() showFilterColumnHighlighting: boolean = false;
  filteredRecordCount: number;
  filterCount: number = 0;

  // * Visualization Options
  @Input() captionLabel: string = 'Imagine Communications  - xg-grid';
  @Input() gridReadonly: boolean = false
  @Input() showCalculationsRow: boolean = false;
  @Input() showSummaryRow: boolean = true;
  @Input() showTotalRecordCount: boolean = true;
  @Input() showSelectedRecordCount: boolean = true;
  @Input() showToolbarSection: boolean = true;
  @Input() allowColumnReordering: boolean = true;
  @Input() allowColumnResize: boolean = true;
  @Input() allowColumnSorting: boolean = true;
  @Input() sortMode: xgGridModel.SortMode = xgGridModel.SortMode.Single;
  @Input() allowRowReordering: boolean = false;
  @Input() showRowHover: boolean = true;
  @Input() showColumnPicker: boolean = false;
  @Input() useAutoLayout: boolean = true;
  @Input() responsive: boolean = true;

  // * Selections
  @Input() allowRowSelection: boolean = false;
  @Input() useCheckBoxSelection: boolean = true;
  @Input() selectionMode: xgGridModel.SelectionMode = xgGridModel.SelectionMode.Single; //  TODO:  This needs to be addressed as in conlifct with the useCheckBoxSelection is redundant

  // * Scrollng / Paging
  @Input() usePagination: boolean = true;
  @Input() enableScrolling: boolean = false;
  @Input() scrollHeight: number = 250;
  @Input() pageRowCount: number = 5;
  @Input() lazyLoading: boolean = false;
  @Output() lazyLoadFunction: EventEmitter<any> = new EventEmitter;
  @Input() lazyLoadData: any[] = [];
  @Input() virtualScroll: boolean = false;


  // * LazySaving the data
  @Output() onGridDataChange: EventEmitter<any> = new EventEmitter();

  // * Editing Options
  @Input() enableActionsColumn: boolean = false;
  @Input() enableGridEdit: boolean = false;
  @Input() editMode: xgGridModel.GridEditMode = xgGridModel.GridEditMode.popup;
  @Input() enableFloatingActions: boolean = false;
  @Input() allowActions: boolean = true;
  @Input() outputMode: string = "Checkbox"
  // * Toolbar Specifics
  @Input() allowExport: boolean = false;
  @Input() exportProcessingMode: xgDataExportProcessingMode = xgDataExportProcessingMode.ClientSide;
  @Input() exportSelectionMode: xgDataExportSelctionMode = xgDataExportSelctionMode.All;

  // dynamic cell template
  @ContentChildren(xgCustomCellTemplateDirective) xgCustomCellTemplate: QueryList<any>;


  // * Serve-Side Specific
  ServerSideDataPackage: xgGridModel.ServerSide.DataPackage = new xgGridModel.ServerSide.DataPackage();

  // ! this is master details
  @Input() showDetailsRow: boolean = false;

  // * Grid action bar events
  @Output() onGridActionEvents: EventEmitter<any> = new EventEmitter();

  @ViewChild('dt') xgGrid: any;
  @ViewChild('op') devOptions: any;

  multiSortMeta: any[] = [];
  subscription: Subscription;
  selectedRecords: any[] = [];
  selectedTargetRecords: any[] = []; // For the D&D records (Target Set)
  showActionsToolbar: boolean = false;
  frozenColumns: any;
  rowGroupMetadata: any;
  rowIndex: any;
  testSelectedRecords: any = [];
  isRowHoveredOrSelected: boolean = false;
  hoverIndex: number = -1;

  draggedRecord: any = null;
  draggedRecords: any[] = [];

  currentFilterColumnData: xgGridModel.FilterColumn = { column: null, searchFilter: '' };
  cellTemplateArray: any[] = [];

  _helper = new UtilitiesService();
  defaultActionConfiguration: xgGridModel.ToolbarActionSettings[] = [
    {
      actionType: 'edit',
      actionConfig: {
        iconClass: 'edit',
        visible: true,
        disabled: false
      }
    },
    {
      actionType: 'save',
      actionConfig: {
        iconClass: 'save',
        visible: true,
        disabled: false
      }
    },
    {
      actionType: 'undo',
      actionConfig: {
        iconClass: 'undo',
        visible: true,
        disabled: false
      }
    },
    {
      actionType: 'delete',
      actionConfig: {
        iconClass: 'delete',
        visible: true,
        disabled: false
      }
    },
    {
      actionType: 'remove_circle',
      actionConfig: {
        iconClass: 'remove_circle',
        visible: true,
        disabled: true
      }
    }
  ]
  constructor(private api: xgAPIService, private SaveDataService: SaveDataService) {
    var test = this.api.get('test', {
      headers: { 'xgGridDataPackage': JSON.stringify(this.ServerSideDataPackage) }
    });
  }
  extendActionItems() {
    const aActionConfiguration = this.gridConfig.toolbarActionSettings || [];
    this.defaultActionConfiguration.forEach((oAction, sIndexValue) => {
      const sIndex = aActionConfiguration.findIndex(oCustomAction => oCustomAction.actionType === oAction.actionType);
      if (sIndex !== -1) {
        this.defaultActionConfiguration.splice(sIndexValue, 1, aActionConfiguration[sIndex])

      }
    })
  }
  ngOnInit() {
    this.extendActionItems();
    this.gridConfig.columns.sort(function (a, b) { return a.ordinal - b.ordinal }); //Ensures that the Ordinal is honored
    this.multiSortMeta.push({ field: this.gridConfig.uniqueIdName, order: 1 }); // If multisort is turned on use this as a default order?

    this.updateRowGroupMetaData(); //  TODO - This needs to be something that we leverage for the Row Groupings
    this.ServerSideDataPackage.CurrentPage = 0; // Update the Server Side data package
    this.ServerSideDataPackage.PageCount = this.pageRowCount; // Update the Server Side data package

    this.SaveDataService.setDataKey(this.gridConfig.uniqueIdName)
    this.SaveDataService.setDebounceTime(this.gridConfig.editSettings.editDebounceTime)
    // subscribing the changedData
    this.SaveDataService.observableChange.subscribe((aChangedData) => {
      this.onGridDataChange.emit({ eventName: 'onGridChange', data: aChangedData });
    })

  }
  ngAfterContentInit() {
    console.log(this.xgCustomCellTemplate)
    if (this.xgCustomCellTemplate) {
      this.xgCustomCellTemplate.forEach((item) => {
        this.cellTemplateArray.push(item.cellContent)
      })
    }
    console.log(this.xgCustomCellTemplate)
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('data')) {
      // cleaaring changedData when ever data loads
      this.SaveDataService.changedData = [];
    }
  }

  dragStart(event, record: any) {
    this.draggedRecord = record;
    // Check for other records here
    let selectedRows = this.selectedRecords == null ? 0 : this.selectedRecords.length;
    if (selectedRows > 1) {
      this.draggedRecords = this.selectedRecords;
    }
    this.logEvent({ eventName: 'onDragStart', event: event, additionalData: record });
  }

  dragEnd(event) {
    this.draggedRecord = null;
    this.draggedRecords = null;
    this.logEvent({ eventName: 'onDragEnd', event: event });
  }

  drop($event) {    
    const multiRecordcount = this.draggedRecords == null ? 0 : this.draggedRecords.length;
    // if (this.draggedRecord && multiRecordcount <= 0) {
    //   const draggedRecordIndex = this.findIndex(this.draggedRecord);
    //   this.selectedTargetRecords = [...this.selectedTargetRecords, this.draggedRecord];
    //   this.data = this.data.filter((val, i) => i !== draggedRecordIndex);
    //   this.draggedRecord = null;
    // } else if (multiRecordcount > 0) {
    //   this.draggedRecords.forEach(element => {
    //     this.selectedTargetRecords = [...this.selectedTargetRecords, element];
    //     this.data.splice(this.findIndex(element), 1);
    //   });
    //   this.selectedRecords = null;
    //   this.draggedRecords = null;
    // }
  }
  // EVENTS SECTION ===================================

  onRowSelect(event) {
    this.showActionsToolbar = (this.selectedRecords.length > 0 && this.enableGridEdit) && (this.gridConfig.editSettings.editMode == 'popup');
    this.ServerSideDataPackage.SelectedRecords.push(event.data[this.gridConfig.uniqueIdName]); // Update the Server Side data package
    this.onGridDataChange.emit({ eventName: 'onRowSelect', event: this.selectedRecords });
    this.logEvent({ eventName: 'onRowSelect', event: event });
  }

  onRowUnselect(event) {
    this.showActionsToolbar = (this.enableGridEdit) && (this.gridConfig.editSettings.editMode == 'popup');
    this.ServerSideDataPackage.SelectedRecords.splice(this.ServerSideDataPackage.SelectedRecords.indexOf(event.data[this.gridConfig.uniqueIdName]), 1); // Update the Server Side data package
    this.onGridDataChange.emit({ eventName: 'onRowUnSelect', event: this.selectedRecords });
    this.logEvent({ eventName: 'onRowUnSelect', event: this.selectedRecords });
  }

  onRowReorder(event) {
    // Need to switch based on multiple selection
    if (this.selectedRecords && this.selectedRecords.length > 1) {

      this.selectedRecords = this._helper.sortBy(this.selectedRecords, this.gridConfig.uniqueIdName)
      let savedRecords = [];

      this.selectedRecords.forEach(element => {
        savedRecords.push(this.data.splice(this.data.indexOf(element), 1)[0]);
      });
      if (this.selectedRecords.includes(this.data[event.dropIndex])) {
        var duplicatedRecord = savedRecords.splice(this.selectedRecords.indexOf(this.data[event.dropIndex]), 1);
      }
      savedRecords = this._helper.sortBy(savedRecords, this.gridConfig.uniqueIdName)
      for (let index = 0; index < savedRecords.length; index++) {
        this.data.splice(event.dragIndex < event.dropIndex ? (event.dropIndex - savedRecords.length + index) : event.dropIndex + index, 0, savedRecords[index]); // Place
      }

      if (duplicatedRecord)
        this.selectedRecords.push(duplicatedRecord[0]);
    }
    // console.log({ eventName: 'onRowReorder', event: event, dragRow: this.draggedRecord, dropRow: this.data[event.dropIndex + 1] })
    this.onGridDataChange.emit({ eventName: 'onRowReorder', event: event, dragRow: this.draggedRecord, dropRow: this.data[event.dropIndex + 1] });
    this.logEvent({ eventName: 'onRowReorder', event: event });
  }

  onGridPage(event) {
    this.ServerSideDataPackage.CurrentPage = event.first; // Update the Server Side data package
    this.ServerSideDataPackage.PageCount = event.rows; // Update the Server Side data package
    this.logEvent({ eventName: 'onPage', event: event });
  }

  handleGridOnFilter(event) {
    const filters = Object.keys(event.filters);
    this.filterCount = filters.length;
    /* remove Filter message on reset */
    let isAllFiltersReset = true;
    filters.forEach((sKey) => {
      if (event.filters[sKey]['matchMode'] !== 'reset') {
        isAllFiltersReset = false;
      }
      else {
        delete event.filters[sKey];
      }
    })
    this.ServerSideDataPackage.Filters = event.filters; // Update the Server Side data package
    if (event.filteredValue.length <= this.data.length && !isAllFiltersReset)
      this.filteredRecordCount = event.filteredValue.length;
    else
      this.filteredRecordCount = 0;
    if (isAllFiltersReset) {
      this.xgGrid.reset();
      this.filterCount = 0;
    }
    this.onGridDataChange.emit({ eventName: 'onGridFilter', event: event });
    this.logEvent({ eventName: 'onGridFilter', event: event });
  }

  onRowEnter(event, rowIndex) {
    this.isRowHoveredOrSelected = true;
    this.hoverIndex = rowIndex;
    this.logEvent({ eventName: 'onRowHover', event: event, suppressByDefault: true });
  }
  onRowLeave(event, rowIndex) {
    this.isRowHoveredOrSelected = false;
    this.hoverIndex = -1;
    this.logEvent({ eventName: 'onRowLeave', event: event, suppressByDefault: true });
  }

  filterChanged(event) {
    this.currentFilterColumnData = event;
    this.logEvent({ eventName: 'onFilterChange', event: { event: event, tableFilters: this.xgGrid.filters } });
  }
  onGridEditInit(event) {
    if (!event.field.canEdit == undefined || !event.field.canEdit == false && (this.gridConfig.editSettings && this.gridConfig.editSettings.editMode != xgGridModel.GridEditMode.popup))
      this.logEvent({ eventName: 'onEditInit', event: event });
  }
  onGridEditComplete(event) {
    let something = this.data[this.findIndex(event.data)];
    this.logEvent({ eventName: 'onEditComplete', event: event });
  }

  onCellEdited(event) {
    this.logEvent({ eventName: 'onCellEdited', event: event });
  }
  onSort(event) {
    this.multiSortMeta = event.multisortmeta;
    this.ServerSideDataPackage.SortData = this.sortMode == xgGridModel.SortMode.Single ? [event] : event.multisortmeta;
    this.updateRowGroupMetaData();
    this.logEvent({ eventName: 'onSort', event: event, additionalData: { ServerSideDataPackage: this.ServerSideDataPackage } });
  }
  onLazyLoad(event) {
    this.loading = true;

    //in a real application, make a remote request to load data using state metadata from event
    //event.first = First row offset
    //event.rows = Number of rows per page
    //event.sortField = Field name to sort with
    //event.sortOrder = Sort order as number, 1 for asc and -1 for dec
    //filters: FilterMetadata object having field as key and filter value, filter matchMode as value

    //imitate db connection over a networkx
    setTimeout(() => {
      var data = this.data;

      if (this.data) {
        var lazyLoadData = data.slice(event.first, (event.first + event.rows));
        this.lazyLoadData = lazyLoadData;
        this.loading = false;
      }
    }, 250);
    var newEvent = { originalEvent: event, ServerSideDataPackage: this.ServerSideDataPackage }
    this.lazyLoadFunction.emit(newEvent)
    this.logEvent({ eventName: 'onLazyLoad', event: newEvent });
  }

  // END EVENTS SECTION ===============================


  findIndex(record: any) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (record[this.gridConfig.uniqueIdName] === this.data[i][this.gridConfig.uniqueIdName]) {
        index = i;
        break;
      }
    }
    return index;
  }

  // Grid Utilities
  calculateDynamicColsCount() {
    let rValue = 0;
    if (this.useCheckBoxSelection === true) {
      rValue += 1;
    }
    if (this.allowRowReordering === true) {
      rValue += 1;
    }
    if (this.showDetailsRow === true) {
      rValue += 1;
    }
    return rValue;
  }

  calculateVisibleColumnCount() {
    let count = 0;
    this.gridConfig.columns.forEach(element => {
      if (element.display == 'table-cell')
        count += 1;
    });
    return count;
  }

  isRowSelected(dataItem) {
    if (this.selectedRecords && this.selectedRecords.length > 0) {
      let retValue = false;
      for (let i = 0; i < this.selectedRecords.length; i++) {
        if (dataItem[this.gridConfig.uniqueIdName] === this.selectedRecords[i][this.gridConfig.uniqueIdName]) {
          retValue = true;
          break;
        }
      }
      return retValue;
    }
  }
  getScrollHeight() {
    return this.scrollHeight.toString() + 'px';
  }

  logEvent(event: xgGridModel.xgGridEventLog) {
    if (this.logEventsToConsole && !event.suppressByDefault) {
      if (event.eventName === 'onRowSelect' || event.eventName === 'onRowUnSelect') {
        this.testSelectedRecords = this.selectedRecords;
      } else if (event.eventName === 'onBooleanChange') {
        this.selectedRecords = []
        this.testSelectedRecords = []
      }
    }
  }



  private updateRowGroupMetaData() {
    this.rowGroupMetadata = {};
    if (this.data) {
      for (let i = 0; i < this.data.length; i++) {
        let rowData = this.data[i];
        let DefaultSalesOffice = rowData.DefaultSalesOffice;
        if (i == 0) {
          this.rowGroupMetadata[DefaultSalesOffice] = { index: 0, size: 1 };
        }
        else {
          let previousRowData = this.data[i - 1];
          let previousRowGroup = previousRowData.brand;
          if (DefaultSalesOffice === previousRowGroup)
            this.rowGroupMetadata[DefaultSalesOffice].size++;
          else
            this.rowGroupMetadata[DefaultSalesOffice] = { index: i, size: 1 };
        }
      }
    }
  }

  memorySizeOf(obj) {
    var bytes = 0;

    function sizeOf(obj) {
      if (obj !== null && obj !== undefined) {
        switch (typeof obj) {
          case 'number':
            bytes += 8;
            break;
          case 'string':
            bytes += obj.length * 2;
            break;
          case 'boolean':
            bytes += 4;
            break;
          case 'object':
            var objClass = Object.prototype.toString.call(obj).slice(8, -1);
            if (objClass === 'Object' || objClass === 'Array') {
              for (var key in obj) {
                if (!obj.hasOwnProperty(key)) continue;
                sizeOf(obj[key]);
              }
            } else bytes += obj.toString().length * 2;
            break;
        }
      }
      return bytes;
    };

    function formatByteSize(bytes) {
      if (bytes < 1024) return bytes + " bytes";
      else if (bytes < 1048576) return (bytes / 1024).toFixed(3) + " KiB";
      else if (bytes < 1073741824) return (bytes / 1048576).toFixed(3) + " MiB";
      else return (bytes / 1073741824).toFixed(3) + " GiB";
    };

    return formatByteSize(sizeOf(obj));
  };

  checkAll() {
    this.onGridDataChange.emit({ eventName: 'onGridCheckAll', data: this.selectedRecords });
  }

  onActionsEvent(event) {
    this.onGridActionEvents.emit({ eventName: event.action, data: event.data });
    if (event.action === 'delete') {
      this.selectedRecords.forEach(element => {
        this.data.splice(this.data.indexOf(element), 1)[0];
      });
      this.selectedRecords = [];
      this.showActionsToolbar = false;
    }
    if (event.action === 'popupcancel') {    
      this.selectedRecords.forEach(element => {
        let index:number = this.data.indexOf(element);
        this.data.splice(index, 1, event.data[0]);
      });
      this.selectedRecords = [];
    }
  }

}


// @NgModule({
//   imports: [],
//   exports: [XgGridComponent],
//   declarations: [XgGridComponent],
//   providers: []
// })
// export class XgGridComponentModule { }