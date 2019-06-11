import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CustomerService } from './services/customer.service';
import { CustomerType, Customer, ContactInformation, Address, AddressType, PhoneNumbersList, PhoneTypes, CustomerBillingRevenue, IRevenueTypes, IRevenueAssignments, ICodeValueOptions, CodeValueOptions } from './model/customer.model';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { CustomerConstants } from '../customer/customer.constants';
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [CustomerService, MessageService]
})
export class CustomerComponent implements OnInit {
  public dataCustomer: any[] = [];
  public dataCustomerType: any[] = [];
  public dataRevenueType: IRevenueTypes[] = [];
  public dataRevenueAssignment: IRevenueAssignments[] = [];
  public billingPeriodOptions: ICodeValueOptions[] = [];
  public invoiceTermsOptions: ICodeValueOptions[] = [];
  public billingCategoryOptions: ICodeValueOptions[] = [];
  public invoiceHandlingOptions: ICodeValueOptions[] = [];
  public billingPeriodSelectedItem:CodeValueOptions;
  //public billingCategorySelectedItem: ICodeValueOptions;
  public invoiceTermsSelectedItem:ICodeValueOptions;
  //public invoiceHandlingSelectedItem:ICodeValueOptions=null;

  public tabs: string[]
  public columns: any[];
  public bShowAdd: boolean = true;
  // public createNew: boolean = false;
  public bShowPopup: boolean = false;
  public bContactFormValidation: boolean = true;
  public customerIdentityNumber: number = 0;
  public mailingIndex: number = 2;
  public billingIndex: number = 3;
  public physicalIndex: number = 1;
  public homeId: number = 1;
  public officeId: number = 2;
  public mobileId: number = 3;
  public faxId: number = 4;
  public customernamecopy: string = '';
  public nestedForm: FormGroup;
  public advertiserForm: FormGroup;
  public agencyForm: FormGroup;
  public newCustomer: any;
  public customerConstants: CustomerConstants = new CustomerConstants();

  constructor(
    private customerService: CustomerService,
    private messageService: MessageService,
    public customerModel: Customer,
    private customerTypeModel: CustomerType,
    private elementref: ElementRef,
    private contactForm: ContactInformation,
    private addressForm: Address,
    private customerBillingRevenueModel: CustomerBillingRevenue,
    private formBuilder: FormBuilder
  ) {
    this.tabs = ['Agency', 'Advertiser', 'Rep Firm']
    this.columns = [
      { field: 'CustomerName', label: this.customerTypeModel.CustomerTypeName + ' Name', key: true, searchOn: true },
      { field: 'CustomerId', label: this.customerTypeModel.CustomerTypeName + ' ID', key: true, searchOn: true },
    ]
  }

  ngOnInit() {
    nestedForm: FormGroup
    this.nestedForm = new FormGroup({
      contact: new FormControl(""),
      address: new FormControl(""),
      RevenueType: new FormControl(""),
      RevenueAssignment: new FormControl(""),
      billingPeriodAssignments: new FormControl(""),
      billingCategoryAssignments: new FormControl(""),
      invoiceTermsAssignments: new FormControl(""),
      invoiceHandlingAssignments: new FormControl(""),
      CustomerNameNew: new FormControl("", Validators.required),
    });
    this.agencyForm = this.formBuilder.group({
      CustomerName: [null, [Validators.required, Validators.maxLength(50)]]
    });
    this.advertiserForm = this.formBuilder.group({
      CustomerName: [null, [Validators.required, Validators.maxLength(50)]]
    });
    this.onTabChange("Agency");
  }

  // private getCustomerType() {
  //   this.customerService.getCustomerType().subscribe((res: any[]) => {
  //     this.dataCustomerType = Object.assign([], res);
  //   });

  // }
  // public custTypeChanged($event) {
  //   this.customerTypeModel.CustomerTypeId = $event.customerTypeId;
  //   this.customerTypeModel.CustomerTypeName = $event.customerTypeName;
  //   this.customerModel.CustomerTypeId = $event.customerTypeId;
  //   this.getCustomer(this.customerModel);
  // }

  private getCustomer(model: Customer) {
    this.customerModel.CustomerName = "";
    if (model.CustomerTypeId > 0) {
      this.customerService.getCustomer(model).subscribe(res => {
        this.dataCustomer = [];
        this.dataCustomer = this.dataCustomer.concat(res);
      }, err => {

      });
      this.columns = [
        { field: 'customerName', label: this.customerTypeModel.CustomerTypeName + ' Name', key: true, searchOn: true },
        { field: 'customerId', label: this.customerTypeModel.CustomerTypeName + ' ID', key: true, searchOn: true },
      ]
    }
  }
  public onChange($event) {
    if (this.customerTypeModel.CustomerTypeId == 1) {
      this.advertiserForm.setValue({ CustomerName: $event.target.value });
    }
    else if (this.customerTypeModel.CustomerTypeId == 2) {
      this.agencyForm.setValue({ CustomerName: $event.target.value });
    }
    if ($event.target.value.length > 0) {
      this.customernamecopy = $event.target.value;
      const customerObject = this.dataCustomer.filter(item => item.customerName === $event.target.value);
      if (customerObject.length == 0) {
        this.bShowAdd = true;
      }
      else {
        this.bShowAdd = false;
      }
    }
    else {
      this.bShowAdd = true;
    }
  }
  public addCustomer() {
    this.messageService.clear();
    const customerObject = this.dataCustomer.filter(item => item.customerName === this.customernamecopy);
    if (customerObject.length == 0) {
      this.customerModel.CustomerName = this.customernamecopy;
      this.customerModel.CustomerTypeId = this.customerTypeModel.CustomerTypeId;
      this.customerService.InsertCustomer(this.customerModel).subscribe((res: any[]) => {
        this.customerIdentityNumber = res['customerId'];
        this.customerModel.CustomerNameNew = res['customerName'];
        this.bShowPopup = true;
        this.newCustomer = { customerId: res['customerId'], customerName: res['customerName'] }
        this.dataCustomer.push(this.newCustomer);
      }, err => {

      });
      this.dataRevenueType = this.customerService.getRevenueType();
      this.dataRevenueAssignment = this.customerService.getRevenueAssignments();
      this.customerIdentityNumber = 0;
      this.billingPeriodOptions = null;     
      this.invoiceTermsOptions = null;     
      this.billingCategoryOptions = null;      
      this.invoiceHandlingOptions = null;
      }
      this.codeValueOptions();
  }
  
  private codeValueOptions() {
    this.customerService.codeValueOptions().subscribe((res: any[]) => {
      this.billingPeriodOptions = Object.assign([], res['oBillingPeriod']);     
      this.invoiceTermsOptions = Object.assign([], res['oInvoiceOptions']);     
      this.billingCategoryOptions = Object.assign([], res['oBillingCategory']);      
      this.invoiceHandlingOptions = Object.assign([], res['oInvoiceHandling']);
      
     // this.invoiceTermsSelectedItem=(this.invoiceTermsOptions).filter(s=>s.isDefaultOption==true)[0];
      this.billingPeriodSelectedItem=(this.billingPeriodOptions).filter(s=>s.isDefaultOption==true)[0];
      this.invoiceTermsSelectedItem=(this.invoiceTermsOptions).filter(s=>s.isDefaultOption==true)[0];
      
      console.log(this.billingPeriodOptions);
      console.log(this.invoiceTermsOptions);
    });
  }
  public cancelCustomer() {
    this.customerIdentityNumber = 0;
    this.getCustomer(this.customerModel);
    this.nestedForm.reset();
    this.bShowPopup = false;
  }
  private addContact(form) {
    this.customerModel.CustomerId = this.customerIdentityNumber;
    this.customerModel.CustomerName = this.customerModel.CustomerNameNew;
    this.customerModel.CustomerTypeId = this.customerTypeModel.CustomerTypeId;
    this.contactForm.FirstName = form.contact.fName;
    this.contactForm.LastName = form.contact.lName;
    this.contactForm.MiddleName = form.contact.lName;
    this.contactForm.EmailAddress = form.contact.email;
    this.contactForm.PhoneNosList = [];
    this.customerModel.ContactForm = [];
    // var self = this;
    form.contact.sections.forEach((section) => {
      let contactInformation = new ContactInformation();
      contactInformation.FirstName = section.fName;
      contactInformation.LastName = section.lName;
      contactInformation.MiddleName = section.mName;
      contactInformation.EmailAddress = section.email;
      if (section) {
        if (section.email !== null && section.email !== '') {
          if (!this.customerConstants.constants.regex.email.test(section.email)) {
            this.bContactFormValidation = false;
          }
        }
      }
      contactInformation.PhoneNosList = [];
      section.contactItems.forEach((contact) => {
        let phoneNumbers = new PhoneNumbersList();
        phoneNumbers.PhoneNumber = contact.hpAreaPhoneCode;
        if (phoneNumbers.PhoneNumber != '') {
          if (!this.customerConstants.constants.regex.mobile.test(phoneNumbers.PhoneNumber)) {
            this.bContactFormValidation = false;
          }
        }
        phoneNumbers.CountryCode = contact.phoneCountryCode;
        phoneNumbers.Extension = contact.extensionCode;
        phoneNumbers.IsPrimary = contact.isPrimary;
        phoneNumbers.phoneTypeList = [];
        if (contact.phoneTypeDropdown) {
          contact.phoneTypeDropdown.forEach((phoneType) => {
            let phoneTypes = new PhoneTypes();
            switch (phoneType.value) {
              case 'Home':
                phoneTypes.phoneTypeId = this.homeId;
                break;
              case 'Mobile':
                phoneTypes.phoneTypeId = this.mobileId;
                // phoneTypes.phoneTypeName = phoneType.label;
                // phoneNumbers.phoneTypeList.push(phoneTypes);
                break;
              case 'office':
                phoneTypes.phoneTypeId = this.officeId;
                // phoneTypes.phoneTypeName = phoneType.label;
                // phoneNumbers.phoneTypeList.push(phoneTypes);
                break;
              default:
                phoneTypes.phoneTypeId = this.faxId;
                // phoneTypes.phoneTypeName = phoneType.label;
                // phoneNumbers.phoneTypeList.push(phoneTypes);
                break;
            }
            phoneTypes.phoneTypeName = phoneType.label;
            phoneNumbers.phoneTypeList.push(phoneTypes);
            // if (phoneType.value === "Home") {
            //   phoneTypes.phoneTypeId = this.homeId;
            //   phoneTypes.phoneTypeName = phoneType.label;
            //   phoneNumbers.phoneTypeList.push(phoneTypes);
            // }
            // if (phoneType.value === "Mobile") {
            //   phoneTypes.phoneTypeId = this.mobileId;
            //   phoneTypes.phoneTypeName = phoneType.label;
            //   phoneNumbers.phoneTypeList.push(phoneTypes);
            // }
            // if (phoneType.value === "Office") {
            //   phoneTypes.phoneTypeId = this.officeId;
            //   phoneTypes.phoneTypeName = phoneType.label;
            //   phoneNumbers.phoneTypeList.push(phoneTypes);
            // }
            // if (phoneType.value === "Fax") {
            //   phoneTypes.phoneTypeId = this.faxId;
            //   phoneTypes.phoneTypeName = phoneType.label;
            //   phoneNumbers.phoneTypeList.push(phoneTypes);
            // }
          });
        }
        contactInformation.PhoneNosList.push(phoneNumbers);
      });
      this.customerModel.ContactForm.push(contactInformation);
    });

    if (!this.bContactFormValidation) {
      this.messageService.add({ key: 'CreatePopMsg', severity: 'error', summary: this.customerConstants.constants.componentNames.contact, detail: this.customerConstants.constants.errorMessages.invalidData });
      this.bShowPopup = true;
      return false;
    }
    this.customerModel.ContactForm = this.customerModel.ContactForm;
    this.customerService.updateCustomer(this.customerModel).subscribe((res: any[]) => {
      this.dataCustomer = [];
      this.dataCustomer = this.dataCustomer.concat(res);
      this.customerIdentityNumber = res['customerId'];
    }, err => {
      //console.log(err);
    });
    return true;
  }

  private addAddress(form) {
    form.address.addressItems.forEach((address) => {
      this.addressForm.SuiteNo = address.suiteNumber;
      this.addressForm.Street = address.streetAddress;
      this.addressForm.City = address.city;
      this.addressForm.State = address.stateProvince;
      this.addressForm.Country = address.country;
      this.addressForm.PostalCode = address.zip;
      this.addressForm.AddressType = [];
      if (address.addressTypeDropdown) {
        address.addressTypeDropdown.forEach((addressTypes) => {
          let addressType = new AddressType();
          switch (addressTypes.value) {
            case 'Mailing':
              addressType.AddressTypeId = this.mailingIndex;
              addressType.AddressTypeName = "Mailing";
              break;
            case 'Billing':
              addressType.AddressTypeId = this.billingIndex;
              addressType.AddressTypeName = "Billing";
              break;
            default:
              addressType.AddressTypeId = this.physicalIndex;
              addressType.AddressTypeName = "Physical";
              break;
          }
          // if (addressTypes.value === "Mailing") {
          //   addressType.AddressTypeId = this.mailingIndex;
          //   addressType.AddressTypeName = "Mailing";
          //   // this.AddressForm.AddressType.push(addressType);
          // }
          // if (addressTypes.value === "Billing") {
          //   addressType.AddressTypeId = this.billingIndex;
          //   addressType.AddressTypeName = "Billing";
          //   // this.AddressForm.AddressType.push(addressType);
          // }
          // if (addressTypes.value === "Physical") {
          //   addressType.AddressTypeId = this.physicalIndex;
          //   addressType.AddressTypeName = "Physical";
          //   // this.AddressForm.AddressType.push(addressType);
          // }
          this.addressForm.AddressType.push(addressType);
        });
      }
      this.customerService.InsertAddress(this.addressForm).subscribe((res: any[]) => {
        //console.log(res)
      }, err => { });
    });
  }
  public submitForm(form: any) {
    this.bContactFormValidation = true;
    if (!form.CustomerNameNew) {
      if (this.customerTypeModel.CustomerTypeId === 2) {
        this.messageService.add({ key: 'CreatePopMsg', severity: 'error', summary: this.customerConstants.constants.componentNames.agency, detail: this.customerConstants.requiredErrorMessage('Agency') });
      }
      if (this.customerTypeModel.CustomerTypeId === 1) {
        this.messageService.add({ key: 'CreatePopMsg', severity: 'error', summary: this.customerConstants.constants.componentNames.advertiser, detail: this.customerConstants.requiredErrorMessage('Advertiser') });
      }
    }
    else if (this.customernamecopy != this.customerModel.CustomerNameNew) {
      const customerObject = this.dataCustomer.filter(item => item.customerName === this.customerModel.CustomerNameNew);
      if (customerObject.length != 0) {
        if (this.customerTypeModel.CustomerTypeId === 2) {
          this.messageService.add({ key: 'CreatePopMsg', severity: 'error', summary: this.customerConstants.constants.componentNames.agency, detail: this.customerConstants.sameNameExistErrorMessage('Agency') });
        }
        if (this.customerTypeModel.CustomerTypeId === 1) {
          this.messageService.add({ key: 'CreatePopMsg', severity: 'error', summary: this.customerConstants.constants.componentNames.advertiser, detail: this.customerConstants.sameNameExistErrorMessage('Advertiser') });
        }
      }
      else {
        this.finalSubmit(form);
      }
    }
    else {
      this.finalSubmit(form);
    }
  }
  private finalSubmit(form:any) {
    if (this.customerTypeModel.CustomerTypeId === 1) {
      if (form.RevenueType && form.RevenueAssignment&&form.billingPeriodAssignments&&form.invoiceTermsAssignments) {
        this.addCustomerBillingRevenue(form);
      }
      else {
        this.messageService.add({ key: 'CreatePopMsg', severity: 'error', summary: this.customerConstants.constants.componentNames.advertiser, detail: this.customerConstants.constants.errorMessages.revenueDetailsError });
        this.bShowPopup = true;
        return false;
      }
    }
    if (form.contact && !this.addContact(form)) {
      return false;
    }
    if (form.address) {
      this.addAddress(form);
    }
    this.cancelCustomer();
    if (this.customerTypeModel.CustomerTypeId === 1) {
      this.messageService.add({ key: 'MainpageMsg', severity: 'success', summary: this.customerConstants.constants.componentNames.advertiser, detail: this.customerConstants.dataSavedMessage('Advertiser') });
    } else {
      this.messageService.add({ key: 'MainpageMsg', severity: 'success', summary: this.customerConstants.constants.componentNames.agency, detail: this.customerConstants.dataSavedMessage('Agency') });
    }
  }

  public customerModelChanged($event) {
    const customerObject = this.dataCustomer.filter(item => item.customerName === $event.customerName);
    if (customerObject.length !== 0) {

      this.bShowAdd = false;
      this.customerModel.CustomerName = '';
      this.customerModel.CustomerName = $event.customerName;
    }

  }
  public addCustomerBillingRevenue(form) {
    this.customerBillingRevenueModel.CustomerId = this.customerIdentityNumber;
    this.customerBillingRevenueModel.RevenueType = form.RevenueType;
    this.customerBillingRevenueModel.RevenueAssignment = form.RevenueAssignment;
    this.customerService.InsertCustomerBillingRevenue(this.customerBillingRevenueModel).subscribe((res: any[]) => {
    }, err => {
    });
  }
  public onTabChange(sTabKey: string) {
    if (sTabKey == "Advertiser") {
      this.customerTypeModel.CustomerTypeId = 1;
    }
    else if (sTabKey == "Agency") {
      this.customerTypeModel.CustomerTypeId = 2;
    }
    this.customerTypeModel.CustomerTypeName = sTabKey;
    this.customerModel.CustomerTypeId = this.customerTypeModel.CustomerTypeId;
    this.customerModel.CustomerName = "";
    this.bShowAdd = true;
    this.getCustomer(this.customerModel);
  }

}
