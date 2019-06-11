import { Component, OnInit } from "@angular/core";
import { DynamicFormComponentBase } from "../dynamic-form-base";

@Component({
  selector: "app-radiobutton",
  template: `
<div class="demo-full-width margin-top" [formGroup]="group">
<label class="radio-label-padding">{{column.header}}:</label>
<mat-radio-group [formControlName]="column.field">
<mat-radio-button *ngFor="let item of column.editSettings.options" [value]="item">{{item}}</mat-radio-button>
</mat-radio-group>
</div>
`
})
export class RadiobuttonComponent extends DynamicFormComponentBase implements OnInit {
  constructor() {
    super();
  }
  ngOnInit() {}
}
