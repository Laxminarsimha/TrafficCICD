import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ILogoItem } from '../logo/logo.component.interface';

@Component({
  selector: 'img-lib-user-menu',
  styleUrls: ['./user-menu.component.scss'],
  templateUrl: './user-menu.component.html',
})

export class UserMenuComponent {

  @Input() userInfo: any;
  @Input() userMenuItems: any;

  @Output() clicked: EventEmitter<any> = new EventEmitter<any>();

  isActive: boolean = false;

  onClick(e: Event) {
    return this.isActive = !this.isActive;
    // this.clicked.emit(e);
  }

}
