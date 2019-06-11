import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class OrderUtilsService {
    private customerDbBaseUrl: string = environment.commonDbBaseUrl;
    private copyInstructionUrl: string = environment.copyInstructionURL;

    get AllcustomerUrl(): string {
        return this.customerDbBaseUrl + "customer/GetAllCustomersByTypeId";
    }
    
    get AllContactListUrl(): string{
        return this.customerDbBaseUrl + "customer/GetAllContactDetails";
    }

    get AddOrderUrl(): string{
        return this.copyInstructionUrl + "Orders/AddOrders";
    }

    get AddOrderAgencyUrl(): string{
        return this.copyInstructionUrl + "Orders/AddOrdersAgency";
    }

    get GetOrderUrl(): string{
        return this.copyInstructionUrl + "Orders/GetOrderHeaderInformationsById";
    }

    get GetMaxOrderId(): string{
        return this.copyInstructionUrl + "Orders/GetOrderHeaderMaxId";
    }
    constructor() {
    }   
}
