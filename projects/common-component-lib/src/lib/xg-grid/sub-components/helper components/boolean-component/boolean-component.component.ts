import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { xgGridModel } from '../../../domain/grid-columns';
import { SaveDataService } from '../../../services/save-data.service'

export class BooleanConfiguraiton {
  constructor() { }
  interactionMode?: BooleanComponentModes = BooleanComponentModes.Checkbox;
  readonlyMode?: BooleanComponentModes = BooleanComponentModes.String;
}

export enum BooleanComponentModes {
  String = 'String',
  ToggleButton = 'ToggleButton',
  Checkbox = 'Checkbox',
  Button = 'Buton'
}

export enum LabelOption {
  //TODO: Label options here!
}

@Component({
  selector: 'boolean-component',
  templateUrl: './boolean-component.component.html',
  styleUrls: ['./boolean-component.component.css']
})
export class BooleanComponent implements OnInit {
  @Input() rowData: any;
  @Input() filterColumnData: xgGridModel.FilterColumn;
  @Input() showHighlighting: boolean = true;
  @Input() value: boolean;
  @Input() column: xgGridModel.Column;
  @Input() outputMode: BooleanConfiguraiton = new BooleanConfiguraiton();
  public changedRows = [];

  @Output() onCellEdited: EventEmitter<any> = new EventEmitter();
  selectedRowItems = [];

  constructor(private saveDataService: SaveDataService) {
  }

  ngOnInit() {
    //SaveDataService
  }

  inputupdate(current, row) {
    row[this.column.field] = current.value;
    this.saveDataService.setChangedData(row);
  }

  checkboxClicked() {
    this.onCellEdited.emit(this.selectedRowItems);
    this.saveDataService.update(this.selectedRowItems);

  }

}


