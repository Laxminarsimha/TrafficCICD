import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MultiSelectModule } from 'primeng/multiselect';

import {
  MatCardModule,
  MatDividerModule,
  MatGridListModule,
  MatExpansionModule,
  MatTabsModule,
  MatSlideToggleModule,
  MatListModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatButtonModule,
  MatSnackBarModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatRadioModule,
  MatButtonToggleModule
} from '@angular/material';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material'
import { DragDropModule } from 'primeng/dragdrop';

import { XgGridColumnPickerComponent } from './sub-components/xg-grid-column-picker/xg-grid-column-picker.component'
import { XgGridSectionCaptionComponent } from './sub-components/xg-grid-section-caption/xg-grid-section-caption.component';
import { XgGridActionsComponent } from './sub-components/xg-grid-actions/xg-grid-actions.component';
import { XgGridColumnFilterComponent } from './sub-components/xg-grid-column-filter/xg-grid-column-filter.component';
// import { UtilitiesService } from '../../../../../shared/services/utilities.service';


// import { SharedComponentsModule } from '../../../../../shared/components/shared-components.module';
import { SearchTextHighlighterComponent } from './sub-components/search-text-highlighter/search-text-highlighter.component';
import { PhoneFormatterPipe } from './pipes/phone-formatter.pipe';
import { XgGridToolbarComponent } from './sub-components/xg-grid-toolbar/xg-grid-toolbar.component';
import { XgGridColumnHeaderComponent } from './sub-components/xg-grid-column-header/xg-grid-column-header.component';
import { XgGridColumnCalculationsComponent } from './sub-components/xg-grid-column-calculations/xg-grid-column-calculations.component';
import { XgGridColumnEditorComponent } from './sub-components/xg-grid-column-editor/xg-grid-column-editor.component';
import { XgGridDataCellComponent } from './sub-components/xg-grid-data-cell/xg-grid-data-cell.component';
import { XgGridDataEditorDialogComponent } from './sub-components/xg-grid-data-editor-dialog/xg-grid-data-editor-dialog.component';

import { InputComponent } from "./sub-components/dynamic-form/input/input.component";
import { ButtonComponent } from "./sub-components/dynamic-form//button/button.component";
import { SelectComponent } from "./sub-components/dynamic-form/select/select.component";
import { DateComponent } from "./sub-components//dynamic-form/date/date.component";
import { RadiobuttonComponent } from "./sub-components/dynamic-form/radiobutton/radiobutton.component";
import { CheckboxComponent } from "./sub-components/dynamic-form/checkbox/checkbox.component";
import { DynamicFieldDirective } from "./sub-components/dynamic-form/dynamic-field/dynamic-field.directive";
import { DynamicFormComponent } from "./sub-components/dynamic-form/dynamic-form/dynamic-form.component";
import { XgGridComponent } from './xg-grid.component';

import { SortablejsModule } from 'angular-sortablejs';
import { NgxMaskModule } from 'ngx-mask';
import { XgGridDataExportComponent } from './sub-components/xg-grid-data-export/xg-grid-data-export.component';
import { ExportExcelService } from './services/export-excel.service';
import { SaveDataService } from './services/save-data.service';
import { xgAPIService } from './services/api-base';
import { HttpClientModule } from "@angular/common/http";
import { BooleanComponent } from './sub-components/helper components/boolean-component/boolean-component.component';
import { TimeComponent } from './sub-components/dynamic-form/time/time.component';
import { XgTimePickerModule } from '../xg-time-picker/xg-time-picker.component';
import { XgDatePickerComponentModule } from '../xg-date-picker/xg-date-picker.component';
import { XgInputComponentModule } from '../xg-input/xg-input.component';

export { xgGridModel } from './domain/grid-columns';
export { Validator, ValidatorFn, Validators } from '@angular/forms';

// directives 
import { xgCustomCellTemplateDirective } from './sub-components/dynamic-form/dynamic-field/custom-cell-template.directive'
import { DecimalComponent } from './sub-components/dynamic-form/decimal-rounded/decimal-rounded';
import { TwoDigitDecimaNumberDirective } from './directive/round.directive';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    CheckboxModule,
    ToggleButtonModule,
    InputTextModule,
    DialogModule,
    DropdownModule,
    CalendarModule,
    MatCardModule,
    MatDividerModule,
    MatGridListModule,
    MatExpansionModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatListModule,
    MatIconModule,
    DragDropModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonModule,
    MatSnackBarModule,
    OverlayPanelModule,
    XgTimePickerModule,
    XgInputComponentModule,
    XgDatePickerComponentModule,
    MultiSelectModule,
    SortablejsModule.forRoot({ animation: 300 }),
    MatTooltipModule,
    MatRadioModule,
    MatButtonToggleModule,
    XgTimePickerModule,
    XgDatePickerComponentModule,
    NgxMaskModule.forRoot({

    }),
  ],
  declarations: [
    XgGridColumnPickerComponent,
    XgGridSectionCaptionComponent,
    XgGridActionsComponent,
    XgGridColumnFilterComponent,
    XgGridToolbarComponent,
    XgGridColumnHeaderComponent,
    XgGridColumnCalculationsComponent,
    XgGridColumnEditorComponent,
    XgGridDataCellComponent,
    SearchTextHighlighterComponent,
    XgGridDataEditorDialogComponent,
    InputComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    DynamicFieldDirective,
    xgCustomCellTemplateDirective,
    DynamicFormComponent,
    PhoneFormatterPipe,
    XgGridComponent,
    XgGridDataExportComponent,
    BooleanComponent,
    TimeComponent, DecimalComponent, TwoDigitDecimaNumberDirective
  ],
  entryComponents: [
    XgGridDataEditorDialogComponent,
    InputComponent,
    XgGridDataExportComponent,
    ButtonComponent,
    SelectComponent,
    DateComponent,
    RadiobuttonComponent,
    CheckboxComponent,
    DynamicFormComponent,
    TimeComponent, DecimalComponent

  ],
  exports:
    [
      CommonModule,
      TableModule,
      SortablejsModule,
      XgTimePickerModule,
      CheckboxModule,
      ToggleButtonModule,
      XgGridComponent,
      InputTextModule,
      DialogModule,
      DropdownModule,
      CalendarModule,
      MatCardModule,
      MatDividerModule,
      MatGridListModule,
      MatExpansionModule,
      MatTabsModule,
      MatSlideToggleModule,
      MatListModule,
      xgCustomCellTemplateDirective,
      MatIconModule,
      DragDropModule,
      MatCheckboxModule,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatDialogModule,
      MatButtonModule,
      MatSnackBarModule,
      MatTooltipModule,
      MatRadioModule,
      MatButtonToggleModule,
      OverlayPanelModule,
      MultiSelectModule,
      XgGridColumnPickerComponent,
      XgGridSectionCaptionComponent,
      XgGridActionsComponent,
      XgGridColumnFilterComponent,
      XgGridToolbarComponent,
      XgGridColumnHeaderComponent,
      XgGridColumnCalculationsComponent,
      XgGridColumnEditorComponent,
      XgGridDataCellComponent,
      SearchTextHighlighterComponent,
      XgGridDataEditorDialogComponent,
      BooleanComponent,
      XgTimePickerModule,
      XgDatePickerComponentModule,
      XgInputComponentModule,
      HttpClientModule,
      XgTimePickerModule,
      XgDatePickerComponentModule,
      TwoDigitDecimaNumberDirective
    ],
  providers: [
    { provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: { data: [] } },
    ExportExcelService, // Add any data you wish to test if it is passed/used correctly },
    xgAPIService,
    SaveDataService
  ]
})
export class XgGridModule { }
