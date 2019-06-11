export class Advertiser {
    public AdvertiserId: number;
    public AdvertiserName: string;
    public AdvertiserNameNew: string;
}
export class Customer {
    public CustomerId: number;
    public CustomerName: string;
    public CustomerNameNew: string;
    public CustomerTypeId: number;
    public ContactForm: ContactInformation[];
}
export class CustomerType {
    public CustomerTypeId: number;
    public CustomerTypeName: string;
}
export class ContactInformation {
    public FirstName: string
    public LastName: string
    public MiddleName: string
    public EmailAddress: string
    public PhoneNosList: PhoneNumbersList[]
}
export class PhoneNumbersList {
    public PhoneNumber: string
    public phoneTypeList: PhoneTypes[] = [];
    public IsPrimary: boolean = false;
    public CountryCode: string
    public Extension: number
}
export class PhoneTypes {
    public phoneTypeId: number
    public phoneTypeName: string
}
export class Address {
    public AddressId: number;
    public SuiteNo: string;
    public City: string;
    public State: string;
    public Country: string;
    public Street: string;
    public PostalCode: string;
    public AddressType: AddressType[];
}
export class AddressType {
    public AddressTypeId: number;
    public AddressTypeName: string;
}
export class CustomerBillingRevenue {
    public CustomerBillingRevenueId: number;
    public BillingCategory: number;
    public BillingPeriod: number;
    public CustomerId: number;
    public RevenueAssignment: number;
    public RevenueType: number;
    public SpecialHandling: string;
    public Terms: number;
}
export interface IRevenueTypes {
    revenueTypeId: number;
    revenueTypeName: string;
}
export interface IRevenueAssignments {
    revenueAssignmentId: number;
    revenueAssignmentName: string;
}
export interface ICodeValueOptions {
    codeValueId: number;
    codeValueName: string;
    isDefaultOption:boolean;
    codeTypeId: number;
    
}
export interface CodeValueOptions {
    codeValueId: number;
    codeValueName: string;
    
}