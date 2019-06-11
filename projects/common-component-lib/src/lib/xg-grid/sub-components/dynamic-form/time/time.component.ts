import { Component, OnInit } from "@angular/core";
import { DynamicFormComponentBase } from "../dynamic-form-base";
import { xgGridModel } from '../../../domain/grid-columns';

@Component({
    selector: "app-time",
    template: `
    <div class="ui-g-12 ui-md-6 ui-lg-4 xg-cus-col-4">
    <xg-time-picker 
    [placeholder]="column.header" 
    [label]="column.header" 
    [hourFormat]="column.timeFormatter.hourFormat" 
     name="timepicker" 
    [(ngModel)]="columnData[0][column.field]"
    >
    </xg-time-picker>
    </div>`
})
export class TimeComponent extends DynamicFormComponentBase implements OnInit {
    columnData: any;
    column: xgGridModel.Column;
    constructor() {
        super();
    }
    ngOnInit() {

    }

}
