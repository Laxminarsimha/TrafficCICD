import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class copyInstructionUtilsService {
    private copyUrl: string = environment.copyUrl;


    constructor() {

    }

    get saveCopyInstructionsUrl(): string {
        return this.copyUrl + "Copy/SaveCopyInstructionItems";
    }

}
