import { Component, OnInit, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { XgObjectUtils } from '../shared/utilities';
import { XgButtonComponentModule } from '../xg-button/xg-button.component';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'xg-popup',
  templateUrl: './xg-popup.component.html',
  styleUrls: ['./xg-popup.component.scss']
})
export class XgPopupComponent implements OnInit {
  private pheader: string;
  private pDraggable: boolean;
  private pResizable: boolean;
  private pVisible: boolean;
  private pModal: boolean;
  private pBlockScroll: boolean;
  private pCloseOnEscape: boolean;
  private pDismissableMask: boolean;
  private pClosable: boolean;
  private pResponsive: boolean;
  private pCloseIcon: string;
  private pMaximizable: boolean;
  private pStyle: any;
  private pStyleClass: string;
  private pContent: string;
  private pShowHeader: boolean;
  private pBaseZIndex: number;
  private pAutoZIndex: boolean;
  private pMinX: number;
  private pMinY: number;
  // private pMinHeight: number;
  // private pMinWidth: number

  @Output('onShow') onShow = new EventEmitter<any>();
  @Output('onHide') onHide: EventEmitter<any> = new EventEmitter();

  @Input()
  get header() {
    return this.pheader;
  }
  set header(value: string) {
    this.pheader = value || '';
  }
  @Input()
  get draggable() {
    return this.pDraggable;
  }
  set draggable(value: boolean) {
    this.pDraggable = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get resizable() {
    return this.pResizable;
  }
  set resizable(value: boolean) {
    this.pResizable = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get visible() {
    return this.pVisible;
  }
  set visible(value: boolean) {
    this.pVisible = value
  }
  @Input()
  get modal() {
    return this.pModal;
  }
  set modal(value: boolean) {
    this.pModal = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get blockScroll() {
    return this.pBlockScroll;
  }
  set blockScroll(value: boolean) {
    this.pBlockScroll = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get closeOnEscape() {
    return this.pCloseOnEscape;
  }
  set closeOnEscape(value: boolean) {
    this.pCloseOnEscape = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get dismissableMask() {
    return this.pDismissableMask;
  }
  set dismissableMask(value: boolean) {
    this.pDismissableMask = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get closable() {
    return this.pClosable;
  }
  set closable(value: boolean) {
    this.pClosable = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get responsive() {
    return this.pResponsive;
  }
  set responsive(value: boolean) {
    this.pResponsive = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get closeIcon() {
    return this.pCloseIcon;
  }
  set closeIcon(value: string) {
    this.pCloseIcon = value || 'pi pi-times';
  }
  @Input()
  get maximizable() {
    return this.pMaximizable;
  }
  set maximizable(value: boolean) {
    this.pMaximizable = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get style() {
    return this.pStyle;
  }
  set style(value: any) {
    this.pStyle = value || '';
  }
  @Input()
  get styleClass() {
    return this.pStyleClass;
  }
  set styleClass(value: string) {
    this.pStyleClass = value || '';
  }
  @Input()
  get content() {
    return this.pContent;
  }
  set content(value: string) {
    this.pContent = value || '';
  }
  @Input()
  get showHeader() {
    return this.pShowHeader;
  }
  set showHeader(value: boolean) {
    this.pShowHeader = XgObjectUtils.coerceBooleanProperty(value);
  }
  @Input()
  get minX() {
    return this.pMinX;
  }
  set minX(value: number) {
    this.pMinX = value || 70
  }
  @Input()
  get minY() {
    return this.pMinY;
  }
  set minY(value: number) {
    this.pMinY = value || 70
  }
  @Input()
  get baseZIndex() {
    return this.pBaseZIndex;
  }
  set baseZIndex(value: number) {
    this.pBaseZIndex = value || 1000
  }
  // @Input()
  // get minHeight() {
  //   return this.pMinHeight;
  // }
  // set minHeight(value: number) {
  //   this.pMinHeight = value
  // }
  // @Input()
  // get minWidth() {
  //   return this.pMinWidth;
  // }
  // set minWidth(value: number) {
  //   this.pMinWidth = value
  // }
  @Input()
  get autoZIndex() {
    return this.pAutoZIndex;
  }
  set autoZIndex(value: boolean) {
    this.pAutoZIndex = XgObjectUtils.coerceBooleanProperty(value);
  }

  constructor() {
    this.pheader = "";
    this.pDraggable = true;
    this.pResizable = true;
    this.pVisible = false;
    this.pModal = false;
    this.pBlockScroll = false;
    this.pCloseOnEscape = true;
    this.pDismissableMask = false
    this.pClosable = true;
    this.pResponsive = true;
    this.pCloseIcon = "";
    this.pMaximizable = false;
    this.pStyle = "";
    this.pStyleClass = "";
    this.pContent = "";
    this.pShowHeader = true;
    this.pMinX = 70;
    this.pMinY = 70;
    this.pBaseZIndex = 1000;
    this.pAutoZIndex = true;
  }

  ngOnInit() {
  }

  onShowEvent(event: Event) {
    if (this.onShow.observers && this.onShow.observers.length) { }
    this.onShow.emit(event);
  }
  onHideEvent(event: Event) {
    if (this.onHide.observers && this.onHide.observers.length) { }
    this.onHide.emit(event);
  }

}
@NgModule({
  imports: [CommonModule, SharedModule, XgButtonComponentModule, DialogModule],
  exports: [XgPopupComponent, SharedModule, DialogModule],
  declarations: [XgPopupComponent],
  providers: []
})
export class XgPopupComponentModule { }
