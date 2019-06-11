import { APP_BASE_HREF } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { storiesOf, moduleMetadata } from '@storybook/angular';
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
import { Subscription } from 'rxjs/internal/Subscription';
import { INavigationItem } from './navigation.interface';

//  Import component being tested
import { NavigationService } from './navigation.service';

import { NAVIGATIONLIST } from './navigationList.mock';

//  Import the readme markdown content for the story
import * as readme from './README.md';

@Component({
    selector: 'story-navigation',
    template: `

        <div class="">
            <h1>Active path</h1>
            <ul class="list" >
                <li class="path-item" *ngFor="let item of activeList">
                    <a [routerLink]="item.url">
                        {{ item.name }} -
                        <span *ngIf="item.url">{{item.url}}</span>
                        <span *ngIf="!item.url">No URL</span>
                    </a> /
                </li>
            </ul>
        </div>
        <div class="wrap">
            <div class="level"
                 *ngIf="activeLevelsList?.length > 0">
                <div class="level-iterate"
                     *ngFor="let items of activeLevelsList; index as i">
                    <div *ngIf="items?.length > 0">
                        <h1>Level {{i + 1}}</h1>
                        <ul  class="navigation-list">
                            <li
                                *ngFor="let item of items"
                                class="navigation-item"
                            >
                                <a class="navigation-item-link"
                                   [ngClass]="{'selected': isActive(item)}"
                                   [routerLink]="item.url">
                                    <span class="text">{{ item.name }} - {{item.url}}</span>
                                </a>
                            </li>
                        </ul>
                
                        <hr>
                    </div>
                </div>
            </div>
            <div class="url-list">
                <h1>All Navigation List</h1>
                <ul class="list" >
                    <li *ngFor="let item of navigationService.navigationList">
                        <a [routerLink]="item.url">
                            {{ item.name }} - 
                            <span *ngIf="item.url">{{item.url}}</span>
                            <span *ngIf="!item.url">No URL</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <style>
            .wrap {
                display: flex;
                justify-content: space-between;
            }
            .url-list,
            .level {
                width: 45%;
            }
            .selected {
                color: green;
            }
            .path-item {
                display: inline-block;
            }
        </style>
    `
})
export class StoryNavigationComponent implements OnInit, OnDestroy {
    @Input() url1: string = '';
    @Input() url2: string = '';
    public activeLevelsList: INavigationItem[][] = [];
    public activeList: INavigationItem[] = [];

    private currentNavigationItemsSubscription: Subscription;

    constructor(
        private navigationService: NavigationService,
        private router: Router
    ) {}

    public ngOnInit() {
        this.fetchNavigation();
        this.router.navigateByUrl(this.url2 || this.url1 || '');
    }

    public ngOnDestroy() {
        this.currentNavigationItemsSubscription.unsubscribe();
    }

    public isActive(node): boolean {
        return !!this.activeList.find(el => el.id === node.id);
    }

    private fetchNavigation(): void {

        this.currentNavigationItemsSubscription = this.navigationService.currentNavigationItems.subscribe(
            (data: INavigationItem[]) => {
                this.activeList = data;
                if(data && data.length > 0) {
                    this.activeLevelsList = data.map(el => {
                         return this.navigationService.filterNavigationById(el.id);
                    });
                }
            }
        );
    }
}

// Setup Stub Routes
const appRoutes: Routes = NAVIGATIONLIST.map(el => {
    return {
        path: el.url,
        component: StoryNavigationComponent,
        data: {
            navigationItemId: el.id
        }
    }
});
appRoutes.push({
    path: 'iframe.html',
    component: StoryNavigationComponent,
    data: {
        navigationItemId: 0
    }
});
appRoutes.push({
    path: 'sales/**',
    component: StoryNavigationComponent,
    data: {
        navigationItemId: 3
    }
});
appRoutes.push({
    path: 'traffic/item/:id  ', component: StoryNavigationComponent,
    children: [
        { path: 'notes', component: StoryNavigationComponent },
        { path: 'notes/:noteid', component: StoryNavigationComponent}
    ]
},);
appRoutes.push({
    path: '**',
    component: StoryNavigationComponent,
    data: {
        navigationItemId: 0
    }
});

storiesOf('Services/Navigation', module)
    .addDecorator(
        moduleMetadata({
            declarations: [StoryNavigationComponent],
            imports: [
                RouterModule.forRoot([
                    ...appRoutes,
                ]),
            ],
            providers: [
                {provide: APP_BASE_HREF, useValue: '/'},
                NavigationService,
            ]
        })
    )
    .addDecorator(withKnobs)
    .addDecorator(withNotes({ markdown: readme }))
    .add('Navigation ', () => ({
        component: StoryNavigationComponent,
        props: {
            url2: text('Url. It is run Angular Router (has more weight than select input below)', ''),
            url1: select('Url. It is run Angular Router', {
                'Root URL - /': '',
                'Level 1 Item - /schedule': 'schedule',
                'Level 3 Item - /linear/scheduledaylist': 'linear/scheduledaylist',
                'Level 1 Item - /traffic': 'traffic',
                'Level 2 Item - /traffic/item': 'traffic/item',
                'Level 3 Item - /traffic/item/id': 'traffic/item/id',
                'Level 3 Item - /traffic/item/3': 'traffic/item/3',
            })
        }
    }));
