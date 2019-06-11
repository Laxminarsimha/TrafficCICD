import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { OrderService } from './services/order.service';
import {
    Customer,
    Agency,
    Order,
    OrderAgency,
    OrderHeader,
    OrderInformation
} from './model/order.model';
import {
    FormGroup
} from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { OrderUtilsService } from './utils/orderutils';
import { ContactInformation } from 'src/app/Order/Order/model/order.model';
@Component({
    selector: 'app-Order',
    templateUrl: './order.component.html',
    styleUrls: ['./order.component.scss'],
    providers: [
        OrderService,
        MessageService,
        OrderUtilsService,
        Customer,
        Agency,
        Order,
        ContactInformation,
        OrderAgency,
        OrderHeader
    ]
})
export class OrderComponent implements OnInit {
    public nestedForm: FormGroup;
    public advertiserList: Customer[];
    public agencyList: Agency[];
    public showCommissionDiv: boolean = true;
    public lcRequired: boolean;
    public dcRequired: boolean;
    public contactList: ContactInformation[];
    public agencycontactList: ContactInformation[];
    public phoneNumber: any[];
    public contactInfo: any[];
    public advertiserTypeId: number = 1;
    public agencyTypeId: number = 2;
    public advertiserTypeValue: string;
    public agencyTypeValue: string;
    //public orderHeaderId: number = 100056;
    public locationId: number;
    customerId: any;
    public orderInfo: OrderInformation;
    public orderHeaderDetails: OrderInformation[];
    public orderHeaderinfo: OrderHeader[];
    constructor(
        private orderService: OrderService,
        private orderHeader: OrderHeader,
        private orderAgency: OrderAgency,
        private orderModel: Order,
        private contactInfoModel: ContactInformation,
        private messageService: MessageService
    ) {

        this.orderHeader.orderId = 0;
        this.orderHeader.createdBy = "Admin, " + new Date().toLocaleString();
        this.orderHeader.modifiedBy = "Admin, " + new Date().toLocaleString();
        this.orderHeader.revision = 0;
    }

    ngOnInit() {
        this.orderAgency.digitalCommissionPercent = 0;
        this.orderAgency.linearCommissionPercent = 0;
        this.getOrderHeaderId();
        this.getAdvertiserList();
        this.getAgenciesList();
        this.getContactList();
    }
    getOrderHeaderId() {
        debugger
        this.orderService.getOrderMaxId().subscribe((res: any[]) => {
            var result = res["Result"];
            this.orderHeader.orderId = result;
        });
    }
    getAdvertiserList() {
        this.orderService.getAllAdvertisers(this.advertiserTypeId).subscribe((res: any[]) => {
            this.advertiserList = res;
        });
    }

    getAgenciesList() {
        this.orderService.getAllAgencies(this.agencyTypeId).subscribe((res: any[]) => {
            this.agencyList = res;
        });
    }

    getContactList() {
        this.orderService.getAllContacts().subscribe((res: any[]) => {
            this.contactList = res;
            this.contactList.forEach(
                c =>
                    (c.firstName =
                        c.firstName + ' ' + c.middleName + ' ' + c.lastName)
            );
        });
    }

    onContactChange(contactid) {
        if (contactid) {
            this.orderAgency.agencyContactId = contactid;
            this.orderModel.advertiserContactId = contactid;
            this.contactList.forEach(contact => {
                if (contact.contactId === contactid) {
                    this.contactInfoModel.name = contact.firstName;
                    this.contactInfoModel.emailAddress = contact.emailAddress;
                    if (contact.phoneNumbers) {
                        contact.phoneNumbers.forEach(phone => {
                            if (
                                phone.contactId === contactid &&
                                phone.isPrimary === true
                            ) {
                                this.contactInfoModel.phoneNumber =
                                    phone.phoneNumber;
                            }
                        });
                    }
                }
            });
        }
    }
    onAdvertiserChange(args: any) {
        if (args.customerName) {
            this.orderModel.orderTitle = args.customerName;
            this.orderModel.advertiserCustomerId = args.customerId;
            //this.advertiserTypeValue = args.customerName;
        }
        else {
            //this.advertiserTypeValue = args;
        }
    }

    onadvertiserModelChange($event) {
        this.advertiserTypeValue = $event;
    }
    advertiserInputValue($event) {
        if (this.advertiserTypeValue) {

            if (this.advertiserList.length > 0) {
                const advertiserResult = this.advertiserList.filter(c => c.customerName === this.advertiserTypeValue);
                if (advertiserResult.length == 0) {
                }
                if (this.advertiserTypeValue) {
                    // this.orderModel.advertiserCustomerName = '';
                }
            }
        }
    }

    onAgencyChange(args: any) {
        if (args.customerId) {
            this.orderAgency.agencyCustomerId = args.customerId;
            this.lcRequired = true;
            this.dcRequired = true;
        } else {
            this.lcRequired = false;
            this.dcRequired = false;
        }
    }
    CancelOrder(form) {
        form.reset();
    }
    submitForm(form) {
        if (form.valid) {
            let orderInfo = new OrderInformation();
            //orderHeader
            orderInfo.createDate = new Date();
            orderInfo.createdBy = "Admin";
            orderInfo.modifiedBy = "Admin";
            orderInfo.modifiedDate = new Date();
            orderInfo.revision = this.orderHeader.revision;
            //orderAdvertiser
            orderInfo.advertiserCustomerName = this.orderModel.advertiserCustomerName;
            orderInfo.advertiserCustomerId = this.orderModel.advertiserCustomerId;
            orderInfo.orderTitle = this.orderModel.orderTitle;
            orderInfo.advertiserContactId = this.orderModel.advertiserContactId;
            orderInfo.purchaseOrder = this.orderModel.purchaseOrder;
            orderInfo.duns = this.orderModel.duns;
            //OrderAgency
            orderInfo.agencyCustomerId = this.orderAgency.agencyCustomerId;
            orderInfo.agencyName = this.orderAgency.agencyName;
            orderInfo.agencyContactId = this.orderAgency.agencyContactId;
            orderInfo.linearCommissionPercent = this.orderAgency.linearCommissionPercent;
            orderInfo.digitalCommissionPercent = this.orderAgency.digitalCommissionPercent;
            orderInfo.clientCode = this.orderAgency.clientCode;
            orderInfo.productCode = this.orderAgency.productCode;
            orderInfo.estimateNumber = this.orderAgency.estimateNumber;
            this.orderService.getAddOrder(orderInfo).subscribe((res: any[]) => {
                this.getOrderHeaderId();
                setTimeout(() => {
                    this.showMessage();
                }, 5000);
            },
                err => {
                    this.getOrderHeaderId();
                    setTimeout(() => {
                        this.showMessage();
                    }, 2000);
                }
            );
            window.setTimeout(function () { window.location.reload() }, 5000)
        }
    }
    showMessage() {
        this.messageService.add({
            key: 'orderMsg',
            severity: 'success',
            summary: "Order " + this.orderHeader.orderId + " Saved Successfully"
        });
    }
}


