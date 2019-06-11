import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  QueryList,
  TemplateRef
} from '@angular/core';
import { xgGridModel } from '../../domain/grid-columns';

@Component({
  selector: 'xg-grid-data-cell',
  templateUrl: './xg-grid-data-cell.component.html',
  styleUrls: ['./xg-grid-data-cell.component.scss']
})
export class XgGridDataCellComponent implements OnInit {

  @Input() col: xgGridModel.Column;
  @Input() editMode: xgGridModel.GridEditMode;
  @Input() rowData: any;
  @Input() currentFilterColumnData: xgGridModel.FilterColumn;
  @Input() showFilterColumnHighlighting: boolean = true;
  @Input() isEditable: boolean = false;
  @Output() onCellEdited: EventEmitter<any> = new EventEmitter();

  @Input() cellTemplateArray:any[];

  // dynamic cell template
  @Input('xgCustomCellTemplate') xgCustomCellTemplate: QueryList<any>;
  testDate: any;
  isCellTemplatevisible: boolean = false
  constructor() { }

  ngOnInit() {
    this.isCellTemplatevisible = this.cellTemplateArray.includes(this.col.field);
  }

  CellEdited(event) {
    this.onCellEdited.emit(event)
  }

}
