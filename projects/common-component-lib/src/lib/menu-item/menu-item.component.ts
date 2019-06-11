import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { INavigationItem } from '../services/navigation/navigation.interface';
import { NavigationService } from '../services/navigation/navigation.service';

@Component({
    selector: 'img-lib-menu-item',
    templateUrl: './menu-item.component.html',
    styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit, OnChanges {
    @Input() menuItem: INavigationItem;
    @Input() activeItems: INavigationItem[];
    @Input() collapseOnSelect: boolean = false;
    @Input() showSubLevels: number = 999;
    @Output() selectedItem = new EventEmitter<INavigationItem>();

    public subItems: INavigationItem[];
    public firstInitializer = false;
    public isSelected = false;
    public expanded: boolean = false;

    constructor(private navigationService: NavigationService, private router: Router) {
    }

    public ngOnInit() {
        this.activate();
    }

    public ngOnChanges(changes) {
        this.activate();
    }

    public expand($event: Event, node: INavigationItem): void {
        if(this.hasSubItems()) {
            this.expanded = !this.expanded;
        }
        this.firstInitializer = true;
        if (node && node.url) {
            if (node.externalRedirect !== undefined && node.externalRedirect) {
                window.location.href = node.url;
            } else {
                this.router.navigate([node.url]);
            }
        }
        this.selectedListItem(node);
    }

    public selectedListItem(node: INavigationItem): void {
        this.selectedItem.emit(node);
    }

    public hasSubItems(): boolean {
        return !!(this.subItems && this.subItems.length > 0 && this.showSubLevels);
    }

    public menuItemClasses() {
        return {
            ['level-' + this.menuItem.level]: true,
            'selected': this.isSelected,
            'expanded': this.expanded,
        };
    }

    private activate() {
        if (this.menuItem && this.showSubLevels) {
            this.subItems = this.getSubItems(this.menuItem);
        }
        if (this.activeItems) {
            this.setSelectedClass(!!this.activeItems.find(el => el && this.menuItem && el.id === this.menuItem.id));
        }
    }

    private setSelectedClass(isFound: boolean): void {
        if (isFound) {
            if (!this.firstInitializer && this.hasSubItems()) {
                this.expanded = true;
            }
            this.isSelected = true;
        } else {
            this.isSelected = false;
            if (this.collapseOnSelect && this.hasSubItems()) {
                this.expanded = false;
            }
        }
    }

    private getSubItems(item) {
        return this.navigationService.filterNavigationById(item.id);
    }
}
