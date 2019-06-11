import { Component, OnInit } from '@angular/core';
import { ViewCommercialService } from './services/view-commercial.service';
import { xgGridModel } from 'projects/common-component-lib/src/lib/xg-grid/xg-grid.module';
import { Commercial } from 'src/app/ViewCreateCommercial/view-create-commercial/model/commercial.model'
// import { Column } from 'primeng/components/common/shared';

@Component({
    selector: 'app-view-create-commercial',
    templateUrl: './view-create-commercial.component.html',
    styleUrls: ['./view-create-commercial.component.scss'],
    providers: [ViewCommercialService, Commercial]
})
export class ViewCreateCommercialComponent implements OnInit {
    commercialCreativeData: any[] = [{}];
    commercialCreativeGridConfig: xgGridModel.Configuration;
    constructor(
        private viewCommercialService: ViewCommercialService,
        private CommercialModel: Commercial,

    ) {
        this.commercialCreativeGridConfig = {
            uniqueIdName: 'id',
            columns: [],
            editSettings: {
                editEnabled: true,
                editMode: xgGridModel.GridEditMode.popup
            }
        };
    }
    ngOnInit() {
        this.commercialCreativeGridConfiguration();
        this.getCommercial(this.CommercialModel);
    }
    public commercialCreativeGridConfiguration() {
        this.commercialCreativeGridConfig.columns = [
            // {
            //     header: 'ID',
            //     field: 'id',
            //     dataType: 'string',
            //     ordinal: 0,
            //     display:xgGridModel.ColumnDisplay.Hidden
            // },
            {
                header: 'Type',
                field: 'libraryItemSource',
                dataType: 'string',
                ordinal: 0
            },
            {
                header: 'Advertiser',
                field: 'advertiser',
                dataType: 'string',
                ordinal: 1
            },
            {
                header: 'Title',
                field: 'title',
                dataType: 'string',
                ordinal: 2,
                width: 100
            },
            {
                header: 'ISCI_Ad ID',
                field: 'isciAdId',
                dataType: 'string',
                ordinal: 3
            },
            {
                header: 'Ordered Length',
                field: 'orderedLength',
                dataType: 'string',
                ordinal: 4
            },
            {
                header: 'Content Duration',
                field: 'contentDuration',
                dataType: 'string',
                ordinal: 5,
                width: 400,
            },
            {
                header: 'Content ID',
                field: 'contentId',
                dataType: 'string',
                ordinal: 6
            },
            {
                header: 'Additional ID',
                field: 'externalId',
                dataType: 'string',
                ordinal: 7
            },
            {
                header: 'Start Date',
                field: 'startDate',
                dataType: 'date',
                ordinal: 8
            },
            {
                header: 'End Date',
                field: 'endDate',
                dataType: 'date',
                ordinal: 9
            },
            {
                header: 'Expiration Date',
                field: 'expirationDate',
                dataType: 'date',
                ordinal: 10
            },
            {
                header: 'Days',
                field: 'days',
                dataType: 'string',
                ordinal: 11
            }
        ]
    }
    public getCommercial(model: Commercial) {
        this.CommercialModel.CreativeId = 0;
        this.CommercialModel.libraryType = "";
        this.CommercialModel.Advertiser = "";
        this.CommercialModel.Title = "";
        this.CommercialModel.IsciAdId = "";
        this.CommercialModel.ContentId = "";
        this.CommercialModel.ExternalId = "";
        this.CommercialModel.StartDate = new Date();
        this.CommercialModel.EndDate = new Date();
        this.CommercialModel.ExpirationDate = new Date();

        this.viewCommercialService.getCommercials(model).subscribe((res: any[]) => {
            this.commercialCreativeData = res;
        }, err => {
        });
    }
}
