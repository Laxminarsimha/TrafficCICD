import { Component, OnInit } from "@angular/core";
import { DynamicFormComponentBase } from "../dynamic-form-base";
@Component({
  selector: "app-button",
  template: `
        <div class="demo-full-width margin-top" [formGroup]="group">
          <button type="submit" mat-raised-button color="primary">{{column.header}}</button>
        </div>
`
})
export class ButtonComponent  extends DynamicFormComponentBase implements OnInit {
  constructor() {
    super();
  }
  ngOnInit() {}
}
