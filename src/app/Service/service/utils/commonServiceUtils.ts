import { Injectable } from '@angular/core';
@Injectable()
export class CommonServiceUtills {
    get componentError(): string {
        return 'Internal server error occured.'
    }
    get serviceComponent(): string {
        return 'Service';
    }
    get dateValidation(): string {
        return 'Go Live Date cannot be earlier than Activation Date';
    }

    get saveSuccessful(): string {
        return 'Service added succesfully'
    }

    get serviceTypeError(): string {
        return 'Unable to get Serive Type'
    }

    get pastDateValidation(): string {
        return ' Date can not be in the past'
    }
}