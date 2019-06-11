import { NgModule, Component, OnInit, ContentChildren, QueryList, Input, Output, EventEmitter, AfterContentInit } from '@angular/core';
import { XGTabContentTemplate } from './directives/xg-tabcontent';
import { XgObjectUtils } from '../shared/utilities';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'xg-tab',
  templateUrl: './xg-tab.component.html',
  styleUrls: ['./xg-tab.component.scss']
})
export class XgTabComponent implements OnInit, AfterContentInit {
  public tabContents: any[];
  private activeTabLink: string;
  private aTabs: any[];
  @ContentChildren(XGTabContentTemplate) tabContentTemplates: QueryList<any>;
  @Output('onTabChange') onTabChange = new EventEmitter<any>();
  @Input()
  get tabs() {
    return this.aTabs;
  }
  set tabs(value) {
    this.aTabs = this.prepareTabsObject(value)
  }
  @Input()
  get activeTab() {
    return this.activeTabLink;
  }
  set activeTab(value) {
    this.activeTabLink = this.getActiveTabKey(value);
  }
  constructor() {
  }
  ngOnInit() {
  }
  ngAfterContentInit() {
  }
  getActiveTabKey(sKey) {
    const sTabObject = this.aTabs.find(oTab => oTab.key === sKey);
    return sTabObject ? sTabObject['key'] : this.aTabs[0].key;
  }
  onTabClick($event, oTab) {
    this.activeTab = oTab.key
    if (this.onTabChange.observers && this.onTabChange.observers.length) {
      this.onTabChange.emit(oTab);
    }
  }
  prepareTabsObject(aTabs) {
    let aChangedTabs = [];
    if (aTabs && aTabs.length) {
      aChangedTabs = XgObjectUtils.convertToTabItems(aTabs)
    }
    return aChangedTabs;
  }

}
@NgModule({
  imports: [CommonModule],
  exports: [XgTabComponent, XGTabContentTemplate],
  declarations: [XgTabComponent, XGTabContentTemplate],
  providers: []
})
export class XgTabComponentModule { }