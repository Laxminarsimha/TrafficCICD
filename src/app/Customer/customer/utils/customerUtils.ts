import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class CustomerUtilsService {
    private inventoryCtrl: string = "inventory/";
    private baseUrl: string = environment.proposalURL;
    private commonDbBaseUrl: string = environment.commonDbBaseUrl;
    private inventoryDbBaseUrl: string = environment.inventoryURL + this.inventoryCtrl;

    get customerUrl(): string {
        return this.commonDbBaseUrl + "customer/Getcustomer";
    }
    get AllcustomerUrl(): string {
        return this.commonDbBaseUrl + "customer/GetAllAdvertiser";
    }

    constructor() {

    }
    //Insert Customer
    get InsertCustomer(): string {
        return this.commonDbBaseUrl + "customer/Insertcustomer";
    }

    get GetCustomerTypeUrl(): string {
        return this.commonDbBaseUrl + "customer/GetAllCustomerTypes";
    }
    get UpdateCustomer(): string {
        return this.commonDbBaseUrl + "customer/Updatecustomer";
    }

    get GetPhoneTypeList(): string {
        return this.commonDbBaseUrl + "customer/GetPhoneTypes";
    }
    get InsertAddress(): string {
        return this.commonDbBaseUrl + "customer/InsertAddress";
    }

    //Billing Revenue


    get InsertCustomerBillingRevenue(): string {
        return this.commonDbBaseUrl + "customer/InsertCustomerBilling";
    }
    get GetCodeValues():string {
        return this.commonDbBaseUrl + "customer/GetAllCodeValueTypes";
    }
}
