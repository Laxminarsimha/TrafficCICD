import { Component, Input } from '@angular/core';

@Component({
    selector: 'img-lib-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.css']
})

export class TopBarComponent {
    @Input() styles: any;
}
