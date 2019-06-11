
// TODO:  Don't forget to add the Prime import here
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { xgGridModel } from '../../domain/grid-columns';
import { resolveReflectiveProviders } from '@angular/core/src/di/reflective_provider';

@Component({
  selector: 'xg-grid-column-picker',
  templateUrl: './xg-grid-column-picker.component.html',
  styleUrls: ['./xg-grid-column-picker.component.scss']
})

export class XgGridColumnPickerComponent implements OnInit {
  @Input() advancedMode: boolean = false;
  @Input() allowAdvancedMode: boolean = true;
  @Input() allowReordering: boolean = false;
  @Input() display: boolean;
  @Input() dataKey: string;
  @Input() columns: xgGridModel.Column[]
  @Input() header: any; // See if this is going to accept more complex items, like templates/controls etc.
  @Input() width: number = 500;
  @Input() minWidth: number = 350;
  @Input() maximizable: boolean = true;
  @Input() showFooter: boolean = true;

  @Output() onClosed = new EventEmitter<boolean>();
  @Output() onColumnChanged = new EventEmitter<xgGridModel.Column[]>();


  draggedCol: xgGridModel.Column;
  draggedSourceId: string = null;
  dropTargetId: string = null;

  rowFields: xgGridModel.Column[] = [];
  columnFields: xgGridModel.Column[] = [];
  filterFields: xgGridModel.Column[] = [];

  constructor() { }

  ngOnInit() {
  }


  close() {
    this.onClosed.emit(false);
    this.display = false;
  }

  onShow() {

  }

  onHide() {
    // Ensure that the input/outputs are in sync
    this.onClosed.emit(false);
    this.display = false;
  }

  checkAll(event){
    for (let index = 0; index < this.columns.length; index++) {
      this.onCheckChange(event, this.columns[index]);
    }      
  }
  
  showChecked(column: xgGridModel.Column) {
    return !column.display || column.display.indexOf('none') < 0 ? true : false;
  }

  onCheckChange(event, column: xgGridModel.Column) {
    column.display = event.checked == true ? xgGridModel.ColumnDisplay.Visible : xgGridModel.ColumnDisplay.Hidden;
  }

  dragStart(event, col: xgGridModel.Column) {
    if (event.target.hasAttribute("id")) {
      this.draggedSourceId = event.target.closest('div[id]').getAttribute("id");
      this.draggedCol = col;
    }
  }

  onDrop(event) {
    let foundIndex = this.findIndexInSource(this.draggedCol, this.getLocalDataRef(this.draggedSourceId));
    this.getLocalDataRef(this.dropTargetId).push(this.draggedCol);
    this.getLocalDataRef(this.draggedSourceId).splice(foundIndex, 1);
  }

  onDragEnter(event) {
    this.dropTargetId = event.target.hasAttribute("id") ? event.target.getAttribute("id") : null;
    this.dropTargetId = this.dropTargetId === null ? event.target.closest('div[id]').getAttribute("id") : this.dropTargetId;
  }

  dragEnd(event) {
    this.resetDragTracking();
  }

  getLocalDataRef(source: string): xgGridModel.Column[] {
    switch (source) {
      case 'sourceFields':
        return this.columns;
      case 'rowFields':
        return this.rowFields;
      case 'columnFields':
        return this.columnFields;
      case 'filterFields':
        return this.filterFields;
    }
  }

  resetDragTracking() {
    this.dropTargetId = null;
    this.draggedSourceId = null;
    this.draggedCol = null;
  }

  findIndexInSource(col: xgGridModel.Column, columns: xgGridModel.Column[]) {
    let index = -1;
    for (let i = 0; i < columns.length; i++) {
      if (col.field[this.dataKey] === columns[i][this.dataKey]) {
        index = i;
        break;
      }
    }
    return index;
  }
}
