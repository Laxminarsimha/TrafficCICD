import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { INavigationItem, ROOT_NAVIGATION_ID } from './navigation.interface';
import { NAVIGATIONLIST } from './navigationList.mock';

@Injectable()
export class NavigationService {
    public currentNavigationItems: BehaviorSubject<any> = new BehaviorSubject(null);

    public navigationList: INavigationItem[] = [];

    constructor(private router: Router) {
        this.fetchNavigation().subscribe(nav => {
            this.setNavigationList(nav);
        });

        // Router Events
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => this.router.routerState.root),
                map(route => {
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                filter(route => route.outlet === 'primary'),
            )
            .subscribe((route: any) => {
                let navItem;
                // Find navigation item by id from route data
                // TODO on setup Router List can set data.navigationItemId
                if (route.snapshot && route.snapshot.data && route.snapshot.data.navigationItemId) {
                    navItem = this.getNavigationItemById(route.snapshot.data.navigationItemId);
                }

                // Try Find Active Item by URL
                if (!navItem) {
                    const activeList = this.navigationList
                        .filter(el => el.url && this.router.isActive(el.url, false))
                        .sort((a, b) => a.level - b.level);

                    if (activeList && activeList.length > 0) {
                        navItem = activeList[activeList.length - 1];
                    }
                }

                if (navItem) {
                    this.updateActiveNavigationItems(navItem);
                }
            });
    }

    public setNavigationItem(navItem: INavigationItem): boolean {
        if (!navItem) {
            return false;
        }

        return this.updateActiveNavigationItems(navItem);
    }

    public getNavigationItemById(id): INavigationItem {
        return this.navigationList.find(
            (item: INavigationItem) => item.id === id
        );
    }

    public filterNavigationById(id): INavigationItem[] {
        return this.navigationList.filter((item: INavigationItem) => item.parentId === id);
    }

    public walkToParentRoot(item, fn) {
        if (!item) {
            return;
        }

        fn(item);
        if (item.id !== ROOT_NAVIGATION_ID) {
            const parent = this.getNavigationItemById(item.parentId);
            return this.walkToParentRoot(parent, fn);
        }
    }

    private getNavigationItemLevel(item: INavigationItem): number {
        let count = -1;
        this.walkToParentRoot(item, el => {
            count++;
        });
        return count;
    }

    private updateActiveNavigationItems(item): boolean {
        const activeList: INavigationItem[] = [];
        this.walkToParentRoot(item, el => {
            activeList.unshift(el);
        });

        if (activeList.length > 0) {
            this.currentNavigationItems.next(activeList);
            return true;
        }
        return false;
    }

    private setNavigationList(nav): boolean {
        this.navigationList = [...nav];

        // TODO move to the service which prepare navigationList
        this.navigationList.forEach(el => {
            el.level = this.getNavigationItemLevel(el);
        });

        const navItem = this.getNavigationItemById(ROOT_NAVIGATION_ID);
        if (!navItem) {
            return;
        }
        return this.updateActiveNavigationItems(navItem);
    }

    private fetchNavigation(): Observable<INavigationItem[]> {
        // TODO change on real data, config service
        return of(NAVIGATIONLIST);
    }
}
