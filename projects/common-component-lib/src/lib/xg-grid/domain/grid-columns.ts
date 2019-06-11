import { xgControlPattern } from "../sub-components/dynamic-form/regex-lib"; //TODO: Ensure this gets moved out when this becomes it's own lib
import * as _ from 'lodash'; // TODO: this needs to be removed and injected perhaps shared service?
import { faSleigh } from "@fortawesome/free-solid-svg-icons";

export namespace xgGridModel {
    export class Configuration {
        uniqueIdName: string = ''
        columns: Column[]
        editSettings?: EditSetting
        toolbarActionSettings?: ToolbarActionSettings[]
        outputMode?: EditSetting
    }

    export class Column {
        field: string;
        header: string;
        display?: ColumnDisplay = ColumnDisplay.Visible;
        dataType: any; // TODO:  This needs to be strongly typed for later extension and defaulted to string and for extensibility
        editSettings?: ColumnEditSetting = { type: ControlTypes.input, inputType: InputTypes.text };
        outputMode?: any;
        formatter?: DataFormatter; // TODO:  This has to be refactored, maybe run in "parallel" with masking/regexlib?
        ordinal: number; // TODO:  This should be non required and should be accounted for on data bind in the grid if empty
        canEdit?: boolean = false;
        controlPatterns?: xgControlPattern[];
        calculationsEnabled?: boolean = false;
        calculationConfiguration?: CalculationConfiguration;
        allowActionEdit?: boolean = false;
        allowActionAdd?: boolean = false;
        allowActionDelete?: boolean = false;
        width?: number;
        cellTemplate?: boolean = false;
        dateFormatter?: DateFormatter;
        timeFormatter?: TimeFormatter;
        roundOff?: any;
        numberFormat?: boolean = false;
    }
    export class DateFormatter {
        formatter?: string;
        maxDate?: string;
        minDate?: string;
    }
    export class TimeFormatter {
        hourFormat?: boolean
    }

    export enum SortMode {
        Single = 'single',
        Multiple = 'multiple'
    }
    export enum SelectionMode {
        Single = 'single',
        Multiple = 'multiple',
        None = ''
    }
    export enum ColumnDisplay {
        Visible = 'table-cell',
        Hidden = 'none'
    }

    export enum InputMode {
        Togglebutton = 'ToggleButton',
        String = 'String',
        Checkbox = 'Checkbox',
        Button = 'Button',
    }

    export enum DataFormatter {
        //  Default = 'Default',
        Phone = 'Phone'
    }


    export enum BooleanComponentModes {
        String = 'String',
        ToggleButton = 'ToggleButton',
        Checkbox = 'Checkbox',
        Button = 'Buton'
    }

    export class FilterColumn {
        column: Column
        searchFilter: string
    }

    export class EditSetting {
        editEnabled: boolean = false;
        editDebounceTime?: number = 700;
        editMode: GridEditMode = GridEditMode.popup;
    }

    export class xgGridEventLog {
        eventName: string = 'Grid Event logged: ';
        event: any;
        additionalData?: any;
        suppressByDefault?: boolean = false;
    }

    export enum GridEditMode {
        inline = 'inline',
        popup = 'popup'
    }

    export interface Validator {
        name: string;
        validator: any;
        message: string;
    }

    export class ColumnEditSetting {
        label?: string; // All Inputs
        value?: any; // All inputs
        inputType?: InputTypes;
        minLength?: number = 0;
        maxLength?: number = 10;
        options?: string[]; // Used for Select Inputs / Radio Buttons
        collections?: any;
        //collectionsFunction?: () => { }; //  * Future use for passed in func to run against collections object
        type: ControlTypes;
    }

    export enum InputTypes {
        text = 'text',
        email = 'email',
        password = 'password',
        number = 'number',
        tel = 'tel',
        url = 'url',
        range = 'range',
        decimal = 'decimal'
    }

    export enum ControlTypes {
        input = 'input',
        radiobutton = 'radiobutton',
        date = 'date',
        select = 'select',
        checkbox = 'checkbox',
        button = 'button',
        switch = 'switch',
        time = 'time',
        roundOff = 'roundOff'
    }

    export class IconsConfig {
        iconClass: string;
        visible?: boolean;
        disabled?: boolean;

    }
    export class ToolbarActionSettings {
        actionType: string;
        actionConfig: IconsConfig;
    }

    export class ColumnCaclulation {
        iconClass?: string;
        label: string;
        func: Function;
    }

    export class CalculationConfiguration {
        allowUserSelection?: boolean = false;
        defaultCalculations?: ColumnCaclulation[] = [];
    }
    //  @dynamic
    export abstract class CalculationsForNumerics {

        static Average: ColumnCaclulation = {
            iconClass: 'fa fa-times', label: 'Average', func: (data, column) => _.meanBy(data, column.field)
        }

        static Sum: ColumnCaclulation = {
            iconClass: '', label: 'Sum', func: (data, column) => _.sumBy(data, column.field)
        }

        static Count: ColumnCaclulation = {
            iconClass: 'fa fa-hashtag', label: 'Count', func: (data, column) => data.length
        }

        static Max: ColumnCaclulation = {
            iconClass: '', label: 'Max', func: (data, column) => _.maxBy(data, column.field)[column.field]
        }

        static Min: ColumnCaclulation = {
            iconClass: '', label: 'Min', func: (data, column) => _.minBy(data, column.field)[column.field]
        }
    }
    //  @dynamic
    export abstract class CalculationsForDates {

        static MinDate: ColumnCaclulation = {
            iconClass: '', label: 'Min Date', func: (data, column) => _.minBy(data, column.field)[column.field]
        };

        static MaxDate: ColumnCaclulation = {
            iconClass: '', label: 'Max Date', func: (data, column) => _.maxBy(data, column.field)[column.field]
        }
    }
    // export abstract class CalculationsForTimes {

    //     static TwelveFormat: ColumnCaclulation = {
    //         iconClass: '', label: '12 Hour Format', func: (data, column) => _.minBy(data, column.field)[column.field]
    //     };

    //     static TwentyFourFormat: ColumnCaclulation = {
    //         iconClass: '', label: '24 Hour Format', func: (data, column) => _.maxBy(data, column.field)[column.field]
    //     }
    // }
    export namespace ServerSide {
        export class DataPackage {
            constructor() { }
            CurrentPage: number = 0; // Grid Event = first
            Filters: Object[] = [];
            PageCount: number = 5;  // Grid Event = rows
            SelectedRecords: string[] = [] // Should be an array of the uniqueId bound to the grid
            SortData: any[] = [];
            SummaryData: SummaryInformation = new SummaryInformation(); // This is going to need to be populated from the API being called
        }


        class ColumnCalculations {
            constructor() { }
            Sum?: number = undefined;
            Average?: number = undefined;
            Min?: number = undefined;
            Max?: number = undefined;
            MaxDate?: Date = undefined;
            MinDate?: Date = undefined;
        }
        class ColumnInformation {
            constructor() { }
            ColumnName: string = '';
            Calculations: ColumnCalculations = new ColumnCalculations();
        }
        //  * This class is meant to be returned when the grid is in "Server-Side" mode
        class SummaryInformation {
            constructor() { }
            TotalRecordCount: number = 0;
            FilteredRecordCount: number = 0;
            Column: ColumnInformation[] = [new ColumnInformation()];
        }
    }
}