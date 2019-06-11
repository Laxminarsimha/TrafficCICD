import { action } from '@storybook/addon-actions';
import {
    boolean,
    object,
    withKnobs,
    text
} from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import { addDecorator, storiesOf, moduleMetadata } from '@storybook/angular';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

//  Import components needed by component being tested
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckboxModule } from 'primeng/checkbox';

//  Import component being tested
import { XgListComponentModule } from './xg-list.component';
// import { text } from '../../../../../node_modules/@fortawesome/fontawesome-svg-core';

addDecorator(withKnobs);
const list = [{
    "description": "List1",
    "title": "List Title",
    "disabled": false
}, {
    "description": "List2",
    "title": "List Title2",
    "disabled": false
}, {
    "description": "List3",
    "title": "List Title3",
    "disabled": false
}, {
    "description": "List4",
    "title": "List Title4",
    "disabled": false
}]

@Component({
    selector: 'story-menu',
    template: `
    <xg-list [headerText]="headerText" growing="false" [dataSource]="dataSource" [multiple]="multiple" [delete]="delete">
    <ng-template let-data #xgCustomTemplate>
      <xg-standard-list-item [title]="data.title" [description]="data.description"></xg-standard-list-item>
    </ng-template>
  </xg-list>
    `
})
export class XgListComponentTest implements OnInit {
    @Input() multiple: boolean = false;
    @Input() delete: boolean = true;
    @Input() dataSource: any[];
    @Input() headerText: string;
    ngOnInit() {

    }
}
storiesOf('Components/XgList', module)
    .addDecorator(withKnobs)
    .addDecorator(
        moduleMetadata({
            declarations: [],
            imports: [XgListComponentModule],
        })
    )
    .add(
        'Default Usage',
        () => ({
            component: XgListComponentTest,
            props: {
                multiple: boolean('Multiple', false),
                dataSource: object("DataSource", list),
                delete: boolean("Delete", true),
                headerText: text("HeaderText", "XGList")
            }
        }),
    )