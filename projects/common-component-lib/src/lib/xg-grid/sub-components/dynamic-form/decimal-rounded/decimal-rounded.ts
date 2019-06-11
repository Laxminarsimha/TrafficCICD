import { Component, OnInit } from "@angular/core";
import { DynamicFormComponentBase } from '../dynamic-form-base'
import { xgGridModel } from '../../../domain/grid-columns';
import { DecimalPipe } from '@angular/common';
import { Column } from "primeng/components/common/shared";

@Component({
    selector: 'app-input',
    template: `
    <div class="ui-g-12 ui-md-6 ui-lg-4">
    <mat-form-field class="" [formGroup]="group">
    <input matInput
         [formControlName]="column.field"
         [placeholder]="column.header"
         [type]="column.editSettings.inputType"
         [ngModel]="columnData[0][column.field]"  (blur)="blurValidate()" (ngModelChange)="columnData[0][column.field]=$event"
          />
            <ng-container *ngFor="let pattern of column.controlPatterns" ngProjectAs="mat-error">
                <ng-container *ngFor="let validation of pattern.validators" ngProjectAs="mat-error">
                    <mat-error *ngIf="group.get(column.field).hasError(validation.name)">
                        {{ validation.message }}
                    </mat-error>
                </ng-container>
            </ng-container>
        </mat-form-field>
        </div>
    `,
    providers: [
        DecimalPipe
    ]
})
export class DecimalComponent extends DynamicFormComponentBase implements OnInit {
    columnData: any;
    column: xgGridModel.Column;
    constructor(public num: DecimalPipe) {
        super();
    }
    ngOnInit() {
        this.columnData[0][this.column.field] = this.num.transform(this.columnData[0][this.column.field], this.column.roundOff);
    }
    blurValidate() {
        this.columnData[0][this.column.field] = this.num.transform(this.columnData[0][this.column.field], this.column.roundOff);
    }
}