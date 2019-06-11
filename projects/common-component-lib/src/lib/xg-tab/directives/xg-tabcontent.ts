import { Input, TemplateRef, Directive } from '@angular/core';
@Directive({
    selector: '[xgTabContent]'
})
export class XGTabContentTemplate {
    @Input('xgTabContent') tabContent: string;

    constructor(public template: TemplateRef<any>) { }
    getTabContent(): string {
        return this.tabContent;
    }
}