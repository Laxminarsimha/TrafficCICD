import { APP_BASE_HREF } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withNotes } from '@storybook/addon-notes';
import {
    boolean,
    number,
    date,
    select,
    text,
    withKnobs,
    withOptions
} from '@storybook/addon-knobs';
import { filter } from 'rxjs/operators';

import { MenuItemComponent } from '../menu-item/menu-item.component';
import { INavigationItem } from '../services/navigation/navigation.interface';

import { NAVIGATIONLIST } from '../services/navigation/navigationList.mock';
import { MenuComponent } from './menu.component';
import { NavigationService } from '../services/navigation/navigation.service';
import { NavigationEnd, Router, RouterModule, Routes } from '@angular/router';

//  Import the readme markdown content for the story
import * as readme from './README.md';

@Component({
    selector: 'story-menu',
    template: `
        <img-lib-menu [level]="level" 
                      [showSubLevels]="showSubLevels" 
                      [collapseOnSelect]="collapseOnSelect" 
                      (selectedItem)="selectedItemStory($event)" 
                      style="width: 40%;"></img-lib-menu>
    `
})
export class StoryMenuComponent implements OnInit {
    @Input() url: string = '';
    @Input() level: number = 0;
    @Input() showSubLevels: number = 999;
    @Input() collapseOnSelect: boolean = true;
    @Output() selectedItem: EventEmitter<INavigationItem> = new EventEmitter<INavigationItem>();
    @Output() routerChanged: EventEmitter<any> = new EventEmitter<any>();

    constructor(private router: Router) {
        // Router Events
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe((route: any) => {
               this.routerChanged.emit(route);
            });
    }

    public ngOnInit() {
        this.router.navigateByUrl(this.url);
    }

    public selectedItemStory(node) {
        this.selectedItem.emit(node);
    }
}

// Setup Routes
const appRoutes: Routes = NAVIGATIONLIST.map(el => {
    return {
        path: el.url,
        component: StoryMenuComponent,
        data: {
            navigationItemId: el.id
        }
    };
});
appRoutes.push({
    path: '**',
    component: StoryMenuComponent,
});

storiesOf('Components/Menu', module)
    .addDecorator(withKnobs)
    .addDecorator(
        moduleMetadata({
            declarations: [MenuComponent, MenuItemComponent, StoryMenuComponent],
            imports: [RouterModule.forRoot(appRoutes)],
            providers: [
                { provide: APP_BASE_HREF, useValue: '' },
                NavigationService
            ]
        })
    )
    .addDecorator(withNotes({ markdown: readme }))
    .add('Menu List', () => {
        return {
            component: StoryMenuComponent,
            props: {
                url: select('Url. It is run Angular Router', {
                    'Root URL - /': '',
                    'Level 1 Item - /schedule': 'schedule',
                    'Level 3 Item - /linear/scheduledaylist': 'linear/scheduledaylist',
                    'Level 1 Item - /traffic': 'traffic',
                    'Level 2 Item - /traffic/item': 'traffic/item',
                    'Level 3 Item - /traffic/item/id': 'traffic/item/id',
                    'Level 3 Item - /traffic/item/3': 'traffic/item/3',
                }),
                level: number('Level', 1),
                showSubLevels: number('How many sub level to show', 3),
                collapseOnSelect: boolean('Collapse on select', true),
                selectedItem: action('Menu item is selected'),
                routerChanged: action('Router is changed (not menu component action)'),
            }
        }
    });
