import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationService } from '../services/navigation/navigation.service';
import { NAVIGATIONLIST } from '../services/navigation/navigationList.mock';

import { MenuItemComponent } from './menu-item.component';

describe('MenuItemComponent', () => {
    let component: MenuItemComponent;
    let fixture: ComponentFixture<MenuItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MenuItemComponent],

            imports: [
                RouterTestingModule.withRoutes([
                    { path: '**', component: MenuItemComponent }
                ])
            ],
            providers: [NavigationService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuItemComponent);
        component = fixture.componentInstance;
        component.menuItem = {...NAVIGATIONLIST[2]};
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should select menu item', () => {
        spyOn(component.selectedItem, 'emit');
        const item = fixture.debugElement.nativeElement.querySelector('.navigation-item-link');
        item.dispatchEvent(new Event('click'));
        fixture.detectChanges();
        expect(component.selectedItem.emit).toHaveBeenCalled();
    });

    it('can get classes for menu item', () => {
        const testClasses = {
            ['level-2']: true,
            'expanded': true,
            'selected': true,
        };
        component.isSelected = true;
        component.expanded = true;

        fixture.detectChanges();
        const classes = component.menuItemClasses();
        expect(classes).toEqual(testClasses);
    });

    it('can show sub list', () => {
        component.expanded = true;
        component.menuItem = {...NAVIGATIONLIST[2]};

        fixture.detectChanges();
        const subItems = fixture.debugElement.nativeElement.querySelectorAll('.sub-list');
        expect(subItems.length).toEqual(1);
    });

    it('should has a sub items', () => {
        component.menuItem = {...NAVIGATIONLIST[2]};
        component.subItems = [NAVIGATIONLIST[3], NAVIGATIONLIST[6]];
        component.showSubLevels = 1;
        const hasSubItems = component.hasSubItems();

        expect(hasSubItems).toBeTruthy();
    });

    it('should\`t has a sub items if showSubLevels = 0', () => {
        component.menuItem = {...NAVIGATIONLIST[2]};
        component.subItems = [NAVIGATIONLIST[3], NAVIGATIONLIST[6]];
        component.showSubLevels = 0;
        const hasSubItems = component.hasSubItems();

        expect(hasSubItems).toBeFalsy();
    });

    it('should can toggle expand status', () => {
        component.expanded = false;
        const testEvent: Event = new Event('click');
        component.expand(testEvent, NAVIGATIONLIST[2]);

        expect(component.expanded).toBeTruthy();
    });


});
