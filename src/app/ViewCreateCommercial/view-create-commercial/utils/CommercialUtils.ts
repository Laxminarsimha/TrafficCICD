import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CommercialUtilsService {
    private commonDbBaseUrl: string = environment.commercialDbBaseUrl;

    get commercialUrl(): string {
        return this.commonDbBaseUrl + "Library/GetLibraryItems";
    }
}
