import { Component, OnInit } from '@angular/core';
import { ServiceService } from './services/service.service';
import {
    ServiceRequestEntity,
    Service,
    AddressType,
    Address,
    ServiceRatingSource,
    ServiceType
} from './model/service.model';

import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { CommonServiceUtills } from './utils/commonServiceUtils';
import { timeout } from 'rxjs/operators';
import { isDate } from 'util';

@Component({
    selector: 'app-service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.scss'],
    providers: [ServiceService, MessageService]
})
export class ServiceComponent implements OnInit {
    public nestedForm: FormGroup;
    public serviceTypeList: ServiceType[];
    public serviceName: String;
    public todayDate: Date = new Date();
    public serviceActivationDate: Date = new Date();
    public goLiveDate: Date = new Date();
    public MailingIndex: number = 2;
    public BillingIndex: number = 3;
    public PhysicalIndex: number = 1;
    public toggle: boolean = false;
    public serviceTypeId: number;
    public ratingData;
    public sourceList = [
        { key: 1, value: 'Nielsen' },
        { key: 2, value: 'Comscore' }
    ];
    marketList = [
        {
            key: '1',

            value: 'Pittsburg'
        },

        {
            key: '2',

            value: 'Cincinnati'
        }
    ];
    callLettersTags = [
        {
            key: '1',

            value: 'WQED'
        },

        {
            key: '2',

            value: 'WINP'
        },

        {
            key: '3',

            value: 'WTAE'
        },

        {
            key: '4',

            value: 'KDKA'
        },

        {
            key: '5',

            value: 'LOGO'
        },

        {
            key: '6',

            value: 'HDAM'
        }
    ];

    constructor(
        private dataService: ServiceService,
        private messageService?: MessageService,
        private serviceConst?: CommonServiceUtills
    ) {}

    ngOnInit() {
        this.nestedForm = new FormGroup({
            ServiceType: new FormControl(''),
            ServiceName: new FormControl(''),
            ServiceActivationDate: new FormControl(''),
            serevcieGoLiveDate: new FormControl(''),
            Address: new FormControl('')
        });

        this.dataService.getServiceType().subscribe(
            (res: any) => {
                this.serviceTypeList = res;
            },
            err => {
                this.messageService.add({
                    key: 'serviceErrMsg',
                    severity: 'error',
                    summary: this.serviceConst.serviceComponent,
                    detail: this.serviceConst.serviceTypeError
                });
            }
        );
    }

    public validateDate(dateType: string) {
        if (!!this.serviceActivationDate && !!this.goLiveDate) {
            const serviceActionvationDateFormated = new Date(
                this.serviceActivationDate
            ).setHours(0, 0, 0, 0);
            const goLiveDateFormated = new Date(this.goLiveDate).setHours(
                0,
                0,
                0,
                0
            );
            const todaysDate = new Date().setHours(0, 0, 0, 0);
            if (this.serviceActivationDate instanceof Date && this.goLiveDate instanceof Date) {
                if (serviceActionvationDateFormated < todaysDate || goLiveDateFormated < todaysDate) {
                    this.messageService.add({
                        key: 'serviceErrMsg',
                        severity: 'error',
                        summary: this.serviceConst.serviceComponent,
                        detail:
                            dateType +
                            this.serviceConst.pastDateValidation
                    });
                return true;
                } else if (serviceActionvationDateFormated > goLiveDateFormated) {
                    this.messageService.add({
                        key: 'serviceErrMsg',
                        severity: 'error',
                        summary: this.serviceConst.serviceComponent,
                        detail: this.serviceConst.dateValidation
                    });
                return true;
                }
            } else {
                return true;
            }
        }
        return false;
    }

    public ratingValueChange(e) {
        this.ratingData = e;
    }
    public submitForm(form: any) {
        let requiredFieldName: string;
        let prevRatingSourceName: string;
        if (!form.ServiceType) {
            requiredFieldName = 'Service Type';
        } else if (!form.ServiceName) {
            requiredFieldName = 'Service Name';
        } else if (!form.ServiceType) {
            requiredFieldName = 'Service Type';
        } else if (!form.ServiceActivationDate) {
            requiredFieldName = 'Activation Date';
        } else if (!form.serevcieGoLiveDate) {
            requiredFieldName = 'Go Live Date';
        } else if (this.validateDate('')) {
            return;
        } else if (this.ratingData) {
            this.ratingData.forEach(rating => {
                if (rating.ratingSource) {
                    if (prevRatingSourceName === rating.Source) {
                        requiredFieldName = 'Unique rating source required';
                    }
                }
                prevRatingSourceName = rating.Source;
                if (rating.Source) {
                    if (!rating.Market) {
                        requiredFieldName = 'Market Source';
                    } else if (!rating.callLetters) {
                        requiredFieldName = 'Call Laters';
                    }
                }
            });
        }

        if (requiredFieldName) {
            this.messageService.add({
                key: 'serviceErrMsg',
                severity: 'error',
                summary: this.serviceConst.serviceComponent,
                detail: requiredFieldName + ' is required!'
            });
            return;
        }

        const serviceEntityData = this.createServiceEntity(form);

        this.dataService.saveService(serviceEntityData).subscribe(
            res => {
                this.messageService.add({
                    key: 'serviceMsg',
                    severity: 'success',
                    summary: this.serviceConst.serviceComponent,
                    detail: this.serviceConst.saveSuccessful
                });
            },
            err => {
                this.messageService.add({
                    key: err.status === 200 ? 'serviceMsg' : 'serviceErrMsg',
                    severity: err.status === 200 ? 'success' : 'error',
                    summary: this.serviceConst.serviceComponent,
                    detail: err.status === 200 ? err.error.text : err.error
                });
            }
        );
    }

    public createServiceEntity(form) {
        const serviceRequestEntity = new ServiceRequestEntity();
        const addressArray: Address[] = [];
        const ratingArray: ServiceRatingSource[] = [];
        if (form.Address) {
            form.Address.addressItems.forEach(address => {
                let addressForm = new Address();
                addressForm.SuiteNo = address.suiteNumber;
                addressForm.Street = address.streetAddress;
                addressForm.City = address.city;
                addressForm.State = address.stateProvince;
                addressForm.Country = address.country;
                addressForm.PostalCode = address.zip;
                addressForm.addressTypeList = [];
                if (
                    address.addressTypeDropdown !== '' &&
                    address.addressTypeDropdown !== null
                ) {
                    address.addressTypeDropdown.forEach(addressTypes => {
                        let addressType = new AddressType();
                        if (addressTypes.value === 'Mailing') {
                            addressType.AddressTypeId = this.MailingIndex;
                            addressType.AddressTypeName = 'Mailing';
                            addressForm.addressTypeList.push(addressType);
                        }
                        if (addressTypes.value === 'Billing') {
                            addressType.AddressTypeId = this.BillingIndex;
                            addressType.AddressTypeName = 'Billing';
                            addressForm.addressTypeList.push(addressType);
                        }
                        if (addressTypes.value === 'Physical') {
                            addressType.AddressTypeId = this.PhysicalIndex;
                            addressType.AddressTypeName = 'Physical';
                            addressForm.addressTypeList.push(addressType);
                        }
                    });
                    addressArray.push(addressForm);
                }
            });
        }

        serviceRequestEntity.addressDTOList = addressArray;
        if (this.ratingData) {
            this.ratingData.forEach(rating => {
                if (rating.Source) {
                    let rattingForm = new ServiceRatingSource();
                    rattingForm.RatingSourceTypeId = this.sourceList.find(
                        source => source.value === rating.Source
                    )['key'];

                    if (rating.ratingsMarket) {
                        const selectedMarketID = this.marketList.find(
                            source => source.value === rating.Market
                        )['key'];
                        rattingForm.MarketSourceId = parseInt(selectedMarketID);
                    }
                    if (rating.callLetters) {
                        const selectedChannelId = this.callLettersTags.find(
                            source => source.value === rating.callLetters
                        )['key'];
                        rattingForm.StationId = parseInt(selectedChannelId);
                    }
                    ratingArray.push(rattingForm);
                }
            });
        }

        serviceRequestEntity.serviceRatingSourcesDTOList = ratingArray;
        const service = new Service();
        service.ActivationDate = new Date(form.ServiceActivationDate);
        service.GoLiveDate = new Date(form.serevcieGoLiveDate);
        service.Name = form.ServiceName;
        service.ServiceTypeId = form.ServiceType;
        serviceRequestEntity.serviceDTO = service;
        return serviceRequestEntity;
    }

    public CancelService() {
        this.nestedForm.reset();
        window.location.reload();
    }

    public onToastDone(e) {
        this.CancelService();
    }
}
