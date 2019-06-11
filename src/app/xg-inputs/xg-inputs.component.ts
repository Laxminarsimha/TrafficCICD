import { Component, OnInit } from '@angular/core';
import { xgGridModel } from '../../../projects/common-component-lib/src/lib/xg-grid/domain/grid-columns';
import { xgControlPattern } from '../../../projects/common-component-lib/src/lib/xg-grid/sub-components/dynamic-form/regex-lib';
import mockData from '../../../projects/common-component-lib/src/lib/xg-grid/domain/mockData.json';

@Component({
  selector: 'app-xg-inputs',
  templateUrl: './xg-inputs.component.html',
  styleUrls: ['./xg-inputs.component.css']
})
export class XgInputsComponent implements OnInit {
  firstName: string;
  lastName: string;
  list: any[];
  gridConfig: object;
  data: object;
  gender: string;
  phoneNumber: number;
  password: string;
  email: string;
  marketsArray: any = [];
  market: string = "";
  labelVal: string = "label";
  keyVal: string = "value";
  testDropdown: object = [
    { "label": "ALBANY, GA", "value": "ALBANYGA" }]
  advertise: any = {
    "AdvertiserKey": 0,
    "AdvertiserName": null,
    "Source_Item_ID": 39328,
    "Org_ID": 39328,
    "Org_Name": "!!!!SWEEPS EXTRA PROMOTIONS!!!!",
    "Id": 39328,
    "text": "!!!!SWEEPS EXTRA PROMOTIONS!!!!"
  }
  countries: any = ["india", "australia", "nepal"];
  country = "australia";
  display: boolean = false;
  //   columns: any = [
  //     { field: 'AccountExecutiveId', header: 'Id', display: 'table-cell', dataType: 'number', ordinal: 0 },
  //     { field: 'FirstName', header: 'First Name', display: 'table-cell', dataType: 'string', ordinal: 1, canEdit: true },
  //     { field: 'LastName', header: 'Last Name', display: 'table-cell', dataType: 'string', ordinal: 2 },
  //     { field: 'CreatedDate', header: 'Created Date', display: 'none', dataType: 'date', ordinal: 3 },
  //     { field: 'Phone', header: 'Phone', display: 'none', dataType: 'number', ordinal: 4 },
  //     { field: 'PhoneExt', header: 'Phone Extention', display: 'none', dataType: 'number', ordinal: 5 },
  //     { field: 'DefaultSalesOffice', header: 'Default Sales Office', display: 'table-cell', dataType: 'string', ordinal: 6 }
  // ]
  // columnsData: any = [
  //     {
  //         AccountExecutiveId: "01",
  //         FirstName: "ORO",
  //         LastName: "Tech Services",
  //         CreatedDate: "6-Jan-2018",
  //         Phone: "12345",
  //         PhoneExt: "6789",
  //         DefaultSalesOffice: "NA"
  //     },
  //     {
  //         AccountExecutiveId: "02",
  //         FirstName: "ORO",
  //         LastName: "Tech Services",
  //         CreatedDate: "6-Jan-2018",
  //         Phone: "12345",
  //         PhoneExt: "6789",
  //         DefaultSalesOffice: "NA"
  //     }
  // ]
  testTimepicker: string = "12:53 PM"
  columns: any = [
    { field: 'text', label: 'Advertiser Name', key: true, searchOn: true },
    { field: 'Org_ID', label: 'Advertiser ID', key: true, searchOn: true },
  ]
  columnsData = [
    {
      "AdvertiserKey": 0,
      "AdvertiserName": null,
      "Source_Item_ID": 39328,
      "Org_ID": 39328,
      "Org_Name": "!!!!SWEEPS EXTRA PROMOTIONS!!!!",
      "Id": 39328,
      "text": "!!!!SWEEPS EXTRA PROMOTIONS!!!!"
    },
    {
      "AdvertiserKey": 0,
      "AdvertiserName": null,
      "Source_Item_ID": 25475,
      "Org_ID": 25475,
      "Org_Name": "*EBFF Sales Promotion",
      "Id": 25475,
      "text": "*EBFF Sales Promotion"
    },
    {
      "AdvertiserKey": 0,
      "AdvertiserName": null,
      "Source_Item_ID": 80541,
      "Org_ID": 80541,
      "Org_Name": "*EBUI Promotions 25475",
      "Id": 80541,
      "text": "*EBUI Promotions 25475"
    },
    {
      "AdvertiserKey": 0,
      "AdvertiserName": null,
      "Source_Item_ID": 80542,
      "Org_ID": 80542,
      "Org_Name": "*EBUI Sales Promotions",
      "Id": 80542,
      "text": "*EBUI Sales Promotions"
    },
    {
      "AdvertiserKey": 0,
      "AdvertiserName": null,
      "Source_Item_ID": 68789,
      "Org_ID": 68789,
      "Org_Name": "*ERGB Sales Promotion",
      "Id": 68789,
      "text": "*ERGB Sales Promotion"
    },
    {
      "AdvertiserKey": 0,
      "AdvertiserName": null,
      "Source_Item_ID": 99997,
      "Org_ID": 99997,
      "Org_Name": "*FJAR Sales Promotion",
      "Id": 99997,
      "text": "*FJAR Sales Promotion"
    },
    {
      "AdvertiserKey": 0,
      "AdvertiserName": null,
      "Source_Item_ID": 100728,
      "Org_ID": 100728,
      "Org_Name": "*GBFF Sales Promotion",
      "Id": 100728,
      "text": "*GBFF Sales Promotion"
    },
    {
      "AdvertiserKey": 0,
      "AdvertiserName": null,
      "Source_Item_ID": 98723,
      "Org_ID": 98723,
      "Org_Name": "*GCIV Sales Promotion",
      "Id": 98723,
      "text": "*GCIV Sales Promotion"
    },
    {
      "AdvertiserKey": 0,
      "AdvertiserName": null,
      "Source_Item_ID": 106754,
      "Org_ID": 106754,
      "Org_Name": "*GFLI Promotions",
      "Id": 106754,
      "text": "*GFLI Promotions"
    },
    {
      "AdvertiserKey": 0,
      "AdvertiserName": null,
      "Source_Item_ID": 121862,
      "Org_ID": 121862,
      "Org_Name": "*GFLI Sales Promotion",
      "Id": 121862,
      "text": "*GFLI Sales Promotion"
    },
    {
      "AdvertiserKey": 0,
      "AdvertiserName": null,
      "Source_Item_ID": 3047,
      "Org_ID": 3047,
      "Org_Name": "*KBSI Promotion",
      "Id": 3047,
      "text": "*KBSI Promotion"
    },
    {
      "AdvertiserKey": 0,
      "AdvertiserName": null,
      "Source_Item_ID": 9363,
      "Org_ID": 9363,
      "Org_Name": "*KBSI Sales Promotion",
      "Id": 9363,
      "text": "*KBSI Sales Promotion"
    },
    {
      "AdvertiserKey": 0,
      "AdvertiserName": null,
      "Source_Item_ID": 78485,
      "Org_ID": 78485,
      "Org_Name": "*KBTV Sales Promotion",
      "Id": 78485,
      "text": "*KBTV Sales Promotion"
    },
    {
      "AdvertiserKey": 0,
      "AdvertiserName": null,
      "Source_Item_ID": 122106,
      "Org_ID": 122106,
      "Org_Name": "*KBVU Sales Promotion",
      "Id": 122106,
      "text": "*KBVU Sales Promotion"
    },
    {
      "AdvertiserKey": 0,
      "AdvertiserName": null,
      "Source_Item_ID": 122111,
      "Org_ID": 122111,
      "Org_Name": "*KCVU Sales Promotion",
      "Id": 122111,
      "text": "*KCVU Sales Promotion"
    }

  ]

  constructor() { }

  ngOnInit() {
    this.list = [{
      "description": "List1",
      "title": "List Title"
    }, {
      "description": "List2",
      "title": "List Title2"
    }, {
      "description": "List1",
      "title": "List Title"
    }, {
      "description": "List2",
      "title": "List Title2"
    }, {
      "description": "List1",
      "title": "List Title"
    }, {
      "description": "List2",
      "title": "List Title2"
    }, {
      "description": "List1",
      "title": "List Title"
    }, {
      "description": "List2",
      "title": "List Title2"
    }, {
      "description": "List1",
      "title": "List Title"
    }, {
      "description": "List2",
      "title": "List Title2"
    }, {
      "description": "List1",
      "title": "List Title"
    }, {
      "description": "List2",
      "title": "List Title2"
    }, {
      "description": "List1",
      "title": "List Title"
    }, {
      "description": "List2",
      "title": "List Title2"
    }, {
      "description": "List1",
      "title": "List Title"
    }, {
      "description": "List2",
      "title": "List Title2"
    }, {
      "description": "List1",
      "title": "List Title"
    }, {
      "description": "List2",
      "title": "List Title2"
    }, {
      "description": "List1",
      "title": "List Title"
    }, {
      "description": "List2",
      "title": "List Title2"
    }, {
      "description": "List1",
      "title": "List Title"
    }, {
      "description": "List2",
      "title": "List Title2"
    }, {
      "description": "List1",
      "title": "List Title"
    }, {
      "description": "List2",
      "title": "List Title2"
    }]

    // this.marketsArray = ["ABILENE-SWEETWATER","ALBANY, GA","ALBANY-SCHENECTADY-TROY","ALBUQUERQUE-SANTA FE","ALEXANDRIA, LA","ALPENA","AMARILLO","ANCHORAGE","ATLANTA","ATLANTA - LPM PREVIEW","AUGUSTA-AIKEN","AUSTIN","BAKERSFIELD","BALTIMORE","BANGOR","BATON ROUGE","BEAUMONT-PORT ARTHUR","BEND, OR"];
    this.marketsArray = [
      // { "productId": 10000007, "productDescription": null, "productCode": 0, "productName": "FURNITURE (ns)", "modifiedDate": "2019-03-16T15:39:53.33", "deleted": false },
      { "label": "ALBANY, GA", "value": "ALBANYGA" }

    ]

    const gridConfig: xgGridModel.Configuration = {
      uniqueIdName: 'LastName',
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
          ordinal: 4,
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
          field: 'TimeData',
          header: 'Time',
          display: xgGridModel.ColumnDisplay.Visible,
          dataType: 'time',
          ordinal: 4,
          canEdit: true,
          editSettings: {
            type: xgGridModel.ControlTypes.time
          },
          controlPatterns: [xgControlPattern.Required],
          timeFormatter: {
            hourFormat: false
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
            interactionMode: xgGridModel.BooleanComponentModes.ToggleButton,
            readonlyMode: xgGridModel.BooleanComponentModes.ToggleButton,
            deounceTime: 100
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
          calculationsEnabled: true
        }
      ],
      editSettings:
      {
        editEnabled: true,
        editMode: xgGridModel.GridEditMode.popup,
        editDebounceTime: 2000
      }
    }
    this.gridConfig = gridConfig
    this.data = mockData

  }
  testUnselectValue(e) {
    console.log(e, "log")
  }
  testButton(e) {
    console.log(e, "button")
  }
  showTestDialog() {
    this.display = true;
  }
  onGridDataChange($event) {
    console.log("!!!!!!!!!!$event", $event)
  }
}
