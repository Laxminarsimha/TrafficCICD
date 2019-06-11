import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";

import { xgGridModel } from '../../../domain/grid-columns';
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";
import { SelectComponent } from "../select/select.component";
import { DateComponent } from "../date/date.component";
import { RadiobuttonComponent } from "../radiobutton/radiobutton.component";
import { CheckboxComponent } from "../checkbox/checkbox.component";
import { TimeComponent } from "../time/time.component";
import { DecimalComponent } from "../decimal-rounded/decimal-rounded";

const componentMapper = {
  input: InputComponent,
  button: ButtonComponent,
  select: SelectComponent,
  date: DateComponent,
  radiobutton: RadiobuttonComponent,
  checkbox: CheckboxComponent,
  time: TimeComponent,
  roundOff: DecimalComponent
};
@Directive({
  selector: "[dynamicField]"
})
export class DynamicFieldDirective implements OnInit {
  @Input() column: xgGridModel.Column;
  @Input() group: FormGroup;
  @Input() columnData: xgGridModel.Column;

  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }
  ngOnInit() {
    if (this.column.editSettings) {
      const factory = this.resolver.resolveComponentFactory(
        componentMapper[this.column.editSettings.type]
      );
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.columnData = this.columnData;
      this.componentRef.instance.column = this.column;
      this.componentRef.instance.group = this.group;
    }
  }
}
