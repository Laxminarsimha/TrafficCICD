import { Injectable } from '@angular/core';
@Injectable()
export class CommonCustomerUtills {
    get componentError(): string {
        return 'Internal server error occured.'
    }
    get agencyComponent(): string {
        return 'Agency';
    }
    get advertiserComponent(): string {
        return 'Advertiser';
    }

    get contactComponent(): string {
        return 'Contact';
    }
    get AgencyAction_Save_Error(): string {
        return 'Unable to save Agency information';
    }
    get AdvertiserAction_Save_Error(): string {
        return 'Unable to save Advertiser information';
    }

    get AgencyAction_Save_Success(): string {
        return 'Agency data saved Successfully';
    }
    get AdvertiserAction_Save_Success(): string {
        return 'Advertiser data saved Successfully';
    }
    get AgencyAction_Save_AgencyExists(): string {
        return 'Agency with same name already exists, please choose a different name';
    }
    get Advertiser_Save_AdvertiserExists(): string {
        return 'Advertiser with same name already exists, please choose a different name';
    }
    get Contact_Error(): string {
        return 'Fill all the required fields';
    }
    get Revenue_Details_Error(): string {
        return 'Fill all the mandatory details fields';
    }
    get AgencyAction_Save_NameEmpty(): string {
        return 'Agency name is required';
    }
    get AdvertiserAction_Save_NameEmpty(): string {
        return 'Advertiser name is required';
    }
    get Email_Error(): string {
        return 'Invalid Email format';
    }
    get PhoneNumber_Error(): string {
        return 'InValid phone Number';
    }
    get ValidData_Error(): string {
        return 'Enter Valid Data';
    }
}