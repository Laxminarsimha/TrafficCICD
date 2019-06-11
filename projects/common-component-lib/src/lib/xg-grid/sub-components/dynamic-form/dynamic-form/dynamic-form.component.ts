import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormGroup, FormBuilder, Validators, } from "@angular/forms";
import { xgGridModel } from '../../../domain/grid-columns';

@Component({
  exportAs: "dynamicForm",
  selector: "dynamic-form",
  template: `
    <form class="dynamic-form" [formGroup]="form" (submit)="onSubmit($event)">
    <div class="ui-g-12 xg-dynamic-form">
      <ng-container *ngFor="let col of columns;" dynamicField [column]="col" [group]="form" [columnData]="columnData"></ng-container>
      </div>
    </form>
    `,
  styles: ['::ng-deep mat-form-field {padding-left: 15px !important;}'] // TODO: This is just for now
})

export class DynamicFormComponent implements OnInit {
  @Input() columnData: any;
  @Input() columns: xgGridModel.Column[] = [];
  @Output() submit: EventEmitter<any> = new EventEmitter<any>();

  form: FormGroup;

  get value() {
    return this.form.value;
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.createControlsFromColumns();
    this.assignValues();
  }

  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.form.valid) {
      this.submit.emit(this.form.value);
    } else {
      this.validateAllFormFields(this.form);
    }
  }

  createControlsFromColumns() {
    const group = this.fb.group({});
    this.columns.forEach(column => {
      if (column.editSettings && column.editSettings.type === "button") return;
      if (column.canEdit) {
        const control = this.fb.control(this.columnData[column.field], this.bindValidations(column.controlPatterns || []));
        group.addControl(column.field, control);
      }
      else {
        const control = this.fb.control({ value: this.columnData[column.field], disabled: true });
        group.addControl(column.field, control);
      }

    });
    return group;
  }

  bindValidations(patterns: any) {
    if (patterns.length > 0) {
      const validList = [];
      patterns.forEach(pattern => {
        pattern.validators.forEach(validator => {
          validList.push(validator.validator);
        });
      });
      return Validators.compose(validList);
    }
    return null;
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      control.markAsTouched({ onlySelf: true });
    });
  }

  assignValues() {
    //  TODO: Need to handle multi-select...more as a note here not sure if the logic needs to be implemented here yet...doubt it
    this.columns.forEach(column => {
      this.form.controls[column.field].setValue(this.columnData[0][column.field]);
    });

  }
  getData(event) {
    console.log(event);
  }
}
