import { Component, OnInit, Input } from '@angular/core';
import { xgGridModel } from '../../domain/grid-columns';

@Component({
  selector: 'xg-grid-column-header',
  templateUrl: './xg-grid-column-header.component.html',
  styleUrls: ['./xg-grid-column-header.component.scss']
})
export class XgGridColumnHeaderComponent implements OnInit {
  @Input() dataTableRef: any;
  @Input() columns: xgGridModel.Column[];
  @Input() allowRowSelection: boolean = true;
  @Input() allowRowReordering: boolean = true;
  @Input() useCheckBoxSelection: boolean = true;
  @Input() showDetailsRow: boolean = true;
  @Input() enableActionsColumn: boolean = true;
  @Input() showColumnFilterRow: boolean = true;
  @Input() showFilterLabels: boolean = false;

  constructor() { }

  ngOnInit() {
  }


  filterChanged(event){
    //  Need to add a logging mechanism here...grid service?

  }
}
