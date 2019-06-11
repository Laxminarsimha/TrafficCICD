import { Injectable } from "@angular/core";

@Injectable()
export class SettingsConst {

    get settingComponent():string{
        return 'System setting';
    }

    get settings_Update_Success():string{
        return 'Successfully updated the system settings';
    }

    get settings_Update_Error():string{
        return 'Internal server error occured.'
    }
}
