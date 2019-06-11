import { Component, OnInit } from "@angular/core";
import { DynamicFormComponentBase } from '../dynamic-form-base'
import { xgRegEx } from "../regex-lib";
import { xgGridModel } from '../../../domain/grid-columns';

@Component({
    selector: 'app-input',
    template: `
    <div class="ui-g-12 ui-md-6 ui-lg-4">
        <mat-form-field class="" [formGroup]="group">
            <input *ngIf="maskValue"
                matInput
                [formControlName]="column.field"
                [placeholder]="column.header"
                [type]="column.editSettings.inputType"
                [mask]="maskValue"
                [minLength]="minLength"
                [maxLength]="maxLength"
                [(ngModel)]="columnData[0][column.field]"
            />
            <input *ngIf="!maskValue"
                matInput
                [formControlName]="column.field"
                [placeholder]="column.header"
                [type]="column.editSettings.inputType"
                [minLength]="minLength"
                [maxLength]="maxLength"
                [(ngModel)]="columnData[0][column.field]"
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
    `
})
export class InputComponent extends DynamicFormComponentBase implements OnInit {
    maskValue: string = '';
    minLength: number = 0;
    maxLength: number = 10000000;
    columnData: any;
    constructor() {
        super();
    }
    ngOnInit() {
        if (this.column.controlPatterns) {
            //Loop thorugh the control patterns and seek the min max length values to assign / if any
            this.column.controlPatterns.forEach(pattern => {
                if ((<xgRegEx>pattern).minLength)
                    this.minLength = (<xgRegEx>pattern).minLength;
                if ((<xgRegEx>pattern).maxLength)
                    this.maxLength = (<xgRegEx>pattern).maxLength;
                if ((<xgRegEx>pattern).mask)
                    this.maskValue = (<xgRegEx>pattern).mask;
            });

        }
    }
}
