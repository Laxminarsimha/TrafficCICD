import { Component, OnInit, Input } from '@angular/core';
import { xgGridModel } from '../../domain/grid-columns';
import { FormControl } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'xg-grid-column-calculations',
  templateUrl: './xg-grid-column-calculations.component.html',
  styleUrls: ['./xg-grid-column-calculations.component.scss']
})
export class XgGridColumnCalculationsComponent implements OnInit {
  @Input() dataTableRef: any;
  @Input() data: any[] = [];
  @Input() column: xgGridModel.Column;

  //  Allow the select to be visible
  allowUserSelection: boolean = false;
  //Numeric vars
  numberFunctions: FormControl = new FormControl();
  selectedNumberFunctions: xgGridModel.ColumnCaclulation[];
  numberFunctionsList: xgGridModel.ColumnCaclulation[] = [];
  //Date vars
  dateFunctions: FormControl = new FormControl();
  selectedDateFunctions: xgGridModel.ColumnCaclulation[];
  dateFunctionsList: xgGridModel.ColumnCaclulation[] = [];

  constructor() { }

  ngOnInit() {
    //TODO: this really should come from the base class
    var allNumerics: xgGridModel.ColumnCaclulation[] = [xgGridModel.CalculationsForNumerics.Average, xgGridModel.CalculationsForNumerics.Sum, xgGridModel.CalculationsForNumerics.Count, xgGridModel.CalculationsForNumerics.Min, xgGridModel.CalculationsForNumerics.Max];
    var allDates: xgGridModel.ColumnCaclulation[] = [xgGridModel.CalculationsForDates.MaxDate, xgGridModel.CalculationsForDates.MinDate]

    this.allowUserSelection = this.column && this.column.calculationConfiguration ? this.column.calculationConfiguration.allowUserSelection : true;

    this.numberFunctionsList = this.column && this.column.calculationConfiguration && this.column.calculationConfiguration.defaultCalculations ? this.column.calculationConfiguration.defaultCalculations : allNumerics;
    this.selectedNumberFunctions = this.column && this.column.calculationConfiguration && this.column.calculationConfiguration.defaultCalculations ? this.column.calculationConfiguration.defaultCalculations : allNumerics;
    let numVals = [];
    this.selectedNumberFunctions.forEach(val => {
      numVals.push(val.label)
    })
    this.numberFunctions.setValue(numVals);
    this.dateFunctionsList = this.column && this.column.calculationConfiguration && this.column.calculationConfiguration.defaultCalculations ? this.column.calculationConfiguration.defaultCalculations : allDates;
    this.selectedDateFunctions = this.column && this.column.calculationConfiguration && this.column.calculationConfiguration.defaultCalculations ? this.column.calculationConfiguration.defaultCalculations : allDates;
    let dateVals = [];
    this.selectedDateFunctions.forEach(val => {
      dateVals.push(val.label)
    })
    this.dateFunctions.setValue(dateVals);
  }

  log(val: any) {
    console.log(val);
  }
  onNumberSelectionChange(event) {
    this.selectedNumberFunctions = [];
    event.value.forEach(funcString => {
      this.selectedNumberFunctions.push(this.numberFunctionsList.find(func => func.label == funcString));
    });
  }
  onDateSelectionChange(event) {
    this.selectedDateFunctions = [];
    event.value.forEach(funcString => {
      this.selectedDateFunctions.push(this.dateFunctionsList.find(func => func.label == funcString));
    });
  }

}