import { NgModule, Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'xg-copy-instruction',
  templateUrl: './xg-copy-instruction.component.html',
  styleUrls: ['./xg-copy-instruction.component.scss'],
  providers: [MessageService]
})
export class XgCopyInstructionComponent implements OnInit {
  createHeaderForm = this.formBuilder.group({
    advertisers: [''],
    title: [''],
    estimate: [''],
    unitType: [''],
    creativeLength: ['']
  });
  private aAdvertisers: any[];
  private aUnitTypes: any[];
  private sUnitType: string;

  constructor(private formBuilder: FormBuilder) {    
  }

  ngOnInit() {  
  }

  @Input()
  get advertisers() {
    return this.aAdvertisers;
  }
  set advertisers(aValue) {
    this.aAdvertisers = aValue || [];
  }

  @Input()
  get unitTypes() {
    return this.aUnitTypes;
  }
  set unitTypes(aValue) {
    this.aUnitTypes = aValue || [];
  }

  @Input()
  get defaultUnitType() {
    return this.sUnitType;
  }
  set defaultUnitType(value) {
    this.sUnitType = value || '';
  }
}
@NgModule({
  imports: [MatRadioModule],
  exports: [XgCopyInstructionComponent],
  declarations: [XgCopyInstructionComponent],
  providers: []
})
export class XgCopyInstructionComponentModule { }