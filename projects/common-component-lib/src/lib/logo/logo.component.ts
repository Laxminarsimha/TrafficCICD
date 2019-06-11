import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ILogoItem } from './logo.component.interface';

@Component({
    selector: 'img-lib-logo',
    styleUrls: ['./logo.component.css'],
    templateUrl: './logo.component.html'
})

export class LogoComponent {
    @Input() logo: ILogoItem;
    @Output() clicked: EventEmitter<any> = new EventEmitter<any>();

    constructor(private router: Router) {
    }

    public onClick(e: Event, logo:ILogoItem) {
        const itemEvent = {
            event: e,
            logoItem: logo,
        };
        this.router.navigateByUrl(logo.linkTo);
        this.clicked.emit(itemEvent);
    }
}
