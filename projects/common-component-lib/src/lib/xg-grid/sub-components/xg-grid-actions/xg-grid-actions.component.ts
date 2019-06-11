import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'xg-grid-actions',
  templateUrl: './xg-grid-actions.component.html',
  styleUrls: ['./xg-grid-actions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class XgGridActionsComponent implements OnInit, OnChanges {
  @Input() actionsEnabled: boolean = false;
  @Input() visible: boolean = false;
  @Input() dataItems: any[];
  @Input() matColor: string = 'primary';
  @Input() showTooltips: boolean = true;
  @Input() tooltipDelay: number = 1000;
  @Input() disableTooltips: boolean = false;
  @Input() customActionIcons: any[];
  recordOrRecords: string = 'record';
  thisOrThese: string = 'this';

  // Enable/Disble Input Properties
  @Input() _isEditBtnDisabled: boolean = true;
  @Input() _isCopyBtnDisabled: boolean = true;
  @Input() _isDeleteBtnDisabled: boolean = true;
  @Input() _isCancelBtnDisabled: boolean = true;
  @Input() _isSaveBtnDisabled: boolean = true;

  // Visible Input Properties
  @Input() _isEditBtnVisible: boolean = false;
  @Input() _isCopyBtnVisible: boolean = false;
  @Input() _isDeleteBtnVisible: boolean = false;
  @Input() _isCancelBtnVisible: boolean = false;
  @Input() _isSaveBtnVisible: boolean = false;
  @Input() _isSaveDropVisible: boolean = false;
  @Input() _isRemoveBtnVisible: boolean = false;

  // TabIndex Input Properties
  @Input() _tabIndexEditBtn: number = 0;
  @Input() _tabIndexCopyBtn: number = 0;
  @Input() _tabIndexDeleteBtn: number = 0;
  @Input() _tabIndexCancelBtn: number = 0;
  @Input() _tabIndexSaveBtn: number = 0;
  @Input() _tabIndexRemoveBtn: number = 0;

  // Output Events
  @Output() _editBtnClick = new EventEmitter();
  @Output() _copyBtnClick = new EventEmitter();
  @Output() _deleteBtnClick = new EventEmitter();
  @Output() _cancelBtnClick = new EventEmitter();
  @Output() _saveBtnClick = new EventEmitter();
  @Output() _removeBtnClick = new EventEmitter();

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges) {
    this.recordOrRecords = this.dataItems == undefined || this.dataItems.length <= 1 ? 'record' : 'records';
    this.thisOrThese = this.dataItems == undefined || this.dataItems.length <= 1 ? 'this' : 'these';
  }

  /* Events */
  editBtnClicked() {
    //this.snackBarCode('Edit');
    this._editBtnClick.emit({ action: 'edit', data: this.dataItems });
  }

  copyBtnClicked() {
    this.snackBarCode('Copy');
    this._copyBtnClick.emit({ action: 'copy', data: this.dataItems });
  }

  deleteBtnClicked() {
    this.snackBarCode('Delete');
    this._deleteBtnClick.emit({ action: 'delete', data: this.dataItems });
  }

  cancelBtnClicked() {
    this.snackBarCode('Cancel');
    this._cancelBtnClick.emit({ action: 'cancel', data: this.dataItems });
  }

  saveBtnClicked() {
    this.snackBarCode('Save');
    this._saveBtnClick.emit({ action: 'save', data: this.dataItems });
  }

  removeBtnClicked() {
    this.snackBarCode('Remove');
    this._removeBtnClick.emit({ action: 'remove', data: this.dataItems });
  }
  onActionClick(oAction) {
    switch (oAction.actionType) {
      case 'edit':
        this.editBtnClicked();
        break;
      case 'save':
        this.saveBtnClicked();
        break;
      case 'undo':
        this.cancelBtnClicked();
        break;
      case 'delete':
        this.deleteBtnClicked();
        break;
      case 'remove_circle':
        this.removeBtnClicked();
        break;

    }
  }
  private snackBarCode(actionName: string) {
    this.openSnackBar(actionName + ' Action Invoked!', 'Sweet!');
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
