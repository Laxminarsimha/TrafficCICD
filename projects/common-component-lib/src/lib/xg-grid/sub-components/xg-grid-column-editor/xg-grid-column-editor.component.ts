import { Component, OnInit, Input, Output, EventEmitter, } from '@angular/core';
import { xgGridModel } from '../../domain/grid-columns';

@Component({
  selector: 'xg-grid-column-editor',
  templateUrl: './xg-grid-column-editor.component.html',
  styleUrls: ['./xg-grid-column-editor.component.scss']
})
export class XgGridColumnEditorComponent implements OnInit {
  @Input() column: xgGridModel.Column;
  @Input() rowData: any;
  @Input() value: any;
  @Input() selectAllOnEdit: boolean = true;

  @Output() onValueChanged: EventEmitter<any> = new EventEmitter();

private originalValue: any;

  constructor() { }

  ngOnInit() { 
    this.originalValue = this.value;
  }

  onFocused(event) {
    if (this.selectAllOnEdit)
      event.target.select();
  }

  onValueChange(event) {
    this.updateData();
  }

  onEnterKey(event) {
    this.updateData();
  }

  private updateData() {
    this.rowData[this.column.field] = this.value;
    this.onValueChanged.emit({ originalValue: this.originalValue, newValue: this.value, column: this.column, data: this.rowData });
  }
}
