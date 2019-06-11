import { withNotes } from '@storybook/addon-notes';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { ProgressBarModule } from 'primeng/progressbar';
import { storiesOf } from '@storybook/angular';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import * as knobs from '@storybook/addon-knobs';
import { object } from '@storybook/addon-knobs';

import {
    XgDropdownComponentModule,
    XgMultiSelectComponentModule,
    XgGridModule,
    XgInputComponentModule,
    XgRadioComponentModule,
    XgCheckboxComponentModule,
    XgButtonComponentModule,
    XgTypeaheadComponentModule,
    XgTimePickerModule,
    XgDatePickerComponentModule,
    XgDayPickerComponentModule,
    XgPopupComponentModule,
    XgAdvertiseModule,
    XgCheckboxComponent,
    XgAddressModule,
    XgRatingComponentModule,
    XgDurationModule,
    ContactInformationModule,
    XgTabComponentModule,
    XgInputSwitchComponentModule,
    XgCardModule,
    XgButtonToggleModule
} from '@imaginecom/common-component-lib';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerComponent } from './Customer/customer/customer.component';
import {
    ContactInformation,
    Address,
    CustomerBillingRevenue
} from './Customer/customer/model/customer.model';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import {
    Advertiser,
    Customer,
    CustomerType
} from './Customer/customer/model/customer.model';
import { CustomerService } from './Customer/customer/services/customer.service';
import { ServiceComponent } from './Service/service/service.component';
import { ServiceUtilsService } from './Service/service/utils/ServiceUtils';
import { CommonServiceUtills } from './Service/service/utils/commonServiceUtils';
import { OrderComponent } from './Order/Order/order.component';
import { OrderUtilsService } from './Order/Order/utils/orderutils';
import { OrderService } from './Order/Order/services/order.service';

import { ViewCommercialService } from './ViewCreateCommercial/view-create-commercial/services/view-commercial.service';
import { ViewCreateCommercialComponent } from './ViewCreateCommercial/view-create-commercial/view-create-commercial.component';
import { SeparationsettingsComponent } from './separationsettings/separationsettings.component';
import { XgDurationComponent } from '@imaginecom/common-component-lib/lib/xg-duration/xg-duration.component';
import { LibraryComponent } from './library/library/library.component';
import {CopyInstructionsComponent} from './copyinstructions/copyinstructions.component';
import {CopyInstructionsStepper} from './copyinstructionsstepper/copyinstructionsstepper.component';
import {
    MatFormFieldModule,
    MatCardModule,
    MatButton,
    MatButtonModule,
    MatDividerModule,
    MatStepperModule,
    MatInputModule
} from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { UserComponentComponent } from './user-component/user-component.component';
import { UserComponentService } from './user-component/services/user-component.service';
import { MessageService } from 'primeng/api';
import { ICommercial } from './user-component/user-component.interface';
const headerData: ICommercial = {advertiserId:4, advertiser: 'test', length: '00:00:30' }
import { LibraryUtilsService } from './library/library/utils/libraryUtils';
 import { CopyHeader,CopyCreative } from './copyinstructions/model/copyinstructions.model'; 
import { copyInstructionUtilsService } from './copyinstructions/utils/copyInstructionUtils';
import { CopyItemService } from './copyinstructions/services/CopyItem.service';



storiesOf('Pages', module)
    .add('Customer',
        () => ({
            component: CustomerComponent,
            moduleMetadata: {
                imports: [
                    BrowserAnimationsModule,
                    XgGridModule,
                    XgDropdownComponentModule,
                    XgTypeaheadComponentModule,
                    XgButtonComponentModule,
                    XgPopupComponentModule,
                    FormsModule,
                    RouterModule,
                    XgInputComponentModule,
                    XgDropdownComponentModule,
                    XgButtonComponentModule,
                    XgMultiSelectComponentModule,
                    BrowserAnimationsModule,
                    ToastModule,
                    XgAdvertiseModule,
                    XgRadioComponentModule,
                    XgCheckboxComponentModule,
                    XgAddressModule,
                    ContactInformationModule,
                    ReactiveFormsModule,
                    XgTabComponentModule,
                    AutoCompleteModule,
                    XgInputSwitchComponentModule

                ],
                schemas: [],
                declarations: [CustomerComponent],
                providers: [NgForm, Advertiser, Customer, CustomerService, CustomerType, ContactInformation, Address, CustomerBillingRevenue]
            },
            props: {
                // data: knobs.object('data', marketReference)
                loading: false

            }

        })
    )
    .add('Commercial Creative',
        () => ({
            component: ViewCreateCommercialComponent,
            moduleMetadata: {
                imports: [
                    BrowserAnimationsModule,
                    XgGridModule,
                    FormsModule,
                    RouterModule,
                    XgGridModule,
                    XgInputComponentModule,
                    XgButtonComponentModule,
                    XgMultiSelectComponentModule,
                    BrowserAnimationsModule,
                    ToastModule,
                    XgGridModule,
                    XgAdvertiseModule,
                    XgRadioComponentModule,
                    XgCheckboxComponentModule,
                    XgAddressModule,
                    ContactInformationModule,
                    ReactiveFormsModule,
                    XgTabComponentModule,
                    AutoCompleteModule
                ]
            },
            declarations: [ViewCreateCommercialComponent],
        })
    )
    .add('System Settings',
        () => ({
            component: SeparationsettingsComponent,
            moduleMetadata: {
                imports: [
                    BrowserAnimationsModule,
                    XgGridModule,
                    FormsModule,
                    RouterModule,
                    XgGridModule,
                    XgInputComponentModule,
                    XgButtonComponentModule,
                    XgMultiSelectComponentModule,
                    BrowserAnimationsModule,
                    XgDurationModule,
                    ToastModule,
                    XgGridModule,
                    XgAdvertiseModule,
                    XgRadioComponentModule,
                    XgCheckboxComponentModule,
                    ReactiveFormsModule,
                    XgTabComponentModule,
                    AutoCompleteModule
                ]
            },
            declarations: [SeparationsettingsComponent],
        })
    ).add('Library', () => ({
        component: LibraryComponent,
        moduleMetadata: {
            imports: [
                XgDatePickerComponentModule,
                BrowserAnimationsModule,
                MatCardModule,
                MatButtonModule,
                MatDividerModule,
                XgDropdownComponentModule,
                XgMultiSelectComponentModule,
                HttpClientModule,
                XgButtonComponentModule,
                XgInputComponentModule,
                XgDurationModule,
                XgInputSwitchComponentModule,
                XgCheckboxComponentModule,
                ToastModule
            ],
            schemas: [],
            declarations: [],
            providers: [NgForm, LibraryUtilsService]
        },
        props: {
            // data: knobs.object('data', marketReference)
            loading: false
        }
    }))
    .add('Service', () => ({
        component: ServiceComponent,
        moduleMetadata: {
            imports: [
                BrowserAnimationsModule,
                XgGridModule,
                XgDropdownComponentModule,
                XgTypeaheadComponentModule,
                XgButtonComponentModule,
                XgPopupComponentModule,
                FormsModule,
                RouterModule,
                XgGridModule,
                XgInputComponentModule,
                XgDropdownComponentModule,
                XgButtonComponentModule,
                XgMultiSelectComponentModule,
                BrowserAnimationsModule,
                ToastModule,
                XgGridModule,
                XgAdvertiseModule,
                XgRadioComponentModule,
                XgCheckboxComponentModule,
                XgAddressModule,
                ContactInformationModule,
                ReactiveFormsModule,
                XgTabComponentModule,
                AutoCompleteModule,
                XgRatingComponentModule
            ],
            schemas: [],
            declarations: [ServiceComponent],
            providers: [
                NgForm,
                Advertiser,
                Customer,
                CustomerService,
                CustomerType,
                ContactInformation,
                Address,
                CustomerBillingRevenue,
                ServiceUtilsService,
                CommonServiceUtills
            ]
        },
        props: {
            // data: knobs.object('data', marketReference)
            loading: false
        }
    }))
    .add('User Component', () => ({
        component: UserComponentComponent,
        moduleMetadata: {
            imports: [
                BrowserAnimationsModule,
                XgGridModule,
                ToastModule,
                MatStepperModule,
                XgDatePickerComponentModule,
                MatCardModule,
                MatButtonModule,
                MatDividerModule,
                XgDropdownComponentModule,
                XgMultiSelectComponentModule,
                HttpClientModule,
                XgButtonComponentModule,
                XgInputComponentModule,
                XgDurationModule,
                XgInputSwitchComponentModule,
                XgCheckboxComponentModule,
            ],
            schemas: [],
            declarations: [],
            providers: [
                UserComponentService, MessageService,NgForm, LibraryUtilsService
            ]
        },
        props: {
            headerData: object("Header Data",headerData)
        }
    })).add('CopyInstructions', () => ({
        component: CopyInstructionsStepper,
        moduleMetadata: {
            imports: [
                BrowserAnimationsModule,
                XgGridModule,
                XgDropdownComponentModule,
                XgTypeaheadComponentModule,
                XgButtonComponentModule,
                XgPopupComponentModule,
                FormsModule,
                RouterModule,
                XgGridModule,
                XgInputComponentModule,
                XgDropdownComponentModule,
                XgButtonComponentModule,
                XgMultiSelectComponentModule,
                BrowserAnimationsModule,
                ToastModule,
                XgGridModule,
                XgAdvertiseModule,
                XgRadioComponentModule,
                XgCheckboxComponentModule,
                XgAddressModule,
                ContactInformationModule,
                ReactiveFormsModule,
                XgTabComponentModule,
                AutoCompleteModule,
                XgRatingComponentModule,
                MatStepperModule,
                MatInputModule,
                XgCardModule,
                XgButtonToggleModule
                
            ],
            schemas: [],
            declarations: [CopyInstructionsStepper,CopyInstructionsComponent],

            providers: [
                NgForm,CopyHeader,CopyCreative,copyInstructionUtilsService,CopyItemService
            ]
        },
        props: {
            // data: knobs.object('data', marketReference)
            loading: false
        }
    })).add('Order', () => ({
        component: OrderComponent,
        moduleMetadata: {
            imports: [
                BrowserAnimationsModule,
                XgGridModule,
                XgDropdownComponentModule,
                XgTypeaheadComponentModule,
                XgButtonComponentModule,
                XgPopupComponentModule,
                FormsModule,
                RouterModule,
                XgGridModule,
                XgInputComponentModule,
                XgDropdownComponentModule,
                XgButtonComponentModule,
                XgMultiSelectComponentModule,
                BrowserAnimationsModule,
                ToastModule,
                XgGridModule,
                XgAdvertiseModule,
                XgRadioComponentModule,
                XgCheckboxComponentModule,
                XgAddressModule,
                ContactInformationModule,
                ReactiveFormsModule,
                XgTabComponentModule,
                AutoCompleteModule
            ],
            schemas: [],
            declarations: [OrderComponent],
            providers: [
                NgForm,
                OrderUtilsService,,
                Customer,
                OrderService,
                CustomerType,
                OrderUtilsService              
            ]
        },
        props: {
            // data: knobs.object('data', marketReference)
            loading: false
        }
    }));

