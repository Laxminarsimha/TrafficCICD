import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { INavigationItem } from '../services/navigation/navigation.interface';
import { NavigationService } from '../services/navigation/navigation.service';

@Component({
    selector: 'img-lib-top-bar-navigation',
    styleUrls: ['./top-bar-navigation.component.scss'],
    templateUrl: './top-bar-navigation.component.html',
    providers: [NavigationService]
})
export class TopBarNavigationComponent implements OnInit {
    @Input() level: number = 1;

    @Output() selectedItem = new EventEmitter<INavigationItem>();

    public activeItem: INavigationItem;
    public activeItems: INavigationItem[] = [];
    public items: INavigationItem[] = [];

    public isActive: boolean = false;
    private currentNavigationItemsSubscription: Subscription;

    constructor(private navigationService: NavigationService, private router: Router) { }

    ngOnInit() {
        this.fetchNavigation();
    }

    public onClick(node) {
        this.isActive = !this.isActive;
        this.selectedItem.emit(node);
    }

    public navItemClasses(item) {
        return {
            selected: item && this.activeItem && item.id === this.activeItem.id
        };
    }

    public selectItem($event: Event, node: INavigationItem) {
        this.activeItem = node;
        if (node && node.url) {
            if (node.externalRedirect !== undefined && node.externalRedirect) {
                window.location.href = node.url;
            } else {
                this.router.navigate([node.url]);
            }
        }
        this.selectedItem.emit(node);
    }

    private fetchNavigation(): void {
        this.currentNavigationItemsSubscription = this.navigationService.currentNavigationItems.subscribe(
            (list: INavigationItem[]) => {
                if (!list) {
                    return;
                }

                this.activeItems = list;
                this.activeItem = list.find(el => el.level === this.level);

                const navItem = list.find(el => el.level === this.level - 1);
                if (navItem) {
                    this.items = this.navigationService.filterNavigationById(navItem.id);
                }
            }
        );
    }
}
