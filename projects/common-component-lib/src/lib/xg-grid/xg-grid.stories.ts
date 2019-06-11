import { storiesOf, addDecorator } from '@storybook/angular';
import { withNotes } from '@storybook/addon-notes';
import * as knobs from '@storybook/addon-knobs';
import { number } from '@storybook/addon-knobs';
import { xgDataExportProcessingMode, xgDataExportSelctionMode } from './sub-components/xg-grid-data-export/xg-grid-data-export.component';


//  Import README documents
import * as defaultMarkdownDocument from './documentation/README.md';
import * as needDocsMarkdownDocument from './documentation/requirements/NEEDDOCS.md';
import * as globalSearchMarkdownDocument from './documentation/requirements/grid/global search/README.md';
import * as globalPagingMarkdownDocument from './documentation/requirements/grid/paging/README.md';
import * as globalVirtualScrollingMarkdownDocument from './documentation/requirements/grid/virtual scrolling/README.md';
import * as globalEditingMarkdownDocument from './documentation/requirements/grid/editing/README.md';
import * as captionLabelMarkdownDocument from './documentation/requirements/grid/caption/README.md';

import * as columnPickerMarkdownDoc from './documentation/requirements/columns/picker/README.md'
import * as columnSortingMarkdownDoc from './documentation/requirements/columns/sorting/README.md'
import * as columnFilteringMarkdownDoc from './documentation/requirements/columns/filtering/README.md'
import * as columnReorderingMarkdownDoc from './documentation/requirements/columns/reordering/README.md'
import * as columnReSizingMarkdownDoc from './documentation/requirements/columns/resizing/README.md'
import * as rowSelectionMarkdownDoc from './documentation/requirements/rows/selection/README.md'
import * as rowReorderingMarkdownDoc from './documentation/requirements/rows/reordering/README.md'
import * as rowSummaryMarkdownDoc from './documentation/requirements/rows/summary/README.md'
import * as exportingMarkdownDoc from './documentation/requirements/grid/exporting/README.md'
import * as calulationsMarkdownDoc from './documentation/requirements/grid/calculations/README.md'

//  Import supporting objects
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { XgGridModule } from './xg-grid.module';
import { xgGridModel } from './domain/grid-columns';
import { xgControlPattern } from './sub-components/dynamic-form/regex-lib';

// Import mock data for use with the grid
import mockData from './domain/mockData.json';
import mockDataTime from './domain/mockDataTime.json';
import mockDateTimeFloat from './domain/mockDateTimeFloat.json';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { XgDatePickerComponentModule } from '../xg-date-picker/xg-date-picker.component';
import { XgTimePickerModule } from '../xg-time-picker/xg-time-picker.component';
import { XgDatePickerService } from '../xg-date-picker/xg-date-picker.service';

// * Column Configuration -- Used to ensure the grid can understand the data bound to it

const toolbarActions: xgGridModel.ToolbarActionSettings[] = [
    {
        actionType: 'edit',
        actionConfig: {
            iconClass: 'edit',
            visible: true,
            disabled: false
        }
    }
]

const gridConfig: xgGridModel.Configuration = {
    uniqueIdName: 'AccountExecutiveId',
    toolbarActionSettings: toolbarActions,
    columns: [
        {
            field: 'Actions',
            header: 'Actions',
            display: xgGridModel.ColumnDisplay.Hidden,
            dataType: 'number',
            ordinal: 0,
            editSettings: {
                type: xgGridModel.ControlTypes.input,
                inputType: xgGridModel.InputTypes.number
            },
            calculationsEnabled: true,
            calculationConfiguration: {
                allowUserSelection: true,
                defaultCalculations: [xgGridModel.CalculationsForNumerics.Average, xgGridModel.CalculationsForNumerics.Sum]
            },
            allowActionEdit: true,
            allowActionAdd: true,
            allowActionDelete: true

        },
        {
            field: 'AccountExecutiveId',
            header: 'ID',
            display: xgGridModel.ColumnDisplay.Visible,
            dataType: 'number',
            ordinal: 0,
            editSettings: {
                type: xgGridModel.ControlTypes.input,
                inputType: xgGridModel.InputTypes.number
            },
            calculationsEnabled: true,
            calculationConfiguration: {
                allowUserSelection: true,
                defaultCalculations: [xgGridModel.CalculationsForNumerics.Average, xgGridModel.CalculationsForNumerics.Sum]
            }

        },
        {
            field: 'CreatedDate',
            header: 'Created Date',
            display: xgGridModel.ColumnDisplay.Visible,
            dataType: 'date',
            ordinal: 9,
            canEdit: true,
            editSettings: {
                type: xgGridModel.ControlTypes.date
            },
            controlPatterns: [xgControlPattern.Required],
            calculationsEnabled: true,
            dateFormatter: {
                formatter: "MM/dd/yy"
            }
        },
        {
            field: 'FirstName',
            header: 'First Name',
            display: xgGridModel.ColumnDisplay.Visible,
            dataType: 'string',
            ordinal: 2,
            canEdit: true,
            editSettings: {
                type: xgGridModel.ControlTypes.input,
                inputType: xgGridModel.InputTypes.text,
            },
            controlPatterns: [xgControlPattern.MinLength(2), xgControlPattern.MaxLength(32), xgControlPattern.Required]
        },
        {
            field: 'LastName',
            header: 'Last Name',
            display: xgGridModel.ColumnDisplay.Visible,
            dataType: 'string',
            ordinal: 3,
            canEdit: true,
            editSettings: {
                type: xgGridModel.ControlTypes.input,
                inputType: xgGridModel.InputTypes.text
            }
        },
        {
            field: 'Email',
            header: 'Email Address',
            display: xgGridModel.ColumnDisplay.Visible,
            dataType: 'string',
            ordinal: 4,
            canEdit: true,
            editSettings: {
                type: xgGridModel.ControlTypes.input,
                inputType: xgGridModel.InputTypes.email
            },
            controlPatterns: [xgControlPattern.EmailAddress, xgControlPattern.Required]
        },
        {
            field: 'Phone',
            header: 'Phone',
            display: xgGridModel.ColumnDisplay.Hidden,
            dataType: 'number',
            ordinal: 6,
            formatter: xgGridModel.DataFormatter.Phone,
            canEdit: true,
            editSettings: {
                type: xgGridModel.ControlTypes.input,
                inputType: xgGridModel.InputTypes.tel
            },
            controlPatterns: [xgControlPattern.PhoneNumber, xgControlPattern.Required]
        },
        {
            field: 'PhoneExt',
            header: 'Phone Extention',
            display: xgGridModel.ColumnDisplay.Hidden,
            dataType: 'number',
            ordinal: 7,
            canEdit: true,
            editSettings: {
                type: xgGridModel.ControlTypes.select,
                options: ["24", "25", "26", "27", "28"] //TODO:  this needs to be expanded to accept a promise return for async call outs
            },
            controlPatterns: [xgControlPattern.Required]
        },
        {
            field: 'DefaultSalesOffice',
            header: 'Default Sales Office',
            display: xgGridModel.ColumnDisplay.Visible,
            dataType: 'string',
            ordinal: 8,
            canEdit: true,
            editSettings: {
                type: xgGridModel.ControlTypes.input
            }
        },
        {
            field: 'Fax',
            header: 'Fax',
            display: xgGridModel.ColumnDisplay.Hidden,
            dataType: 'string',
            ordinal: 9,
            formatter: xgGridModel.DataFormatter.Phone
        },
        {
            field: 'SalesOfficeList',
            header: 'Sales Office List',
            display: xgGridModel.ColumnDisplay.Hidden,
            dataType: 'string',
            ordinal: 10
        },
        {
            field: 'IsActive',
            header: 'Active',
            display: xgGridModel.ColumnDisplay.Visible,
            dataType: 'boolean',
            ordinal: 11,
            canEdit: true,
            outputMode: {
                readonly: true,
                interactionMode: xgGridModel.BooleanComponentModes.Checkbox,
                readonlyMode: xgGridModel.BooleanComponentModes.Checkbox
            }
        },
        // * Example for the radio button implementation 
        // {
        //     field: 'IsActive',
        //     header: 'Active Radio Example',
        //     display: 'none',
        //     dataType: 'boolean',
        //     ordinal: 12,
        //     canEdit: true,
        //     editSettings: {
        //         type: ControlTypes.radiobutton,
        //         options: ["true", "false"]
        //     }
        // }
        {
            field: 'DefaultSalesOfficeId',
            header: 'Default Sales Office ID',
            ordinal: 100,
            dataType: 'number',
            calculationsEnabled: true,
            numberFormat: true
        }
    ],
    editSettings:
    {
        editEnabled: true,
        editMode: xgGridModel.GridEditMode.popup
    }
}
const gridConfigWithTime = JSON.parse(JSON.stringify(gridConfig))
gridConfigWithTime.columns.push({
    field: 'startTime',
    header: 'Time',
    display: xgGridModel.ColumnDisplay.Visible,
    dataType: 'time',
    ordinal: 12,
    canEdit: true
})
const gridConfigDateTimeFloat = gridConfig
gridConfigDateTimeFloat.columns.push({
    field: 'TimeData',
    header: 'Time',
    display: xgGridModel.ColumnDisplay.Visible,
    dataType: 'time',
    ordinal: 8,
    canEdit: true,

    editSettings: {
        type: xgGridModel.ControlTypes.time
    },
    controlPatterns: [xgControlPattern.Required],
    timeFormatter: {
        hourFormat: false
    }
}, {
        field: 'RoundData',
        header: 'Round',
        display: xgGridModel.ColumnDisplay.Visible,
        dataType: 'decimal',
        ordinal: 7,
        canEdit: true,

        editSettings: {
            type: xgGridModel.ControlTypes.roundOff,
            inputType: xgGridModel.InputTypes.number,
        },
        controlPatterns: [xgControlPattern.Required],
        roundOff: '1.2-2'
    })

// * Grid Action Icons Configuration
// const customIconsConfig: object = {
//     edit: { icon: 'edit', visible: true },
//     save: { icon: 'save', visible: true },
//     undo: { icon: 'undo', visible: true },
//     delete: { icon: 'delete', visible: true },
//     remove: { icon: 'remove_circle', visible: true }
// }

//  Knobs Grouping Header Labels
const groupInteractions = '1) Interactions/Features/Logging'
const groupFiltering = '3) Filtering';
const groupVisuals = '2) Grid Visuals';
const groupEditing = '4) Editing';
const groupMasterDetails = '5) Master w/ Details';
const groupColConfig = '6) Column Config';
const groupGridData = '7) Grid Data';

const gridStories = storiesOf('Components/xgGrid', module).addParameters({ options: { addonPanelInRight: false } });
const gridRequirementStories = storiesOf('Components/xgGrid/Requirements Showcase', module).addParameters({ options: { addonPanelInRight: false } });

addDecorator(knobs.withKnobs);
addDecorator(withNotes);



/* test Component*/
@Component({
    selector: 'dummyGrid',
    template: `
    <xg-grid 
    [loading]="loading" 
    [logEventsToConsole]="logEventsToConsole" 
    [devMode]="devMode" 
    [showToolbarSection]="showToolbarSection" 
    [allowColumnSorting]="allowColumnSorting" 
    [allowColumnReordering]="allowColumnReordering" 
    [allowColumnResize]="allowColumnResize" 
    [allowRowReordering]="allowRowReordering" 
    [allowRowSelection]="allowRowSelection"
    [useCheckBoxSelection]="useCheckBoxSelection" 
    [selectionMode]="selectionMode" 
    [captionLabel]="captionLabel" 
    [showCalculationsRow]="showCalculationsRow" 
    [showSummaryRow]="showSummaryRow" 
    [showTotalRecordCount]="showTotalRecordCount" 
    [showSelectedRecordCount]="showSelectedRecordCount" 
    [showRowHover]="showRowHover" 
    [enableGridEdit]="enableGridEdit" 
    [enableActionsColumn]="enableActionsColumn"
    [enableGlobalFilter]="enableGlobalFilter" 
    [showColumnFilterRow]="showColumnFilterRow" 
    [showFilterLabels]="showFilterLabels" 
    [showFilterColumnHighlighting]="showFilterColumnHighlighting" 
    [showDetailsRow]="showDetailsRow" 
    [gridConfig]="gridConfig" 
    [data]="data" 
    [gridReadonly]="gridReadonly" 
    [allowExport]="allowExport" 
    [usePagination]="usePagination"
    [pageRowCount]="pageRowCount"
    [lazyLoading]="lazyLoading"
    [editMode]="editMode"
    [enableFloatingActions]="enableFloatingActions"
    [exportProcessingMode]="exportProcessingMode" 
    [exportSelectionMode]="exportSelectionMode"
    (onGridActionEvents)="actionBarEvents($event)"
    >
    <ng-template xgCustomCellTemplateContent="FirstName" let-data let-rowData="rowData" let-field="field">
    <button>{{field}}</button>
  </ng-template>
  <ng-template xgCustomCellTemplateContent="LastName" let-data let-rowData="rowData" let-field="field">
  <button>{{field}}</button>
</ng-template>
    </xg-grid>
    `
})
export class XgGridComponentTest implements OnInit {
    @Input() gridConfig: xgGridModel.Configuration;
    @Input() data: any[] = [];
    @Input() loading: boolean = false;
    @Input() logEventsToConsole: boolean = true;
    @Input() devMode: boolean = false;

    // * Filtering Options
    @Input() enableGlobalFilter: boolean = true;
    @Input() showColumnFilterRow: boolean = false;
    @Input() showFilterLabels: boolean = false;
    @Input() showFilterColumnHighlighting: boolean = false;
    filteredRecordCount: number;
    filterCount: number = 0;

    // * Visualization Options
    @Input() captionLabel: string = 'Imagine Communications  - xg-grid';
    @Input() showCalculationsRow: boolean = false;
    @Input() showSummaryRow: boolean = true;
    @Input() showTotalRecordCount: boolean = true;
    @Input() showSelectedRecordCount: boolean = true;
    @Input() showToolbarSection: boolean = true;
    @Input() allowColumnReordering: boolean = true;
    @Input() allowColumnResize: boolean = true;
    @Input() allowColumnSorting: boolean = true;
    @Input() sortMode: xgGridModel.SortMode = xgGridModel.SortMode.Single;
    @Input() allowRowReordering: boolean = false;
    @Input() showRowHover: boolean = true;
    @Input() showColumnPicker: boolean = false;
    @Input() useAutoLayout: boolean = true;
    @Input() responsive: boolean = true;

    // * Selections
    @Input() allowRowSelection: boolean = false;
    @Input() useCheckBoxSelection: boolean = true;
    @Input() selectionMode: xgGridModel.SelectionMode = xgGridModel.SelectionMode.Single; //  TODO:  This needs to be addressed as in conlifct with the useCheckBoxSelection is redundant

    // * Scrollng / Paging
    @Input() usePagination: boolean = true;
    @Input() enableScrolling: boolean = false;
    @Input() scrollHeight: number = 250;
    @Input() pageRowCount: number = 5;
    @Input() lazyLoading: boolean = false;
    @Output() lazyLoadFunction: EventEmitter<any> = new EventEmitter;
    @Input() lazyLoadData: any[] = [];
    @Input() virtualScroll: boolean = false;

    // * Editing Options
    @Input() enableActionsColumn: boolean = false;
    @Input() enableGridEdit: boolean = false;
    @Input() editMode: xgGridModel.GridEditMode = xgGridModel.GridEditMode.popup;
    @Input() enableFloatingActions: boolean = false;

    // * Toolbar Specifics
    @Input() allowExport: boolean = false;
    @Input() exportProcessingMode: xgDataExportProcessingMode = xgDataExportProcessingMode.ClientSide;
    @Input() exportSelectionMode: xgDataExportSelctionMode = xgDataExportSelctionMode.All;

    // * Serve-Side Specific
    ServerSideDataPackage: xgGridModel.ServerSide.DataPackage = new xgGridModel.ServerSide.DataPackage();

    // ! this is master details
    @Input() showDetailsRow: boolean = false;
    ngOnInit() {
    }
    actionBarEvents(event) {
        console.log(event);
    }
}

//  Default Usage Cases -- Most complicated
gridStories.add('Default Usage', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: knobs.boolean('Toogle Loading State', false, groupInteractions),
        logEventsToConsole: knobs.boolean('Log Grid Events to Console', false, groupInteractions),
        devMode: knobs.boolean('Show DevMode Options', true, groupInteractions),
        showToolbarSection: knobs.boolean('Show Toolbar Options', true, groupInteractions),
        allowColumnSorting: knobs.boolean('Allow Column Sorting', true, groupInteractions),
        allowColumnReordering: knobs.boolean('Allow Column Reordering', true, groupInteractions),
        allowColumnResize: knobs.boolean('Allow Column Re-Sizing', true, groupInteractions),
        allowRowReordering: knobs.boolean('Allow Row Reordering', true, groupInteractions),
        allowRowSelection: knobs.boolean('Allow Row Selection', true, groupInteractions),
        selectionMode: '',

        captionLabel: knobs.text('Caption Label', 'Imagine Communications - xgGrid', groupVisuals),
        showCalculationsRow: knobs.boolean('Show Footer Row', false, groupVisuals),
        showSummaryRow: knobs.boolean('Show Summary Row', true, groupVisuals),
        showTotalRecordCount: knobs.boolean('Show Total Record Count', true, groupVisuals),
        showSelectedRecordCount: knobs.boolean('Show Selected Record Count', true, groupVisuals),
        showRowHover: knobs.boolean('Show Row Hover Effect', true, groupVisuals),

        enableGridEdit: knobs.boolean('Allow Edit', true, groupEditing),
        enableActionsColumn: knobs.boolean('Show Actions Column', true, groupEditing),

        enableGlobalFilter: knobs.boolean('Enable Global Filter', false, groupFiltering),
        showColumnFilterRow: knobs.boolean('Enable Column Filter', false, groupFiltering),
        showFilterLabels: knobs.boolean('Enable Column Filter Labels', true, groupFiltering),
        showFilterColumnHighlighting: knobs.boolean('Enable Column Filter Hightlighting', true, groupFiltering),

        showDetailsRow: knobs.boolean('Show Details Row', true, groupMasterDetails),

        gridConfig: knobs.object('gridConfig', gridConfig, groupColConfig),
        data: knobs.object('data', mockData, groupGridData),
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: defaultMarkdownDocument } }
);



//  Caption
gridRequirementStories.add('Grid -Caption Label', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: true,
        devMode: false,
        showToolbarSection: false,
        allowColumnReordering: false,
        allowColumnResize: false,
        allowRowReordering: false,
        allowRowSelection: true,
        useCheckBoxSelection: false,
        captionLabel: knobs.text('Grid Caption', 'Caption Example', groupVisuals),
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: true,
        showSelectedRecordCount: true,
        showRowHover: true,

        enableGridEdit: false,
        enableActionsColumn: false,

        enableGlobalFilter: true,
        showColumnFilterRow: false,
        showFilterLabels: false,
        showFilterColumnHighlighting: true,

        showDetailsRow: false,
        pageRowCount: 15,
        gridConfig: gridConfig,
        data: mockData,
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: captionLabelMarkdownDocument } }
);


//  Global Search
gridRequirementStories.add('Grid - Search', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: true,
        devMode: false,
        showToolbarSection: true,
        allowExport: true,
        allowColumnReordering: false,
        allowColumnResize: false,
        allowRowReordering: false,
        allowRowSelection: true,
        useCheckBoxSelection: false,
        captionLabel: 'Search Example',
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: true,
        showSelectedRecordCount: true,
        showRowHover: true,

        enableGridEdit: false,
        enableActionsColumn: false,

        enableGlobalFilter: knobs.boolean('Enable Filter/Search', true, groupFiltering),
        showColumnFilterRow: false,
        showFilterLabels: false,
        showFilterColumnHighlighting: true,

        showDetailsRow: false,
        pageRowCount: 15,
        gridConfig: knobs.object('gridConfig', gridConfig, groupColConfig),
        data: knobs.object('data', mockData, groupGridData),
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: globalSearchMarkdownDocument } }
);

//  Global Paging
gridRequirementStories.add('Grid - Paging', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: true,
        devMode: false,
        showToolbarSection: false,
        allowColumnReordering: false,
        allowColumnResize: false,
        allowRowReordering: false,
        allowRowSelection: true,
        useCheckBoxSelection: false,
        captionLabel: 'Paging Example',
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: true,
        showSelectedRecordCount: false,
        showRowHover: false,
        usePagination: knobs.boolean('Use Pagination', true, groupInteractions),
        pageRowCount: knobs.text('Page Size', 5, groupInteractions),
        enableGridEdit: false,
        enableActionsColumn: false,

        enableGlobalFilter: false,
        showColumnFilterRow: false,
        showFilterLabels: false,
        showFilterColumnHighlighting: true,

        showDetailsRow: false,
        gridConfig: knobs.object('gridConfig', gridConfig, groupColConfig),
        data: mockData,
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: globalPagingMarkdownDocument } }
);

// Lazy Loading
gridRequirementStories.add('Grid - Paging - Lazy Loading', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: true,
        lazyLoading: true,
        pageRowCount: number('Page Size', 15, groupInteractions),
        usePagination: true,

        logEventsToConsole: true,
        devMode: false,
        showToolbarSection: true,
        allowColumnReordering: false,
        allowColumnResize: true,
        allowRowReordering: false,
        allowRowSelection: true,
        enableActionsColumn: false,
        captionLabel: 'Lazy Loading / Async Example',
        selectionMode: xgGridModel.SelectionMode.Multiple,
        enableScrolling: knobs.boolean('Enable Fixed Height Scrolling', true, groupInteractions),
        scrollHeight: number('Scroll Height', 250, groupInteractions),
        useAutoLayout: knobs.boolean('Use Auto Layout', true, groupInteractions),
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: true,
        showSelectedRecordCount: true,
        showRowHover: false,
        enableGridEdit: false,
        useCheckBoxSelection: false,
        enableGlobalFilter: false,
        showColumnFilterRow: false,
        showFilterLabels: false,
        showFilterColumnHighlighting: false,

        showDetailsRow: false,

        gridConfig: gridConfig,
        data: mockData,
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
})
    , { notes: { markdown: globalPagingMarkdownDocument } }
);

//Fixed Height
gridRequirementStories.add('Grid - Scrolling - Fixed Height', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: false,
        devMode: false,
        showToolbarSection: true,
        allowColumnReordering: false,
        allowColumnResize: true,
        allowRowReordering: false,
        allowRowSelection: true,
        enableActionsColumn: false,
        captionLabel: 'Fixed Height Scrolling',
        selectionMode: xgGridModel.SelectionMode.Multiple,
        enableScrolling: knobs.boolean('Enable Fixed Height Scrolling', true, groupInteractions),
        scrollHeight: number('Scroll Height', 250, groupInteractions),
        useAutoLayout: knobs.boolean('Use Auto Layout', true, groupInteractions),
        pageRowCount: number('Page Size', 20, groupInteractions),
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: true,
        showSelectedRecordCount: false,
        showRowHover: false,
        enableGridEdit: false,
        useCheckBoxSelection: false,
        enableGlobalFilter: false,
        showColumnFilterRow: false,
        showFilterLabels: false,
        showFilterColumnHighlighting: false,

        showDetailsRow: false,

        gridConfig: gridConfig,
        data: mockData,
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
})
    , { notes: { markdown: needDocsMarkdownDocument } }
);

// Virtual Scrolling
gridRequirementStories.add('Grid - Scrolling - Virtual Scrolling', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: true,
        lazyLoading: true,
        pageRowCount: number('Page Size', 15, groupInteractions),
        usePagination: false,
        virtualScroll: true,
        enableScrolling: knobs.boolean('Enable Fixed Height Scrolling', true, groupInteractions),
        scrollHeight: number('Scroll Height', 250, groupInteractions),


        logEventsToConsole: true,
        devMode: false,
        showToolbarSection: true,
        allowColumnReordering: false,
        allowColumnResize: true,
        allowRowReordering: false,
        allowRowSelection: true,
        enableActionsColumn: false,
        captionLabel: 'Infinite Scrolling Example',
        selectionMode: xgGridModel.SelectionMode.Multiple,
        useAutoLayout: knobs.boolean('Use Auto Layout', true, groupInteractions),
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: true,
        showSelectedRecordCount: true,
        showRowHover: false,
        enableGridEdit: false,
        useCheckBoxSelection: false,
        enableGlobalFilter: false,
        showColumnFilterRow: false,
        showFilterLabels: false,
        showFilterColumnHighlighting: false,

        showDetailsRow: false,

        gridConfig: gridConfig,
        data: mockData,
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
})
    , { notes: { markdown: globalVirtualScrollingMarkdownDocument } }
);

//  Global Editing
gridRequirementStories.add('Grid - Editing - Popup Mode', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: true,
        devMode: false,
        showToolbarSection: true,
        allowColumnReordering: knobs.boolean('Enable Column Re-Ordering', true, groupInteractions),
        allowColumnResize: true,
        allowRowReordering: false,
        allowRowSelection: true,
        selectionMode: xgGridModel.SelectionMode.Multiple,
        useCheckBoxSelection: false,
        captionLabel: 'Editing Example',
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: true,
        showSelectedRecordCount: true,
        showRowHover: true,
        usePagination: true,
        pageRowCount: 20,
        enableGridEdit: knobs.boolean('Enable Grid Editing', true, groupEditing),
        enableFloatingActions: knobs.boolean('Enable Floating Actions', false, groupEditing),
        editMode: xgGridModel.GridEditMode.popup,
        enableActionsColumn: false,

        enableGlobalFilter: false,
        showColumnFilterRow: false,
        showFilterLabels: false,
        showFilterColumnHighlighting: true,

        showDetailsRow: false,
        gridConfig: knobs.object('Column Configuration', gridConfig, groupColConfig),
        data: mockData,
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: globalEditingMarkdownDocument } }
);
//  Editing - Inline Mode
gridRequirementStories.add('Grid - Editing - Inline Mode', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: true,
        devMode: false,
        showToolbarSection: true,
        allowColumnReordering: knobs.boolean('Enable Column Re-Ordering', true, groupInteractions),
        allowColumnResize: true,
        allowRowReordering: false,
        allowRowSelection: true,
        selectionMode: xgGridModel.SelectionMode.Multiple,
        useCheckBoxSelection: false,
        captionLabel: 'Editing Example',
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: true,
        showSelectedRecordCount: true,
        showRowHover: true,
        usePagination: true,
        pageRowCount: 20,
        enableGridEdit: knobs.boolean('Enable Grid Editing', true, groupEditing),
        enableFloatingActions: knobs.boolean('Enable Floating Actions', false, groupEditing),
        editMode: xgGridModel.GridEditMode.inline,
        enableActionsColumn: false,

        enableGlobalFilter: false,
        showColumnFilterRow: false,
        showFilterLabels: false,
        showFilterColumnHighlighting: true,

        showDetailsRow: false,
        gridConfig: knobs.object('Column Configuration', gridConfig, groupColConfig),
        data: mockData,
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: globalEditingMarkdownDocument } }
);
//  Exporting
gridRequirementStories.add('Grid - Exporting', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: true,
        devMode: false,
        showToolbarSection: true,
        allowColumnReordering: knobs.boolean('Enable Column Re-Ordering', true, groupInteractions),
        allowColumnResize: true,
        allowRowReordering: false,
        allowRowSelection: true,
        allowExport: true,
        selectionMode: xgGridModel.SelectionMode.Multiple,
        useCheckBoxSelection: false,
        captionLabel: 'Exporting Examples',
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: true,
        showSelectedRecordCount: true,
        showRowHover: true,
        usePagination: true,
        pageRowCount: 20,
        enableGridEdit: knobs.boolean('Enable Grid Editing', true, groupEditing),
        enableFloatingActions: knobs.boolean('Enable Floating Actions', false, groupEditing),
        editMode: xgGridModel.GridEditMode.popup,
        enableActionsColumn: false,

        enableGlobalFilter: false,
        showColumnFilterRow: false,
        showFilterLabels: false,
        showFilterColumnHighlighting: true,

        showDetailsRow: false,
        gridConfig: knobs.object('Column Configuration', gridConfig, groupColConfig),
        data: mockData,
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: exportingMarkdownDoc } }
);
//  Calculations
gridRequirementStories.add('Grid - Calculations (Summary Rows)', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        usePagination: true,
        pageRowCount: 100,
        showCalculationsRow: knobs.boolean('Show Calculations Row', true),
        responsive: knobs.boolean('Responsive Table', true),
        useAutoLayout: knobs.boolean('Autolayout Table', true),
        loading: false,
        showToolbarSection: true,
        allowExport: true,
        selectionMode: xgGridModel.SelectionMode.Multiple, // not the default
        captionLabel: 'Calculations Examples',
        gridConfig: gridConfig,
        data: mockData,
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    {
        notes:
        {
            markdown: calulationsMarkdownDoc
        }
    }
);


//  Column Picker
gridRequirementStories.add('Columns  - Column Picker', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: true,
        devMode: false,
        showToolbarSection: knobs.boolean('Show Toolbar', true, groupInteractions),
        showColumnPicker: knobs.boolean('Show Column Picker', true, groupInteractions),
        allowColumnReordering: true,
        allowColumnResize: false,
        allowRowReordering: false,
        allowRowSelection: true,
        useCheckBoxSelection: false,
        captionLabel: 'Column Picker Example',
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: true,
        showSelectedRecordCount: false,
        showRowHover: false,

        enableGridEdit: false,
        enableActionsColumn: false,

        enableGlobalFilter: false,
        showColumnFilterRow: false,
        showFilterLabels: false,
        showFilterColumnHighlighting: true,

        showDetailsRow: false,
        pageRowCount: 10,
        gridConfig: gridConfig,
        data: mockData,
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: columnPickerMarkdownDoc } }
);


// Column Sorting
gridRequirementStories.add('Columns - Sorting', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: false,
        devMode: false,
        showToolbarSection: false,
        allowColumnSorting: knobs.boolean('Allow Column Sorting', true, groupInteractions),
        allowColumnReordering: false,
        allowColumnResize: false,
        allowRowReordering: false,
        allowRowSelection: false,

        captionLabel: 'Column Sorting Example',
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: true,
        showSelectedRecordCount: false,
        showRowHover: false,

        enableGridEdit: false,
        enableActionsColumn: false,

        enableGlobalFilter: true,
        showColumnFilterRow: false,
        showFilterLabels: false,
        showFilterColumnHighlighting: true,

        showDetailsRow: false,

        gridConfig: knobs.object('gridConfig', gridConfig, groupColConfig),
        data: knobs.object('data', mockData, groupGridData),
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: columnSortingMarkdownDoc } }
);

//  Column Filtering
gridRequirementStories.add('Columns -  Filtering', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: knobs.boolean('Log Events to Console: ', true, groupInteractions),
        devMode: false,
        showToolbarSection: false,
        allowColumnReordering: false,
        allowColumnResize: false,
        allowRowReordering: false,
        allowRowSelection: false,

        captionLabel: 'Column Filtering Example',
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: true,
        showSelectedRecordCount: false,
        showRowHover: false,

        enableGridEdit: false,
        enableActionsColumn: false,

        enableGlobalFilter: false,
        showColumnFilterRow: knobs.boolean('Enable Column Filtering', true, groupFiltering),
        showFilterLabels: knobs.boolean('Show Column Filter Labels', false, groupFiltering),
        showFilterColumnHighlighting: knobs.boolean('Show Filter Highlighting', true, groupFiltering),
        sortMode: xgGridModel.SortMode.Multiple,
        showDetailsRow: false,

        gridConfig: knobs.object('gridConfig', gridConfig, groupColConfig),
        data: mockData,
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: columnFilteringMarkdownDoc } }
);

//  Column Filtering
gridRequirementStories.add('Columns -  Filtering With Time Format', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: knobs.boolean('Log Events to Console: ', true, groupInteractions),
        devMode: false,
        showToolbarSection: false,
        allowColumnReordering: false,
        allowColumnResize: false,
        allowRowReordering: false,
        allowRowSelection: false,

        captionLabel: 'Column Filtering With Time Example',
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: true,
        showSelectedRecordCount: false,
        showRowHover: false,

        enableGridEdit: false,
        enableActionsColumn: false,

        enableGlobalFilter: false,
        showColumnFilterRow: knobs.boolean('Enable Column Filtering', true, groupFiltering),
        showFilterLabels: knobs.boolean('Show Column Filter Labels', false, groupFiltering),
        showFilterColumnHighlighting: knobs.boolean('Show Filter Highlighting', true, groupFiltering),
        sortMode: xgGridModel.SortMode.Multiple,
        showDetailsRow: false,

        gridConfig: knobs.object('gridConfig', gridConfigWithTime, groupColConfig),
        data: mockDataTime,
    }
}),
    { notes: { markdown: columnFilteringMarkdownDoc } }
);
//  Column reordering
gridRequirementStories.add('Columns - Reordering', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: false,
        devMode: false,
        showToolbarSection: false,
        allowColumnReordering: knobs.boolean('Enable Column Re-Ordering', true, groupInteractions),
        allowColumnResize: false,
        allowRowReordering: false,
        allowRowSelection: false,

        captionLabel: 'Columns Re-Ordering Example',
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: true,
        showSelectedRecordCount: false,
        showRowHover: false,

        enableGridEdit: false,
        enableActionsColumn: false,

        enableGlobalFilter: false,
        showColumnFilterRow: false,
        showFilterLabels: false,
        showFilterColumnHighlighting: false,

        showDetailsRow: false,

        gridConfig: knobs.object('gridConfig', gridConfig, groupColConfig),
        data: mockData,
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: columnReorderingMarkdownDoc } }
);

//  Column resiszing
gridRequirementStories.add('Columns - Resizing', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: false,
        devMode: false,
        showToolbarSection: false,
        allowColumnReordering: false,
        allowColumnResize: knobs.boolean('Enable Column Re-Sizing', true, groupInteractions),
        allowRowReordering: false,
        allowRowSelection: false,

        captionLabel: 'Columns Resizing Example',
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: true,
        showSelectedRecordCount: false,
        showRowHover: false,

        enableGridEdit: false,
        enableActionsColumn: false,

        enableGlobalFilter: false,
        showColumnFilterRow: false,
        showFilterLabels: false,
        showFilterColumnHighlighting: false,

        showDetailsRow: false,

        gridConfig: knobs.object('gridConfig', gridConfig, groupColConfig),
        data: mockData,
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: columnReSizingMarkdownDoc } }
);

//Single/multiple rows selection
gridRequirementStories.add('Row Selection - Single', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: true,
        devMode: false,
        showToolbarSection: false,
        allowColumnReordering: false,
        allowColumnResize: false,
        allowRowReordering: false,
        allowRowSelection: true,
        useCheckBoxSelection: false,


        captionLabel: 'Row Selection Example - Single Select Mode',
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: false,
        showSelectedRecordCount: true,
        showRowHover: false,

        enableGridEdit: false,
        enableActionsColumn: false,

        enableGlobalFilter: false,
        showColumnFilterRow: false,
        showFilterLabels: false,
        showFilterColumnHighlighting: false,

        showDetailsRow: false,

        gridConfig: knobs.object('gridConfig', gridConfig, groupColConfig),
        data: knobs.object('data', mockData, groupGridData),
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: rowSelectionMarkdownDoc } }
);

// Multiple rows selection
gridRequirementStories.add('Row Selection - Multiple', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: true,
        devMode: false,
        showToolbarSection: false,
        allowColumnReordering: false,
        allowColumnResize: false,
        allowRowReordering: false,
        allowRowSelection: true,
        useCheckBoxSelection: knobs.boolean('Use Checkbox Selection:', false, groupInteractions),
        selectionMode: xgGridModel.SelectionMode.Multiple,

        captionLabel: 'Row Selection Example - Multiple Select Mode',
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: false,
        showSelectedRecordCount: true,
        showRowHover: false,

        enableGridEdit: false,
        enableActionsColumn: false,

        enableGlobalFilter: false,
        showColumnFilterRow: false,
        showFilterLabels: false,
        showFilterColumnHighlighting: false,

        showDetailsRow: false,

        gridConfig: knobs.object('gridConfig', gridConfig, groupColConfig),
        data: knobs.object('data', mockData, groupGridData),
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: rowSelectionMarkdownDoc } }
);

// Multiple rows selection
gridRequirementStories.add('Row Selection - None', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: true,
        devMode: false,
        showToolbarSection: false,
        allowColumnReordering: false,
        allowColumnResize: false,
        allowRowReordering: false,
        allowRowSelection: true,
        useCheckBoxSelection: false,
        selectionMode: xgGridModel.SelectionMode.None,

        captionLabel: 'Row Selection Example - None Select Mode',
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: false,
        showSelectedRecordCount: true,
        showRowHover: false,

        enableGridEdit: false,
        enableActionsColumn: false,

        enableGlobalFilter: false,
        showColumnFilterRow: false,
        showFilterLabels: false,
        showFilterColumnHighlighting: false,

        showDetailsRow: false,

        gridConfig: knobs.object('gridConfig', gridConfig, groupColConfig),
        data: mockData,
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: rowSelectionMarkdownDoc } }
);


//Row Reordering - Single
gridRequirementStories.add('Row Reordering - Single Row', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: false,
        devMode: false,
        showToolbarSection: false,
        allowColumnReordering: false,
        allowColumnResize: false,
        allowRowReordering: true,
        allowRowSelection: false,

        captionLabel: 'Row Re-Ordering Example',
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: true,
        showSelectedRecordCount: false,
        showRowHover: false,

        enableGridEdit: false,
        enableActionsColumn: false,

        enableGlobalFilter: false,
        showColumnFilterRow: false,
        showFilterLabels: false,
        showFilterColumnHighlighting: false,

        showDetailsRow: false,

        gridConfig: knobs.object('gridConfig', gridConfig, groupColConfig),
        data: knobs.object('data', mockData, groupGridData),
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: rowReorderingMarkdownDoc } }
);

//Row Reordering - Multiple
gridRequirementStories.add('Row Reordering - Multiple Rows', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: false,
        devMode: false,
        showToolbarSection: false,
        allowColumnReordering: false,
        allowColumnResize: false,
        allowRowReordering: true,
        useCheckBoxSelection: true,
        allowRowSelection: true,
        selectionMode: '',
        captionLabel: 'Row Re-Ordering Example',
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: true,
        showSelectedRecordCount: false,
        showRowHover: false,

        enableGridEdit: false,
        enableActionsColumn: false,

        enableGlobalFilter: false,
        showColumnFilterRow: false,
        showFilterLabels: false,
        showFilterColumnHighlighting: false,

        showDetailsRow: false,

        gridConfig: knobs.object('gridConfig', gridConfig, groupColConfig),
        data: knobs.object('data', mockData, groupGridData),
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: rowReorderingMarkdownDoc } }
);


//  Summary Row
gridRequirementStories.add('Row - Summary Row', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: true,
        devMode: false,
        showToolbarSection: false,
        allowColumnReordering: false,
        allowColumnResize: false,
        allowRowReordering: false,
        allowRowSelection: true,
        useCheckBoxSelection: true,
        selectionMode: '',

        captionLabel: 'Row - Summary Row ',
        showCalculationsRow: false,
        showSummaryRow: knobs.boolean('Show Summary Row', true, groupVisuals),
        showTotalRecordCount: knobs.boolean('Show Total Row Count', false, groupVisuals),
        showSelectedRecordCount: knobs.boolean('Show Selected Row Count', true, groupVisuals),
        showRowHover: false,

        enableGridEdit: false,
        enableActionsColumn: false,

        enableGlobalFilter: false,
        showColumnFilterRow: knobs.boolean('Show Column Filters', true, groupInteractions),
        showFilterLabels: false,
        showFilterColumnHighlighting: true,

        showDetailsRow: false,

        gridConfig: knobs.object('gridConfig', gridConfig, groupColConfig),
        data: knobs.object('data', mockData, groupGridData),
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: rowSummaryMarkdownDoc } }
);

//  Actions Column
gridRequirementStories.add('Row - Actions display', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: true,
        devMode: false,
        showToolbarSection: false,
        allowColumnReordering: false,
        allowColumnResize: false,
        allowRowReordering: false,
        allowRowSelection: false,
        useCheckBoxSelection: false,
        allowActions: true,
        selectionMode: '',
        editMode: xgGridModel.GridEditMode.inline,
        captionLabel: 'Row -Actions display ',
        showCalculationsRow: false,
        showRowHover: false,

        enableGridEdit: true,
        enableActionsColumn: false,

        enableGlobalFilter: false,
        showColumnFilterRow: knobs.boolean('Show Column Filters', true, groupInteractions),
        showFilterLabels: false,
        showFilterColumnHighlighting: true,

        showDetailsRow: false,

        gridConfig: knobs.object('gridConfig', gridConfig, groupColConfig),
        data: knobs.object('data', mockData, groupGridData),
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: rowSummaryMarkdownDoc } }
);

//  Actions Column
gridRequirementStories.add('Grid Readonly ', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: true,
        devMode: false,
        showToolbarSection: false,
        allowColumnReordering: false,
        allowColumnResize: false,
        allowRowReordering: false,
        allowRowSelection: false,
        useCheckBoxSelection: false,
        allowActions: false,
        selectionMode: '',
        captionLabel: 'Grid Readonly ',
        gridReadonly: true,
        showCalculationsRow: false,
        showRowHover: false,

        enableGridEdit: false,
        enableActionsColumn: false,

        enableGlobalFilter: false,
        showColumnFilterRow: knobs.boolean('Show Column Filters', false, groupInteractions),
        showFilterLabels: false,
        showFilterColumnHighlighting: false,

        showDetailsRow: false,

        gridConfig: knobs.object('gridConfig', gridConfig, groupColConfig),
        data: knobs.object('data', mockData, groupGridData),
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: rowSummaryMarkdownDoc } }
);


//Data Formatting
gridRequirementStories.add('Data Formatting', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule, XgDatePickerComponentModule, XgTimePickerModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ],
        providers: [XgDatePickerService]
    },
    props: {
        loading: false,
        logEventsToConsole: true,
        devMode: false,
        showToolbarSection: true,
        allowColumnReordering: knobs.boolean('Enable Column Re-Ordering', true, groupInteractions),
        allowColumnResize: true,
        allowRowReordering: false,
        allowRowSelection: true,
        selectionMode: xgGridModel.SelectionMode.Multiple,
        useCheckBoxSelection: false,
        captionLabel: 'Data Formatting',
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: true,
        showSelectedRecordCount: true,
        showRowHover: true,
        usePagination: true,
        pageRowCount: 20,
        enableGridEdit: knobs.boolean('Enable Grid Editing', true, groupEditing),
        enableFloatingActions: knobs.boolean('Enable Floating Actions', false, groupEditing),
        editMode: xgGridModel.GridEditMode.inline,
        enableActionsColumn: false,

        enableGlobalFilter: false,
        showColumnFilterRow: false,
        showFilterLabels: false,
        showFilterColumnHighlighting: true,

        showDetailsRow: false,
        gridConfig: knobs.object('Column Configuration', gridConfigDateTimeFloat, groupColConfig),
        data: mockDateTimeFloat,
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: rowSummaryMarkdownDoc } }
);

//  Cell Template
gridRequirementStories.add('Cell Template ', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: []
    },
    props: {
        loading: false,
        logEventsToConsole: true,
        devMode: false,
        showToolbarSection: false,
        allowColumnReordering: false,
        allowColumnResize: false,
        allowRowReordering: false,
        allowRowSelection: false,
        useCheckBoxSelection: false,
        allowActions: false,
        selectionMode: '',
        captionLabel: 'Cell Template ',
        gridReadonly: true,
        showCalculationsRow: false,
        showRowHover: false,

        enableGridEdit: false,
        enableActionsColumn: false,

        enableGlobalFilter: false,
        showColumnFilterRow: knobs.boolean('Show Column Filters', false, groupInteractions),

        showFilterLabels: false,
        showFilterColumnHighlighting: false,

        showDetailsRow: false,

        gridConfig: knobs.object('gridConfig', gridConfig, groupColConfig),
        data: knobs.object('data', mockData, groupGridData),

    }
}),
    { notes: { markdown: rowSummaryMarkdownDoc } }
);


//  Editing - Inline Mode With Actions
gridRequirementStories.add('Grid - Editing - Inline Mode With Actions', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        logEventsToConsole: true,
        devMode: false,
        showToolbarSection: true,
        allowColumnReordering: knobs.boolean('Enable Column Re-Ordering', true, groupInteractions),
        allowColumnResize: true,
        allowRowReordering: false,
        allowRowSelection: true,
        selectionMode: xgGridModel.SelectionMode.Multiple,
        useCheckBoxSelection: false,
        captionLabel: 'Editing With Actions Example',
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: true,
        showSelectedRecordCount: true,
        showRowHover: true,
        usePagination: true,
        pageRowCount: 20,
        enableGridEdit: knobs.boolean('Enable Grid Editing', true, groupEditing),
        enableFloatingActions: knobs.boolean('Enable Floating Actions', false, groupEditing),
        editMode: xgGridModel.GridEditMode.popup,
        enableActionsColumn: false,

        enableGlobalFilter: false,
        showColumnFilterRow: false,
        showFilterLabels: false,
        showFilterColumnHighlighting: true,

        showDetailsRow: false,
        gridConfig: knobs.object('Column Configuration', gridConfig, groupColConfig),
        data: mockData,
        // customIconsConfig: knobs.object('Custom Action Icons', customIconsConfig, groupEditing)
    }
}),
    { notes: { markdown: globalEditingMarkdownDocument } }
);

// Lazy Loading
gridRequirementStories.add('Grid - Server side pagination', () => ({
    component: XgGridComponentTest,
    moduleMetadata: {
        imports: [
            XgGridModule,
            BrowserAnimationsModule
        ],
        declarations: [
        ]
    },
    props: {
        loading: false,
        lazyLoading: true,
        pageRowCount: number('Page Size', 15, groupInteractions),
        usePagination: true,

        logEventsToConsole: true,
        devMode: false,
        showToolbarSection: true,
        allowColumnReordering: false,
        allowColumnResize: true,
        allowRowReordering: false,
        allowRowSelection: true,
        enableActionsColumn: false,
        captionLabel: 'Grid Server side pagination',
        selectionMode: xgGridModel.SelectionMode.Multiple,
        enableScrolling: knobs.boolean('Enable Fixed Height Scrolling', true, groupInteractions),
        scrollHeight: number('Scroll Height', 250, groupInteractions),
        useAutoLayout: knobs.boolean('Use Auto Layout', true, groupInteractions),
        showCalculationsRow: false,
        showSummaryRow: true,
        showTotalRecordCount: true,
        showSelectedRecordCount: true,
        showRowHover: false,
        enableGridEdit: false,
        useCheckBoxSelection: false,
        enableGlobalFilter: false,
        showColumnFilterRow: true,
        showFilterLabels: true,
        showFilterColumnHighlighting: true,

        showDetailsRow: false,

        gridConfig: gridConfig,
        data: mockData,
        customIconsConfig: knobs.object('Custom Action Icons', groupEditing)
    }
})
    , { notes: { markdown: globalPagingMarkdownDocument } }
);
