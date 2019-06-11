import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class ServiceUtilsService {
    private baseUrl: string =
        'http://xgtcustomersqa.southcentralus.cloudapp.azure.com';
    get saveServiceURL(): string {
        return this.baseUrl + '/api/ServiceChannel/AddServiceChannel';
    }

    get getServiceTypeURL(): string {
        return this.baseUrl + '/api/ServiceChannel/GetAllServiceTypes';
    }
}
