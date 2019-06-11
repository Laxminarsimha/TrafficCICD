import { Injectable } from '@angular/core';
@Injectable()
export class CommonLibraryUtills {
    get componentError(): string {
        return 'Internal server error occured.'
    }
    
}