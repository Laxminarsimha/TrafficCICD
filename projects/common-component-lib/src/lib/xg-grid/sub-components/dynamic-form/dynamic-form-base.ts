import { FormGroup } from "@angular/forms";
import { xgGridModel } from '../../domain/grid-columns';

export class DynamicFormComponentBase {
  column: xgGridModel.Column;
  group: FormGroup;
  constructor() {}
}
