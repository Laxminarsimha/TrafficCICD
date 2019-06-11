import { Component, OnInit } from "@angular/core";
import { DynamicFormComponentBase } from "../dynamic-form-base";
import { xgGridModel } from '../../../domain/grid-columns';

@Component({
  selector: "app-select",
  template: `
  <div class="ui-g-12 ui-md-6 ui-lg-4">
    <mat-form-field class="demo-full-width margin-top" [formGroup]="group">
      <mat-select [placeholder]="column.header" [(ngModel)]="columnData[0][column.field]" [formControlName]="column.field">
        <mat-option *ngFor="let item of column.editSettings.options" [value]="item">{{item}}</mat-option>
      </mat-select>
      <ng-container *ngFor="let pattern of column.controlPatterns" ngProjectAs="mat-error">
        <ng-container *ngFor="let validation of pattern.validators" ngProjectAs="mat-error">
            <mat-error *ngIf="group.get(column.field).hasError(validation.name)">
                {{ validation.message }}
            </mat-error>
        </ng-container>
      </ng-container>
    </mat-form-field>
    </div>
`
})
export class SelectComponent extends DynamicFormComponentBase implements OnInit {
  columnData: any;
  column: xgGridModel.Column;
  constructor() {
    super();
  }
  ngOnInit() { }
}
