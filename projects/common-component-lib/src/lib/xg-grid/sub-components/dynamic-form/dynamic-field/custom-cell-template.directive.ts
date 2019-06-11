import { Input, TemplateRef, Directive } from '@angular/core';
@Directive({
    selector: '[xgCustomCellTemplateContent]'
})
export class xgCustomCellTemplateDirective {
    @Input('xgCustomCellTemplateContent') cellContent: string;

    constructor(public template: TemplateRef<any>) {
     }
    getCellContent(): string {
        return this.cellContent;
    }
}