import { Component, Inject, Optional, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { xgGridModel } from '../../domain/grid-columns';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form/dynamic-form.component';

@Component({
  selector: 'xg-grid-data-editor-dialog',
  templateUrl: './xg-grid-data-editor-dialog.component.html',
  styleUrls: ['./xg-grid-data-editor-dialog.component.css']
})
export class XgGridDataEditorDialogComponent implements OnInit {
  @ViewChild(DynamicFormComponent) form: DynamicFormComponent;
  columnConfig: xgGridModel.Column[];
    
  submit(value: any) { }

  constructor(@Optional() public dialogRef: MatDialogRef<XgGridDataEditorDialogComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    let gridConfig: xgGridModel.Configuration = this.data.gridConfiguration;
    this.columnConfig = gridConfig.columns;
    this.form.columnData = this.data.data;
  }
}
