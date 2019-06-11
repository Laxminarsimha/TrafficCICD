import { environment } from 'src/environments/environment';
export class ViewcreatecommercialConstants {
    public constants: any;
    private commonDbBaseUrl: string = environment.commercialDbBaseUrl;
    constructor() {
        const oErrorMessages = {
            serverError: 'Internal server error occured',
        };
        const oUrlLinks = {
            viewcreatecommercialUrl: `${this.commonDbBaseUrl}Library/GetLibraryItems`
        }
      
        this.constants = {
            errorMessages: oErrorMessages,
            urlLinks: oUrlLinks,
        };
        Object.freeze(this.constants)
    }
    public internalserverErrorMessage(sName: string) {
        return `Internal server error`;
    }
}