import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


@Injectable({
    providedIn: 'root'
})
export class SettingUtilService {
    private commonDbBaseUrl: string = environment.commercialDbBaseUrl;

    get GetsettingListUrl(): string {
        return this.commonDbBaseUrl + "Setting/GetAllSystemSettings";
    }

    get updateSettingListUrl(): string{
        return this.commonDbBaseUrl + "Setting/UpdateSystemSettings";
    }
}
