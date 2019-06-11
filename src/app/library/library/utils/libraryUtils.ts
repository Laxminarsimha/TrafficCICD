import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class LibraryUtilsService {
    private commonDbBaseUrl: string = environment.commercialDbBaseUrl;

    get libraryUrl(): string {
        return this.commonDbBaseUrl + "Library/Getlibrary";
    }
    get AlllibraryUrl(): string {
        return this.commonDbBaseUrl + "Library/GetAllAdvertiser";
    }

    constructor() {

    }
    //Insert Library
    get AddCommercial(): string {
        return this.commonDbBaseUrl + "Library/AddCommercial";
    }

    get GetLibraryTypeUrl(): string {
        return this.commonDbBaseUrl + "Library/GetAllLibraryTypes";
    }
    get UpdateLibrary(): string {
        return this.commonDbBaseUrl + "Library/Updatelibrary";
    }
    get GetAdvertisers(): string {
        return this.commonDbBaseUrl + "Library/GetAdvertisers";
    }

}
