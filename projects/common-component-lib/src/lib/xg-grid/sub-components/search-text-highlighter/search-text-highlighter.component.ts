import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { xgGridModel } from '../../domain/grid-columns';


@Component({
  selector: 'search-text-highlighter',
  templateUrl: './search-text-highlighter.component.html',
  styleUrls: ['./search-text-highlighter.component.scss']
})
export class SearchTextHighlighterComponent implements OnInit, OnChanges {

  @Input() dataItems: any[];
  @Input() value: string;
  @Input() column: xgGridModel.Column;
  @Input() filterColumnData: xgGridModel.FilterColumn;
  @Input() showHighlighting: boolean = true;
  @Output() _checkboxClick = new EventEmitter();
  recordOrRecords: string = 'record';
  thisOrThese: string = 'this';
  
  public matched: string;
  public unmatched: string;
  public preUnmatched: string;

  constructor() { }

  ngOnInit() {
    this.recordOrRecords =  this.dataItems == undefined || this.dataItems.length <= 1 ? 'record': 'records';
    this.thisOrThese = this.dataItems == undefined || this.dataItems.length <= 1 ? 'this': 'these';
  }

  ngOnChanges(changes: SimpleChanges) {
    this.match();
  }

  match() {
    this.matched = undefined;
    this.unmatched = this.value;
    this.preUnmatched = '';

    if (this.column == this.filterColumnData.column) {
      if (this.filterColumnData.searchFilter && this.value) {
        const needle = String(this.filterColumnData.searchFilter);
        const haystack = String(this.value);
        const startIndex = haystack.toLocaleLowerCase().indexOf(needle.toLocaleLowerCase());
        if (startIndex !== -1) {
          const endLength = needle.length;
          this.matched = haystack.substr(startIndex, endLength);
          this.unmatched = haystack.substr(needle.length);
          if (startIndex > 0) {
            this.preUnmatched = haystack.substring(0, startIndex);
            this.unmatched = haystack.substr(needle.length + this.preUnmatched.length);
          }
        }
      }
    }
  }
  removeBtnClicked() {
    this._checkboxClick.emit({action: 'save', data: this.dataItems})
  }
}
