export class Customer {
    public customerId: number;
    public customerName: string;
    public customerTypeId: number;
    public Title: string;
    public locationId: number;
}
export class CustomerType {
    public CustomerTypeId: number;
    public CustomerTypeName: string;    
}
export class Agency{
    public customerId: number;
    public customerName: string;
    public customerTypeId: number;
    public linearCommission:string;
    public digitalCommission:string;   
    public clientCode:string;
    public productCode:string;
    public estimateNumber:string;
    public locationId: number;
}
export class ContactInformation{
    public contactId:number;    
    public firstName: string;
    public middleName: string;
    public lastName: string;
    public emailAddress: string;
    public phoneNumbers: any[];
    public phoneNumber: string;
    public name: string
} 
export class Order{
    public orderId : number;
    public revision: number;
    public advertiserCustomerId : number
    public advertiserCustomerName : string
    public orderTitle : string
    public advertiserContactId : number
    public purchaseOrder : string         
    public duns:string
    public ContactList : ContactInformation;
    advertisermodel: string;
}
export class OrderAgency
{
 public orderId: number
 public agencyCustomerId : number
 public linearCommissionPercent : number
 public digitalCommissionPercent : number
 public agencyContactId : number  
 public agencyName : string
 public clientCode : string
 public productCode : string
 public estimateNumber : string  
}
export class OrderHeader
{
 public orderId: number  
 public createdBy: string
 public modifiedBy: string
 public revision: number
}
export class OrderInformation
{
    createDate: Date
    createdBy: string
    modifiedDate: Date
    modifiedBy: string
    rowVersion: string
    revision: number
    advertiserCustomerId: number
    advertiserCustomerName: string
    orderTitle: string
    advertiserContactId: number
    purchaseOrder: string
    duns: string
    agencyCustomerId: number
    linearCommissionPercent: number
    digitalCommissionPercent: number
    agencyContactId: number
    agencyName: string
    clientCode: string
    productCode: string
    estimateNumber: string
}