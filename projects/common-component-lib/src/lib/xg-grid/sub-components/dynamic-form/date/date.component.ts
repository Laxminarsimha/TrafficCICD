import { Component, OnInit } from "@angular/core";
import { DynamicFormComponentBase } from "../dynamic-form-base";
import { xgGridModel } from "../../../xg-grid.module";

@Component({
  selector: "app-date",
  template: `
    <div class="ui-g-12 ui-md-6 ui-lg-4 xg-cus-col-4">
  <xg-date-picker 
  [placeholder]="column.header" 
  [label]="column.header" 
  [formatter]="column.dateFormatter.formatter" 
  [(ngModel)]="columnData[0][column.field]"
  >
  </xg-date-picker>
  </div>
  `
})
export class DateComponent extends DynamicFormComponentBase implements OnInit {
  columnData: any;
  column: xgGridModel.Column;
  constructor() {
    super();
  }
  ngOnInit() {
  }

}
