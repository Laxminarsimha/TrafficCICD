import { NgModule, Component, OnInit, Input, forwardRef, Output, EventEmitter, ViewChild, TemplateRef, ElementRef, ContentChild } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'xg-standard-list-item',
  templateUrl: './xg-standard-list-item.component.html',
  styleUrls: ['./xg-standard-list-item.component.scss']
})
export class XgStandardListItemComponent implements OnInit {
  private sTitle: string;
  private sDescription: string;
  private sIconUrl: string;
  private sTitleDirection: string;
  @Input()
  get title() {
    return this.sTitle
  }
  set title(value) {
    this.sTitle = value || '';
  }
  @Input()
  get description() {
    return this.sDescription
  }
  set description(value) {
    this.sDescription = value || '';
  }
  @Input()
  get iconUrl() {
    return this.sIconUrl
  }
  set iconUrl(value) {
    this.sIconUrl = value || '';
  }
  @Input()
  get titleDirection() {
    return this.sTitleDirection
  }
  set titleDirection(value) {
    this.sTitleDirection = value || 'ltr';
  }
  constructor() { }

  ngOnInit() {
  }

}
@NgModule({
  imports: [CommonModule, SharedModule],
  exports: [XgStandardListItemComponent, SharedModule],
  declarations: [XgStandardListItemComponent],
  providers: []
})
export class XgStandardListItemComponentModule { }
