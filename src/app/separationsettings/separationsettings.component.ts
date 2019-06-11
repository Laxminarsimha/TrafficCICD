
import { Component, OnInit} from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import {SystemSetting} from './model/separation.model';
import {SystemSettingService} from './services/separation.service';
import { SettingsConst } from './const-settings';
@Component({
  selector: 'app-separationsettings',
  templateUrl: './separationsettings.component.html',
  styleUrls: ['./separationsettings.component.scss'],
  providers:[SystemSettingService, MessageService, SettingsConst]
})
export class SeparationsettingsComponent implements OnInit {

  public advertiserSystemSettingValue: string = "";
  public productSystemSettingValue: string=  "";
  public brandSystemSettingValue: string = "";
  public systemSettingList: SystemSetting[] = new Array<SystemSetting>();
  constructor(
    private dataService: SystemSettingService,
        private messageService: MessageService,
        private settingsConst:SettingsConst
  ) { }

  ngOnInit() {
    this.getSystemSettings();  
  }
    public getSystemSettings() {
      this.dataService.getSystemSettingList().subscribe((response) => {  
        this.systemSettingList = response;
        this.advertiserSystemSettingValue = this.systemSettingList[0].settingValue;
        this.productSystemSettingValue = this.systemSettingList[1].settingValue;
        this.brandSystemSettingValue = this.systemSettingList[2].settingValue;
    });
  }

  
  public saveSettings(e){
    this.systemSettingList[0].settingValue = this.advertiserSystemSettingValue; 
    this.systemSettingList[1].settingValue =this.productSystemSettingValue;
    this.systemSettingList[2].settingValue =this.brandSystemSettingValue;
     this.dataService.updateSystemSettings(this.systemSettingList).subscribe((response) => {
      if (response) {     
          this.messageService.add({
              severity: 'success',
              summary: this.settingsConst.settingComponent,
              detail: this.settingsConst.settings_Update_Success
          });
          this.getSystemSettings();
      } else {
          this.messageService.add({
              severity: 'warn',
              summary: this.settingsConst.settingComponent,
              detail: this.settingsConst.settings_Update_Error
          });
      }
    });
  }

  public clearSettings(e){
    this.advertiserSystemSettingValue = this.systemSettingList[0].settingValue;
    this.productSystemSettingValue = this.systemSettingList[1].settingValue;
    this.brandSystemSettingValue = this.systemSettingList[2].settingValue;
  }
}
