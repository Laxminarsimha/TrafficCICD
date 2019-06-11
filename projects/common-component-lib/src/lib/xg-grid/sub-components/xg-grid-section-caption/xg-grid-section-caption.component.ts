import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'xg-grid-section-caption',
  templateUrl: './xg-grid-section-caption.component.html',
  styleUrls: ['./xg-grid-section-caption.component.scss']
})
export class XgGridSectionCaptionComponent implements OnInit {
  @Input() caption: string = '';

  constructor() { }

  ngOnInit() {
  }

}
