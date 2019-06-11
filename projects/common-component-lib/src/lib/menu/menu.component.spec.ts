import {
    async,
    ComponentFixture,
    fakeAsync,
    TestBed, tick
} from '@angular/core/testing';
import { Routes } from '@angular/router';
import { NAVIGATIONLIST } from '../services/navigation/navigationList.mock';

import { MenuComponent } from './menu.component';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationService } from '../services/navigation/navigation.service';

// Setup Routes
const appRoutes: Routes = NAVIGATIONLIST.map(el => {
    return {
        path: el.url,
        component: MenuComponent,
        data: {
            navigationItemId: el.id
        }
    };
});
appRoutes.push({
    path: '**',
    component: MenuComponent,
});

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;
    let navigationService: NavigationService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MenuComponent,
                MenuItemComponent
            ],
            imports: [
                RouterTestingModule.withRoutes(appRoutes)
            ],
            providers: [NavigationService],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuComponent);

        navigationService = fixture.debugElement.injector.get(
            NavigationService
        );
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should select menu item', fakeAsync(() => {
        spyOn(component.selectedItem, 'emit');
        tick();
        const item = fixture.debugElement.nativeElement.querySelector('.navigation-item-link');
        item.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(component.selectedItem.emit).toHaveBeenCalled();
    }));

    it('can show menu item from 2 level', fakeAsync(() => {
        component.level = 2;
        fixture.detectChanges();

        navigationService.setNavigationItem(NAVIGATIONLIST[1]);
        tick();
        fixture.detectChanges();
        const items = fixture.debugElement.nativeElement.querySelectorAll('.navigation-item > img-lib-menu-item');

        expect(items.length).toEqual(8);
    }));
    
});
