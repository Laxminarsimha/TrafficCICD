import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { INavigationItem } from '../services/navigation/navigation.interface';
import { NavigationService } from '../services/navigation/navigation.service';

@Component({
    selector: 'img-lib-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss'],
    providers: [NavigationService]
})
export class MenuComponent implements OnInit, OnDestroy {
    @Input() level: number = 1;
    @Input() showSubLevels: number = 999;
    @Input() collapseOnSelect: boolean = true;
    // @Input() navigationItemId: number;
    // @Input() classname: string;
    @Output() selectedItem: EventEmitter<INavigationItem> = new EventEmitter<INavigationItem>();

    public items: INavigationItem[] = [];
    public activeItems: INavigationItem[] = [];

    private currentNavigationItemsSubscription: Subscription;

    constructor(
        private navigationService: NavigationService,
    ) { }

    public ngOnInit() {
        this.fetchNavigation();
    }

    public ngOnDestroy() {
        this.currentNavigationItemsSubscription.unsubscribe();
    }

    public selectedListItem(node: INavigationItem): void {
        this.activeItems = [];
        this.navigationService.walkToParentRoot(node, el => {
            this.activeItems.unshift(el);
        });
        this.selectedItem.emit(node);
    }

    private fetchNavigation(): void {

        this.currentNavigationItemsSubscription = this.navigationService.currentNavigationItems
            .subscribe(
                (list: INavigationItem[]) => {
                    if (!list) {
                        return;
                    }

                    this.activeItems = list;

                    const navItem = list.find(el => el.level === this.level - 1);
                    if (navItem) {
                        this.items = this.navigationService.filterNavigationById(navItem.id);
                    }
                }
            );
    }
}
