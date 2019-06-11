import { Component, OnInit, Input, EventEmitter, Output, Optional, Inject } from '@angular/core';
import { xgGridModel } from '../../domain/grid-columns';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { inspectNativeElement } from '@angular/platform-browser/src/dom/debug/ng_probe';
import { ExportExcelService } from '../../services/export-excel.service';

export enum 
xgDataExportProcessingMode {
  ServerSide,
  ClientSide
}

export enum xgDataExportSelctionMode {
  Selection,
  All,
  UsersChoice
}

export enum xgDataExportMode {
  Default,
  Advanced,
  Automatic
}

export enum xgDataExportFormats {
  //PDF,
  XLSX,
  // CSV,
  // DOCX,
  // Sheets
}

@Component({
  selector: 'xg-grid-data-export',
  templateUrl: './xg-grid-data-export.component.html',
  styleUrls: ['./xg-grid-data-export.component.css']
})
export class XgGridDataExportComponent implements OnInit {

  @Input() ProcessingMode: xgDataExportProcessingMode = xgDataExportProcessingMode.ClientSide;
  @Input() SelectionMode: xgDataExportSelctionMode = xgDataExportSelctionMode.All;
  @Input() ExportMode: xgDataExportMode = xgDataExportMode.Default;


  @Input() displayOptions: boolean = false; // used to control the dialog visibility
  @Input() header: string = 'Export Options'; // TODO:  See if this is going to accept more complex items, like templates/controls etc.
  @Input() width: number = 500;
  @Input() minWidth: number = 350;
  @Input() maximizable: boolean = true;

  // * Dialog package
  @Input() colConfig: xgGridModel.Column[];
  @Input() selectedData: any[] = [];
  @Input() completeDataSet: any[] = []
  @Input() exportFileName: string = 'Exported Data';

  @Output() onClosed = new EventEmitter<boolean>();
  selectedExportFormat = xgDataExportFormats;
  selectedExportFormats =  [xgDataExportFormats.XLSX].toString();
  formatOutputOptions = Object.keys(this.selectedExportFormat).filter(f => !isNaN(Number(f)));
  constructor(@Optional() public dialogRef: MatDialogRef<XgGridDataExportComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, public excelService: ExportExcelService) { }

  ngOnInit() {
    this.colConfig = this.data.colConfig;
    this.selectedData = this.data.selectedData;
    this.completeDataSet = this.data.completeDataSet;
    this.exportFileName = this.data.gridTitle;
    this.checkAll({
      'checked': true
    })
  }

  onHide() {
    // Ensure that the input/outputs are in sync
    this.onClosed.emit(false);
    this.displayOptions = false;
  }

  showChecked(column: xgGridModel.Column) {
   return column.display.indexOf('none') < 0 ? true : false;
  }
  onCheckChange(event, column: xgGridModel.Column) {
    column.display = event.checked == true ? xgGridModel.ColumnDisplay.Visible : xgGridModel.ColumnDisplay.Hidden;
  }
  checkAll(event) {
    for (let index = 0; index < this.colConfig.length; index++) {
      this.onCheckChange(event, this.colConfig[index]);
    }
  }
  Export(AllRecords: boolean) {
    let ds = AllRecords ? this.completeDataSet : this.selectedData;
    this.excelService.exportAsExcelFile(this.translateOptionsToJson(ds), this.exportFileName, this.exportFileName);
  }

  private translateOptionsToJson(data: any) {
    var localData: any[] = [];
    var newItem = {};
    var visibleCols = [];
    //  Gather the visible columns for export
    this.colConfig.forEach(col => {
      if (col.display != 'none') {
        visibleCols.push({
          key: col.field,
          value: col.header
      });
      }
    });
    // Loop the passed data items reassign and export
    data.forEach(dataItem => {
      newItem = {};
      visibleCols.forEach(col => {
          newItem[col.value] = dataItem[col.key];
      });
      localData.push(newItem)
    });
    return localData;
  }
}
