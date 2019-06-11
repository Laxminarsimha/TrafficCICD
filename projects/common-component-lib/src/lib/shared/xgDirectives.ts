import { NgModule, EventEmitter, Directive, ViewContainerRef, Input, Output, ContentChildren, ContentChild, TemplateRef, OnInit, OnChanges, OnDestroy, AfterContentInit, QueryList, SimpleChanges, EmbeddedViewRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
@Component({
    selector: 'xg-header',
    template: '<ng-content></ng-content>'
})
export class Header { }

@Component({
    selector: 'xg-footer',
    template: '<ng-content></ng-content>'
})
export class Footer { }
@NgModule({
    imports: [CommonModule],
    exports: [Header, Footer],
    declarations: [Header, Footer]
})
export class  commonDirectiveModule{ }