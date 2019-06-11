import { Component } from '@angular/core';
import { async, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { INavigationItem } from './navigation.interface';

import { NavigationService } from './navigation.service';
import { NAVIGATIONLIST } from './navigationList.mock';

@Component({
    selector: 'test-navigation',
    template: `<div></div>`
})
export class TestNavigationComponent {

}


// Setup Routes
const appRoutes: Routes = NAVIGATIONLIST.map(el => {
    return {
        path: el.url,
        component: TestNavigationComponent,
        data: {
            navigationItemId: el.id
        }
    };
});
appRoutes.push({
    path: '**',
    component: TestNavigationComponent,
});


describe('Navigation Service', () => {
    let service: NavigationService;
    let activeList: INavigationItem[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestNavigationComponent],
            imports: [
                RouterTestingModule.withRoutes(appRoutes)
            ],
            providers: [NavigationService],
        });
        service = TestBed.get(NavigationService);

        service.currentNavigationItems.subscribe(list => {
            activeList = list;
        });
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be set navigation item', fakeAsync(() => {
        service.setNavigationItem(NAVIGATIONLIST[3]);
        tick();

        expect(activeList[activeList.length-1]).toEqual(NAVIGATIONLIST[3]);
    }));

    it('Can get navigation item by id', () => {
        const el = service.getNavigationItemById(NAVIGATIONLIST[3].id);
        expect(el).toEqual(NAVIGATIONLIST[3]);
    });

    it('Can filter navigation items by id', () => {
        const list = service.filterNavigationById(NAVIGATIONLIST[3].id);
        const filtered = NAVIGATIONLIST.filter(el => el.parentId === NAVIGATIONLIST[3].id);
        expect(list).toEqual(filtered);
    });

    it('Can walk to all parents level', () => {
        const fn = jasmine.createSpy('test', );
        service.walkToParentRoot(NAVIGATIONLIST[5], fn);
        NAVIGATIONLIST.filter(el => el.parentId === NAVIGATIONLIST[3].id);
        expect(fn).toHaveBeenCalledTimes(4);
    });

});
