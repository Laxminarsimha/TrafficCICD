import { APP_BASE_HREF } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { moduleMetadata, storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import {
    boolean,
    color,
    number,
    date,
    select,
    text,
    withKnobs,
    withOptions
} from '@storybook/addon-knobs';

import { NAVIGATIONLIST } from '../services/navigation/navigationList.mock';
import { NavigationService } from '../services/navigation/navigation.service';
import { Router, RouterModule, Routes } from '@angular/router';

import { TopBarNavigationComponent} from './top-bar-navigation.component';

@Component({
    selector: 'story-component',
    template: `
        <div style="background-color: gray"><img-lib-top-bar-navigation [level]="level" (selectedItem)="selectedItem($event)"></img-lib-top-bar-navigation></div>
    `
})
export class StoryComponent implements OnInit {
    @Input() level: number = 0;
    @Input() url: string = '';
    constructor(private router: Router) {}

    public ngOnInit() {
        this.router.navigateByUrl(this.url);
    }
}

// Setup Routes
const appRoutes: Routes = NAVIGATIONLIST.map(el => {
    return {
        path: el.url,
        component: StoryComponent,
        data: {
            navigationItemId: el.id
        }
    };
});
appRoutes.push({
    path: '**',
    component: StoryComponent,
});

storiesOf('Components/Top Bar Navigation Component', module)
    .addDecorator(withKnobs)
    .addDecorator(
        moduleMetadata({
            declarations: [
                TopBarNavigationComponent,
                StoryComponent,
            ],
            imports: [RouterModule.forRoot(appRoutes)],
            providers: [
                { provide: APP_BASE_HREF, useValue: '' },
                NavigationService
            ]
        })
    )
    .add('Top Bar Navigation', () => {
        return {
            component: StoryComponent,
            props: {
                url: select('Url. It is run Angular Router', {
                    'Level 1 Item - /schedule': 'schedule',
                    'Level 3 Item - /linear/scheduledaylist': 'linear/scheduledaylist',
                    'Level 1 Item - /traffic': 'traffic',
                    'Level 2 Item - /traffic/item': 'traffic/item',
                    'Level 3 Item - /traffic/item/id': 'traffic/item/id',
                    'Level 3 Item - /traffic/item/3': 'traffic/item/3',
                }),
                level: number('Level', 1),
                selectedItem: action('Selected Item'),
            }
        }});


