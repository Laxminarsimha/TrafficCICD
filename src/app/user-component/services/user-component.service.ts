import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAdvertiserItems } from '../user-component.interface';
import { UserComponentConstants } from '../user-component.constants';

@Injectable()
export class UserComponentService {
    constructor(private http: HttpClient) {
    }
    public getAdvertiserItems(oRequest: IAdvertiserItems) {
        return this.http.post(UserComponentConstants.constants.urls.getAdvertiserItems, oRequest);
    }
}
