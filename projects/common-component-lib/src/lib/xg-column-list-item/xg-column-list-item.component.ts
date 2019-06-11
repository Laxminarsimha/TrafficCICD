import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'xg-column-list-item',
  templateUrl: './xg-column-list-item.component.html',
  styleUrls: ['./xg-column-list-item.component.scss']
})
export class XgColumnListItemComponent implements OnInit {

  @Input() columnMeta: any;
  @Input() columnData: any;
  @Output() onClickEvent = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }
  selectedRow(data) {
    if (data) {
      this.onClickEvent.emit(data);
    }
  }
}
