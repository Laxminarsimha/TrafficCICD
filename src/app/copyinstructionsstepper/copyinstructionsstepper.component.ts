import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-copyinstructionsstepper',
  templateUrl: './copyinstructionsstepper.component.html',
  styleUrls: ['./copyinstructionsstepper.component.scss']
 
})
export class CopyInstructionsStepper implements OnInit {
  isLinear = false
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
