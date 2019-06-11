import { NgModule, Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { BreadCrumb } from '../shared/xgInterfaces';
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';
@Component({
  selector: 'xg-breadcrumb',
  templateUrl: './xg-breadcrumb.component.html',
  styleUrls: ['./xg-breadcrumb.component.scss']
})
export class XgBreadcrumbComponent implements OnInit, OnChanges {
  @Input('breadCrumbs') breadCrumbs: BreadCrumb[];
  @Input('navigate') isNavigate?: boolean;
  @Output('onClick') onClick = new EventEmitter<any>();
  public breadcrumbs: BreadCrumb[];
  constructor(private router: Router) {
    this.breadcrumbs = [];
  }

  ngOnInit() {
  }
  ngOnChanges() {
    this.breadcrumbs = this.breadCrumbs;
  }
  onLinkClick(oBreadcrumb) {
    if (!this.isNavigate) {
      if (this.onClick.observers && this.onClick.observers.length) {
        this.onClick.emit(oBreadcrumb)
      }
    }
    else {
      if (oBreadcrumb.url) {
        this.router.navigate([oBreadcrumb.url])
      }
      else {
        // need to provide notify if no url is provided.
      }
    }

  }

}
@NgModule({
  imports: [CommonModule],
  exports: [XgBreadcrumbComponent],
  declarations: [XgBreadcrumbComponent],
  providers: []
})
export class XgBreadcrumbComponentModule { }