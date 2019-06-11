import { Component } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { xgGridModel } from '../../../domain/grid-columns';
import { DynamicFormComponentBase } from "../dynamic-form-base";
@Component({
  selector: "app-checkbox",
  template: `
    <div class="demo-full-width margin-top" [formGroup]="group" >
      <mat-checkbox [formControlName]="column.field">{{column.header}}</mat-checkbox>
    </div>
    <ng-container *ngFor="let pattern of column.controlPatterns" ngProjectAs="mat-error">
    <ng-container *ngFor="let validation of pattern.validators" ngProjectAs="mat-error">
        <mat-error *ngIf="group.get(column.field).hasError(validation.name)">
            {{ validation.message }}
        </mat-error>
    </ng-container>
  </ng-container>
`
})
export class CheckboxComponent extends DynamicFormComponentBase {
  column: xgGridModel.Column;
  group: FormGroup;
  constructor() {
    super();
  }
}
