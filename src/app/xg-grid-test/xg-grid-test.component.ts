import { Component, OnInit } from '@angular/core';
import { xgGridModel } from 'projects/common-component-lib/src/lib/xg-grid/xg-grid.module';
import { xgControlPattern } from 'projects/common-component-lib/src/lib/xg-grid/sub-components/dynamic-form/regex-lib';

@Component({
  selector: 'app-xg-grid-test',
  templateUrl: './xg-grid-test.component.html',
  styleUrls: ['./xg-grid-test.component.scss']
})
export class XgGridTestComponent implements OnInit {

  gvProgramConfig: xgGridModel.Configuration;
  gvProgramData: any[] = [{}];
  gvfilterData: any[] = [{}];
  constructor() { 
    this.gvProgramConfig = {
      uniqueIdName: 'ProgramId',
      columns: [],
      editSettings: {
          editEnabled: true,
          editMode: xgGridModel.GridEditMode.popup
      }
  };
  }

  ngOnInit() {

    this.gridConfiguration();

  }
  onGridDataChange(){

  }

  gridConfiguration() {
    this.gvProgramConfig.columns = [
        {
            header: 'Program Id',
            field: 'ProgramId',
            dataType: 'string',
            ordinal: 0
        },
        {
            header: 'External Id',
            field: 'TranslationId',
            dataType: 'string',
            ordinal: 1
        },         
    ]
  }
}
