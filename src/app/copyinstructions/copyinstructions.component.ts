import { Component, OnInit } from '@angular/core';
import {
    CopyHeader,
    CopyCreative,
    CopyItemUsageDTO
} from './model/copyinstructions.model';
import { CopyItemService } from './services/CopyItem.service';
import { MessageService } from 'primeng/api';
@Component({
    selector: 'app-copy-instructions',
    templateUrl: './copyinstructions.component.html',
    styleUrls: ['./copyinstructions.component.scss'],
    providers: [CopyItemService, MessageService]
})
export class CopyInstructionsComponent implements OnInit {
    public cards: any[];
    public cardsUsageItems: any[];
    public CopyItemUsageDTOs: CopyItemUsageDTO[] = new Array<
        CopyItemUsageDTO
    >();
    public copyCreativeList: CopyCreative[] = new Array<CopyCreative>();
    public copyHeaderModel: CopyHeader;
    public copyCreativeModel: CopyCreative;
    public copyItemUsage: CopyItemUsageDTO;
    public selectionOptions: any[];
    constructor(
        private copyItemService: CopyItemService,
        private messageService: MessageService
    ) {
        this.cards = [];
        this.cardsUsageItems = [];
        this.copyHeaderModel = new CopyHeader();
        this.copyCreativeModel = new CopyCreative();
        this.copyItemUsage = new CopyItemUsageDTO();
    }

    ngOnInit() {
        this.copyHeaderModel.Advertiser = 'test188';
        this.copyHeaderModel.Title = 'Title';
        this.copyHeaderModel.UnitType = 'Standard';
        this.copyHeaderModel.Length = '00:00:30';
        this.copyHeaderModel.RotationID = 1;
        this.copyHeaderModel.AdvertiserId = 25;
        this.selectionOptions = [
            { key: 'Even', value: '1' },
            { key: 'Sequence', value: '2' },
            { key: 'Percentage', value: '3' }
        ];
        this.cards.push({
            CardSelected: true,
            CopyInstructionId: 1,
            CopyCreativeTitle: 'Sopus/Dakota Panel',
            IsciId: 'T1234325',
            ContentId: 'testing',
            Length: '00:00:00:31',
            StartDate: new Date(),
            EndDate: new Date('6/15/2019'),
            StartTime: '01:23:23',
            EndTime: '23:43:24',
            CopyItemUsageDTO: this.getDays()
        });
    }
    public addCopyCards() {
        // this.cardsUsageItems.push(JSON.parse(JSON.stringify
        //   ({
        //     StartTime: '00:00:00',
        //     EndTime: '23:59:00',
        //     Enabled: true,
        //     Selected: true,
        //     CreatedDate: new Date(),
        //     CreatedBy: 'Admin',
        //     ModifiedDate: new Date(),
        //     ModifiedBy: 'Admin',
        //     DaysOfWeek: 1,
        //   },
        // )))

        let newCard = {
            CardSelected: true,
            CopyInstructionId: 1,
            CopyCreativeTitle: 'Sopus/Dakota Panel--' + this.cards.length,
            IsciId: 'T1234325--' + this.cards.length,
            ContentId: 'testing--' + this.cards.length,
            Length: '00:00:00:31',
            StartDate: new Date(),
            EndDate: new Date(),
            StartTime: '01:23:23',
            EndTime: '23:43:24',
            CopyItemUsageDTO: this.getDays()
        };
        this.cards.push(newCard);
    }

    public getDays() {
        return [
            {
                valid: false,
                text: 'Mon',
                value: 'M',
                usage: this.getflightDateByDay(0)
            },
            {
                valid: false,
                text: 'Tue',
                value: 'T',
                usage: this.getflightDateByDay(1)
            },
            {
                valid: false,
                text: 'Wed',
                value: 'W',
                usage: this.getflightDateByDay(2)
            },
            {
                valid: false,
                text: 'Thu',
                value: 'Th',
                usage: this.getflightDateByDay(3)
            },
            {
                valid: false,
                text: 'Fri',
                value: 'F',
                usage: this.getflightDateByDay(4)
            },
            {
                valid: false,
                text: 'Sau',
                value: 'Sa',
                usage: this.getflightDateByDay(5)
            },
            {
                valid: false,
                text: 'Sun',
                value: 'Su',
                usage: this.getflightDateByDay(6)
            }
        ];
    }
    getflightDateByDay(day: number) {
        let copyItemUsage = new CopyItemUsageDTO();
        copyItemUsage.DaysOfWeek = day;
        copyItemUsage.StartTime = '00:00:00';
        copyItemUsage.EndTime = '23:59:00';
        copyItemUsage.Enabled = true;
        copyItemUsage.Selected = false;
        copyItemUsage.CreatedDate = new Date();
        copyItemUsage.CreatedBy = 'Admin';
        copyItemUsage.ModifiedDate = new Date();
        copyItemUsage.ModifiedBy = 'Admin';
        copyItemUsage.ModifiedBy = 'Admin';

        // this.libraryItemUsageList.push(libraryItemUsage);
        return copyItemUsage;
    }
    submitForm($event) {
        this.CopyItemUsageDTOs.push({
            LibraryItemId: 15,
            StartTime: '00:00:00',
            EndTime: '23:59:00',
            DaysOfWeek: 1,
            Selected: true,
            Enabled: true,
            CreatedDate: new Date(),
            ModifiedDate: new Date(),
            ModifiedBy: 'Admin',
            CreatedBy: 'Admin',
            EnableForSpecificDays: 1
        });
        this.copyCreativeList.push({
            CardSelected: true,
            CopyInstructionId: 1,
            CopyCreativeTitle: 'Sopus/Dakota Panel',
            ADId: 'T1234325',
            ContentId: 'testing',
            Length: '00:00:00:31',
            StartDate: new Date(),
            EndDate: new Date(),
            Enabled: true,
            Selected: true,
            RotationTypeID: 1,
            EstimationNumber: 1,
            StartTime: '01:23:23',
            EndTime: '23:43:24',
            CopyItemUsageDTOs: this.CopyItemUsageDTOs,
            CopyHeader: this.copyHeaderModel
        });

        this.copyItemService
            .SaveCopyInstructionService(this.copyCreativeList)
            .subscribe(
                (res: any[]) => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Copy Instructions',
                        detail: 'Copy Instructions saved successfully',
                        life: 3000
                    });
                    this.copyCreativeList = [];
                },
                err => {}
            );
    }
}
