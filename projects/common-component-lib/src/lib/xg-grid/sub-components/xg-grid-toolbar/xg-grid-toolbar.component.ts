import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { xgGridModel } from '../../domain/grid-columns';
import { MatDialog, MatSnackBar } from '@angular/material';
import { XgGridDataEditorDialogComponent } from '../xg-grid-data-editor-dialog/xg-grid-data-editor-dialog.component';
import { XgGridDataExportComponent } from '../xg-grid-data-export/xg-grid-data-export.component';

@Component({
  selector: 'xg-grid-toolbar',
  templateUrl: './xg-grid-toolbar.component.html',
  styleUrls: ['./xg-grid-toolbar.component.scss']
})
export class XgGridToolbarComponent implements OnInit {
  @Input() showToolbar: boolean = false;
  @Input() showActions: boolean = false;
  @Input() actionData: any[];
  @Input() allData: any[] = [];
  @Input() devMode: boolean = false;
  @Input() enableGlobalFilter: boolean = false;
  @Input() showExport: boolean = false;
  @Input() showColumnPicker: boolean = false;
  @Input() allowReordering: boolean = false;
  @Input() xgGrid: any;
  @Input() gridConfig: xgGridModel.Configuration;
  @Input() devOptions: any;
  @Input() matColor: string = 'primary';
  @Input() gridTitle: string;
  @Input() customIconsConfig: any[] = [];
  @Output() onDeleteBtnClick = new EventEmitter();
  @Output() onSaveBtnClick = new EventEmitter();
  @Output() onCancelBtnClick = new EventEmitter();
  col: any;
  dialogRef: any; //  Refers to the instance of the dialog created

  displayExportOptions: boolean = false;
  oldData: any;

  constructor(public dialogService: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onColumnPickerClosed(event) {
    this.showColumnPicker = event;
  }

  onExportClicked() {
    let r = this.dialogService.open(XgGridDataExportComponent,
      {
        data: {
          colConfig: this.gridConfig.columns,
          selectedData: this.actionData,
          completeDataSet: this.allData,
          gridTitle: this.gridTitle,

        }
      });
  }
  onExportClosed(event) {
    this.displayExportOptions = event;
  }

  onColumnChanged(column: xgGridModel.Column) {
    //  Stub out
  }

  toggleDevOptions(event) {
    this.devOptions.toggle(event);
  }

  globalFilter(event) {
    this.xgGrid.filterGlobal(event.target.value, 'contains');
  }

  onActionsEvent(event) {
    switch (event.action) {
      case 'edit':
        this.oldData = JSON.stringify(event.data);
        //Open the dialog here
        this.openDialog(event.data);
        break;
      case 'delete':
        if (confirm('Are you sure want to delete this record?')) {
          this.onDeleteBtnClick.emit({ action: 'delete', data: event.data });
        } else {
          this.snackBar.dismiss();
        }
        break;
      case 'save':
        this.onSaveBtnClick.emit({ action: 'save', data: event.data });
        break;
      case 'cancel':
        this.onCancelBtnClick.emit({ action: 'cancel', data: event.data });
        break;
      default:
        break;
    }
  }

  openDialog(records): void {
    let dataPackage = {
      data: records,
      gridConfiguration: this.gridConfig
    };
    this.dialogRef = this.dialogService.open(XgGridDataEditorDialogComponent, {
      disableClose: true,
      data: dataPackage
    });

    //! Shouldn't have to do this according to the documentation
    // * https://material.angular.io/components/dialog/examples
    this.dialogRef.componentInstance.data = dataPackage; // TODO: Hacked this together...more time needed to understand why this isn't working?
    this.dialogRef.componentInstance.dialogRef = this.dialogRef; // TODO: Hacked this together...more time needed to understand why this isn't working?

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog result:', result);
      if (result) {
        this.onSaveBtnClick.emit({ action: 'save', data: result });
      } else {
        this.onSaveBtnClick.emit({ action: 'popupcancel', data: JSON.parse(this.oldData) });
      }
    });
  }

}
